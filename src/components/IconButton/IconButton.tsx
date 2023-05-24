import React, { FC, ReactNode } from 'react';
import Button from '@mui/material/IconButton';

import styles from './IconButton.module.scss';

type Props = {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
}

const IconButton: FC<Props> = ({ children, onClick, ariaLabel }) => (
  <div className={styles.wrapper}>
    <Button onClick={onClick} aria-label={ariaLabel} component="button" className={styles.button}>
      {children}
    </Button>
  </div>
);

export default IconButton;
