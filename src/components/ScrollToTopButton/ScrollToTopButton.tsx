import React, { FC } from 'react';
import Button from '@mui/material/IconButton';
import styles from '../AutoscrollPanel/AutoscrollPanel.module.scss';
import { scrollToTop } from '../../utils/helper';

const ScrollToTopButton: FC = () => (
  <Button
    onClick={() => scrollToTop()}
    className={styles.button}
  >
    <span className={styles.button} />
  </Button>
);

export default ScrollToTopButton;
