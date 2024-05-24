import { useContext } from 'react';

import {
  CHANGE_THEME_ACTION,
  SettingsContext,
  SWITCH_FAVORITES_ACTION,
  TOGGLE_AUTOSCROLL,
  TOGGLE_SHOW_CHORDS_ACTION
} from '../components/SettingsContext';
import { getShowFavoritesOnly, getTheme, saveShowChords, saveShowFavoritesOnly, saveTheme } from '../api/settingService';
import { Themes } from '../constants/Themes';

const { DARK, LIGHT } = Themes;

export const useSettings = () => {
  const {
    state: { autoscrollEnabled, showChords, showFavoritesOnly, theme },
    dispatch
  } = useContext(SettingsContext);

  const switchFavorites = () => {
    saveShowFavoritesOnly(!showFavoritesOnly);
    dispatch({
      type: SWITCH_FAVORITES_ACTION,
      payload: { showFavoritesOnly: !showFavoritesOnly }
    });
  };

  const toggleShowChords = () => {
    saveShowChords(!showChords);
    dispatch({ type: TOGGLE_SHOW_CHORDS_ACTION });
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
    showChords,
    showFavoritesOnly: showFavoritesOnly || getShowFavoritesOnly(),
    theme: theme || getTheme(),
    toggleAutoscroll,
    toggleShowChords,
    switchFavorites,
    switchTheme,
  };
};
