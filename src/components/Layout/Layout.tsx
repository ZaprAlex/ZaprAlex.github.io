import React, { FC, PropsWithChildren, useState } from 'react';
import Modal from 'react-modal';
import cn from 'classnames';

import { useTheme } from '../../hooks';
import Header from '../../containers/MainHeader';
import SettingsPanel from './SettingsPanel';
import SettingsGear from '../../assets/SettingsGear';

import styles from './Layout.module.scss';


const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
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
        <SettingsPanel />
      </Modal>
    </div>
  );
};

export default Layout;
