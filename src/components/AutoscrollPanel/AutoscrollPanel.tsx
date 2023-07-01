import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import Button from '@mui/material/IconButton';

import { useInterval } from '../../hooks';
import IconButton from '../IconButton';
import scrollDownIcon from '../../assets/double-down.png';

import styles from './AutoscrollPanel.module.scss';

const DEFAULT_SPEED = 70;
const TIMEOUT = 0;

const AutoscrollPanel: FC = () => {
  const location = useLocation();
  const [time, setTime] = useState<number>(-1);
  const [scrollBtnLabel, setScrollBtnLabel] = useState<string>('!');
  const [scrollable, setScrollable] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  const stopScroll = () => {
    setScrollable(false);
    setScrollBtnLabel('!');
    setTime(-1);
  };

  const activatePauseScroll = () => setPaused(true);
  const deactivatePauseScroll = () => setPaused(false);

  const stopScrollAfterEnd = () => {
    const pageDiv = document.getElementById('base');
    if (pageDiv && window.scrollY + window.innerHeight >= pageDiv.scrollHeight) {
      stopScroll();
    }
  };

  useEffect(() => {
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
        setScrollBtnLabel(String(time - 1));
        setTime((prevState) => prevState - 1);
      }, 1000);
    } else if (time === 0) {
      setScrollBtnLabel('X');
      setScrollable(true);
    }
    return () => window.clearTimeout(timeout);
  }, [time]);

  useInterval(() => window.scrollBy({ top: 0.5, behavior: 'smooth' }), scrollable && !paused ? DEFAULT_SPEED : null);

  const toggleScrollable = async () => {
    if (time > 0 || scrollable) {
      stopScroll();
    } else {
      setScrollBtnLabel(String(TIMEOUT));
      setTime(TIMEOUT);
    }
  };

  return (
    <div className={styles.panel}>
      {/*{!scrollable && (*/}
      {/*  <IconButton onClick={toggleScrollable} ariaLabel='auto-scroll-btn' className={styles.button}>*/}
      {/*    <img src={scrollDownIcon} alt='' />*/}
      {/*  </IconButton>*/}
      {/*)}*/}
      <Button
        onClick={toggleScrollable}
        className={cn(styles.button, { [styles.active]: scrollable })}
      >
        {scrollBtnLabel}
      </Button>
    </div>
  );
};

export default AutoscrollPanel;
