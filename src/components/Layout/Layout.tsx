import React, { FC, PropsWithChildren, useState } from 'react';
import Modal from 'react-modal';
import cn from 'classnames';

import { Themes } from '../../constants/Themes';
import { useTheme } from '../../hooks';
import AutoscrollPanel from '../AutoscrollPanel';
import FullscreenButton from '../FullscreenButton';
import Header from '../../containers/MainHeader';
import IconButton from '../IconButton';
import Moon from '../../assets/Moon';
import Sun from '../../assets/Sun';
import SettingsGear from '../../assets/SettingsGear';

import styles from './Layout.module.scss';


const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { theme, switchTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <div id="base" className={cn(styles.page, theme)}>
      <div className={styles.content}>
        <Header />
        {children}

        <div className={styles.settingsPanel} onClick={openModal}>
          <span>
            <SettingsGear />
          </span>
        </div>
      </div>

      <Modal
        onRequestClose={closeModal}
        isOpen={isOpen}
        className={styles.modalContent}
        overlayClassName={cn(styles.overlay)}
        bodyOpenClassName={styles.bodyOpenClassName}
        ariaHideApp={false}
      >
        <AutoscrollPanel />
        <IconButton onClick={switchTheme} ariaLabel="change theme">
          {theme === Themes.LIGHT ? <Moon /> : <Sun />}
        </IconButton>
        <FullscreenButton />
      </Modal>
    </div>
  );
};

export default Layout;
