import { useContext } from 'react';

import {
  CHANGE_THEME_ACTION,
  SettingsContext,
  SWITCH_FAVORITES_ACTION,
  TOGGLE_AUTOSCROLL
} from '../components/SettingsContext';
import { getShowFavoritesOnly, getTheme, saveShowFavoritesOnly, saveTheme } from '../api/settingService';
import { Themes } from '../constants/Themes';

const { DARK, LIGHT } = Themes;

export const useSettings = () => {
  const {
    state: { autoscrollEnabled, showFavoritesOnly, theme },
    dispatch
  } = useContext(SettingsContext);

  const switchFavorites = () => {
    saveShowFavoritesOnly(!showFavoritesOnly);
    dispatch({
      type: SWITCH_FAVORITES_ACTION,
      payload: { showFavoritesOnly: !showFavoritesOnly }
    });
  };

  const switchTheme = () => {
    const newTheme = theme === DARK ? LIGHT : DARK;
    saveTheme(newTheme);
    dispatch({
      type: CHANGE_THEME_ACTION,
      payload: { theme: newTheme }
    });
  };

  const toggleAutoscroll = () => dispatch({ type: TOGGLE_AUTOSCROLL });

  return {
    autoscrollEnabled,
    showFavoritesOnly: showFavoritesOnly || getShowFavoritesOnly(),
    theme: theme || getTheme(),
    toggleAutoscroll,
    switchFavorites,
    switchTheme,
  };
};
