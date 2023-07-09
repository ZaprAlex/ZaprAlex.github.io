import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useInterval } from '../../../../hooks';

import { FormControlLabel, Switch } from '@mui/material';

const DEFAULT_SPEED = 70;
const TIMEOUT = 0;

const AutoscrollSwitch: FC = () => {
  const location = useLocation();
  const [time, setTime] = useState<number>(-1);
  const [scrollable, setScrollable] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  const stopScroll = () => {
    setScrollable(false);
    setTime(-1);
  };

  useEffect(() => {
    const activatePauseScroll = () => setPaused(true);
    const deactivatePauseScroll = () => setPaused(false);

    const stopScrollAfterEnd = () => {
      const pageDiv = document.getElementById('base');
      if (pageDiv && window.scrollY + window.innerHeight >= pageDiv.scrollHeight) {
        stopScroll();
      }
    };

    document.addEventListener('mousedown', activatePauseScroll);
    document.addEventListener('mouseup', deactivatePauseScroll);
    document.addEventListener('touchstart', activatePauseScroll);
    document.addEventListener('touchend', deactivatePauseScroll);
    document.addEventListener('scroll', stopScrollAfterEnd);

    return () => {
      document.removeEventListener('mousedown', activatePauseScroll);
      document.removeEventListener('mouseup', deactivatePauseScroll);
      document.removeEventListener('touchstart', activatePauseScroll);
      document.removeEventListener('touchend', deactivatePauseScroll);
      document.removeEventListener('scroll', stopScrollAfterEnd);
    };
  }, []);

  useEffect(stopScroll, [location]);

  useEffect(() => {
    let timeout: number;
    if (time > 0) {
      timeout = window.setTimeout(() => {
        setTime((prevState) => prevState - 1);
      }, 1000);
    } else if (time === 0) {
      setScrollable(true);
    }
    return () => window.clearTimeout(timeout);
  }, [time]);

  useInterval(() => window.scrollBy({ top: 0.5, behavior: 'smooth' }), scrollable && !paused ? DEFAULT_SPEED : null);

  const toggleScrollable = async () => {
    if (time > 0 || scrollable) {
      stopScroll();
    } else {
      setTime(TIMEOUT);
    }
  };

  return (
    <FormControlLabel
      control={<Switch checked={scrollable} onChange={toggleScrollable} />}
      label="Autoscroll"
    />
  );
};

export default AutoscrollSwitch;
