import React, { FC } from 'react';

import AutoscrollSwitch from './AutoscrollSwitch';
import FullscreenSwitch from './FullscreenSwitch';
import ThemeSwitch from './ThemeSwitch';

import styles from './SettingsPanel.module.scss';

const SettingsPanel: FC = () => (
  <div className={styles.panel}>
    <AutoscrollSwitch />
    <ThemeSwitch />
    <FullscreenSwitch />
  </div>
);

export default SettingsPanel;
