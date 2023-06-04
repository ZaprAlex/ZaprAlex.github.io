import React, { FC, useCallback, useContext } from 'react';
import cn from 'classnames';

import { saveTheme } from '../../api/settingService';
import { Themes } from '../../constants/Themes';
import { CHANGE_THEME_ACTION, ThemeContext } from '../ThemeContext';
import IconButton from '../IconButton';
import Navbar from '../Navbar';
import { HeaderProps } from './types';
import ArrowBack from '../../assets/ArrowBack';
import Moon from '../../assets/Moon';
import Sun from '../../assets/Sun';

import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

const { DARK, LIGHT } = Themes;

const Header: FC<HeaderProps> = ({
  position = 'sticky',
  className
}) => {
  const navigate = useNavigate();
  const {
    state: { theme },
    dispatch
  } = useContext(ThemeContext);

  const goBack = useCallback(() => navigate(-1), [navigate]);

  function toggleTheme() {
    if (theme === LIGHT) {
      changeTheme(DARK);
    } else {
      changeTheme(LIGHT);
    }
  }

  const changeTheme = (theme: Themes) => {
    saveTheme(theme);
    dispatch({
      type: CHANGE_THEME_ACTION,
      payload: { theme }
    });
  };

  return (
    <div
      id="header"
      className={cn(styles.header, styles[position], className)}
    >
      <div className={styles.slots}>
        <div className={styles.slot}>
          <IconButton onClick={goBack} ariaLabel="go back">
            <ArrowBack />
          </IconButton>
        </div>
        <div className={styles.slot}><Navbar /></div>
        <div className={styles.slot}>
          <IconButton onClick={toggleTheme} ariaLabel="change theme">
            {theme === Themes.LIGHT ? <Moon /> : <Sun />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
