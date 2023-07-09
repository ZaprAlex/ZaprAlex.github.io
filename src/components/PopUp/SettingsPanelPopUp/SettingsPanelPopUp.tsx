import React, { FC } from 'react';

import AutoscrollSwitch from './AutoscrollSwitch';
import FullscreenSwitch from './FullscreenSwitch';
import ThemeSwitch from './ThemeSwitch';

import styles from './SettingsPanelPopUp.module.scss';

const SettingsPanelPopUp: FC = () => (
  <div className={styles.panel}>
    <AutoscrollSwitch />
    <ThemeSwitch />
    <FullscreenSwitch />
  </div>
);

export default SettingsPanelPopUp;
