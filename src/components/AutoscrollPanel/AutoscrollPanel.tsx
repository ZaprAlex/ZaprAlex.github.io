import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import Button from '@mui/material/IconButton';

import { useInterval } from '../../hooks';

import styles from './AutoscrollPanel.module.scss';

const DEFAULT_SPEED = 70;
const TIMEOUT = 5;

const AutoscrollPanel: FC = () => {
  const location = useLocation();
  const [time, setTime] = useState<number>(-1);
  const [scrollBtnLabel, setScrollBtnLabel] = useState<string>('!');
  const [scrollable, setScrollable] = useState<boolean>(false);

  const stopScroll = () => {
    setScrollable(false);
    setScrollBtnLabel('!');
    setTime(-1);
  };

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

  useInterval(() => window.scrollBy({ top: 0.5, behavior: 'smooth' }), scrollable ? DEFAULT_SPEED : null);

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
