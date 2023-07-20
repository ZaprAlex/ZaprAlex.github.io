import React, { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import { useSettings } from '../../hooks';
import Header from '../Header';
import Footer from '../Footer';
import PopUp from '../PopUp';

import styles from './Layout.module.scss';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useSettings();

  return (
    <div id="base" className={cn(styles.page, theme)}>
      <div className={styles.content}>
        <Header />

        {children}

        <Footer />
      </div>

      <PopUp />
    </div>
  );
};

export default Layout;
