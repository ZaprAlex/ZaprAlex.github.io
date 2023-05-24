import React, { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import { useTheme } from '../../hooks/useTheme';
import Header from '../../containers/MainHeader';

import styles from './Layout.module.scss';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div id="base" className={cn(styles.page, theme)}>
      <div className={styles.content}>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
