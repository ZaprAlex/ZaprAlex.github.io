import { useContext } from 'react';

import { SettingsContext, SWITCH_FAVORITES_ACTION } from '../components/SettingsContext';
import { getShowFavoritesOnly, saveShowFavoritesOnly } from '../api/settingService';

export const useSongPreferences = () => {
  const {
    state: { showFavoritesOnly },
    dispatch
  } = useContext(SettingsContext);

  const switchFavorites = () => {
    saveShowFavoritesOnly(!showFavoritesOnly);
    dispatch({
      type: SWITCH_FAVORITES_ACTION,
      payload: { showFavoritesOnly: !showFavoritesOnly }
    });
  };

  return { showFavoritesOnly: showFavoritesOnly || getShowFavoritesOnly(), switchFavorites };
};
