import { useContext } from 'react';

import { getShowFavoritesOnly, saveShowFavoritesOnly } from '../api/songService';
import { SongsContext, SWITCH_FAVORITES_ACTION } from '../components/SongsContext';

export const useSongPreferences = () => {
  const {
    state: { showFavoritesOnly },
    dispatch
  } = useContext(SongsContext);

  const switchFavorites = () => {
    saveShowFavoritesOnly(!showFavoritesOnly);
    dispatch({
      type: SWITCH_FAVORITES_ACTION,
      payload: { showFavoritesOnly: !showFavoritesOnly }
    });
  };

  return { showFavoritesOnly: showFavoritesOnly || getShowFavoritesOnly(), switchFavorites };
};
