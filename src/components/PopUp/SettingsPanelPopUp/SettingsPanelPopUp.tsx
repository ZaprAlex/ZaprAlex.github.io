import React, { FC } from 'react';

import { useModal } from '../../../hooks';
import AutoscrollSwitch from './AutoscrollSwitch';
import FullscreenSwitch from './FullscreenSwitch';
import ThemeSwitch from './ThemeSwitch';
import Cross from '../../../assets/Cross';

import styles from './SettingsPanelPopUp.module.scss';

const SettingsPanelPopUp: FC = () => {
  const { closeModal } = useModal();

  return (
    <div className={styles.panel}>
      <div className={styles.settings}>
        <AutoscrollSwitch />
        <ThemeSwitch />
        <FullscreenSwitch />
      </div>
      <div onClick={closeModal} className={styles.cancelButton}>
        <Cross />
      </div>
    </div>
  );
};

export default SettingsPanelPopUp;
