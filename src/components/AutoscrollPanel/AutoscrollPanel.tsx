import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import Button from '@mui/material/IconButton';

import { useInterval } from '../../hooks/useInterval';

import styles from './AutoscrollPanel.module.scss';

type Props = {
  defaultSpeed?: number;
}

const DEFAULT_SPEED = 70;
const SPEED_DELTA = 10;
const TIMEOUT = 5;

const AutoscrollPanel: FC<Props> = ({ defaultSpeed = DEFAULT_SPEED }) => {
  const [speed, setSpeed] = useState<number>(0);
  const [time, setTime] = useState<number>(-1);
  const [scrollBtnLabel, setScrollBtnLabel] = useState<string>('!');
  const [scrollable, setScrollable] = useState<boolean>(false);

  useEffect(() => {
    setSpeed(defaultSpeed);
  }, [defaultSpeed]);

  useEffect(() => {
    let timeout: number;
    if (time > 0) {
      timeout = window.setTimeout(() => {
        setScrollBtnLabel(String(time - 1));
        setTime((prevState) => prevState - 1);
      }, 1000);
    } else if (time === 0) {
      setScrollBtnLabel(String(speed));
      setScrollable(true);
    }
    return () => window.clearTimeout(timeout);
  }, [speed, time]);

  useInterval(() => window.scrollBy({ top: 0.5, behavior: 'smooth' }), scrollable ? defaultSpeed - speed * SPEED_DELTA : null);

  const toggleScrollable = async () => {
    if (time > 0 || scrollable) {
      setScrollable(false);
      setScrollBtnLabel('!');
      setTime(-1);
    } else {
      setScrollBtnLabel(String(TIMEOUT));
      setTime(TIMEOUT);
    }
  };

  const increaseSpeed = () => setSpeed((prevValue) => prevValue + 1);

  const decreaseSpeed = () => setSpeed((prevValue) => prevValue - 1);

  return (
    <div className={styles.panel}>
      {scrollable && (
        <>
          <Button
            onClick={decreaseSpeed}
            disabled={speed <= -5}
            className={styles.button}
          >-</Button>
          <Button
            onClick={increaseSpeed}
            disabled={speed >= 5}
            className={styles.button}
          >+</Button>
        </>
      )}
      <Button
        onClick={toggleScrollable}
        className={cn(styles.button, { [styles.active]: scrollable })}
      >
        {scrollable ? String(speed) : scrollBtnLabel}
      </Button>
    </div>
  );
};

export default AutoscrollPanel;
