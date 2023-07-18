import React, { FC, useCallback } from 'react';

import { useModal } from '../../hooks';
import SettingsGear from '../../assets/SettingsGear';
import ModalTypes from '../../constants/ModalTypes';

import styles from './Footer.module.scss';

const Footer: FC = () => {
  const { openModal } = useModal();

  const onSettingsClick = useCallback(() => openModal(ModalTypes.SETTINGS), []);

  return (
    <div id="footer" className={styles.footer}>
      <div className={styles.audioPlayer} data-test-id="audio-player" />
      <div className={styles.settingsPanel} onClick={onSettingsClick}>
        <span>
          <SettingsGear />
        </span>
      </div>
    </div>
  );
};

export default Footer;
