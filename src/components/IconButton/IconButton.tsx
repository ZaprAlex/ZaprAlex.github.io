import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import Button from '@mui/material/IconButton';

import styles from './IconButton.module.scss';

type Props = {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

const IconButton: FC<Props> = ({ children, onClick, ariaLabel, className }) => (
  <div className={styles.wrapper}>
    <Button onClick={onClick} aria-label={ariaLabel} component="button" className={cn(styles.button, className)}>
      {children}
    </Button>
  </div>
);

export default IconButton;
