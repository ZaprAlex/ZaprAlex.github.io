import { useContext } from 'react';

import { getTheme, saveTheme } from '../api/settingService';
import { CHANGE_THEME_ACTION, ThemeContext } from '../components/ThemeContext';
import { Themes } from '../constants/Themes';

const { DARK, LIGHT } = Themes;

export const useTheme = () => {
  const {
    state: { theme },
    dispatch
  } = useContext(ThemeContext);

  const switchTheme = () => {
    const newTheme = theme === DARK ? LIGHT : DARK;
    saveTheme(newTheme);
    dispatch({
      type: CHANGE_THEME_ACTION,
      payload: { theme: newTheme }
    });
  };

  return { theme: theme || getTheme(), switchTheme };
};
