import React, { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import { useModal, useSettings } from '../../hooks';
import ModalTypes from '../../constants/ModalTypes';
import Header from '../../containers/MainHeader';
import PopUp from '../PopUp';
import SettingsGear from '../../assets/SettingsGear';

import styles from './Layout.module.scss';


const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useSettings();
  const { openModal } = useModal();

  const onSettingsClick = () => openModal(ModalTypes.SETTINGS);

  return (
    <div id="base" className={cn(styles.page, theme)}>
      <div className={styles.content}>
        <Header />

        {children}

        <div className={styles.settingsPanel} onClick={onSettingsClick}>
          <span>
            <SettingsGear />
          </span>
        </div>
      </div>

      <PopUp />
    </div>
  );
};

export default Layout;
