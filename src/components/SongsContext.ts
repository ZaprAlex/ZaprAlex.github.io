import React from 'react';

import { getShowFavoritesOnly } from '../api/songService';

export const SWITCH_FAVORITES_ACTION = 'SWITCH_FAVORITES_ACTION';

export type SongsState = {
  showFavoritesOnly: boolean;
};

export type SwitchFavoritesAction = {
  type: typeof SWITCH_FAVORITES_ACTION;
  payload: {
    showFavoritesOnly: SongsState['showFavoritesOnly'];
  };
};

export interface SongsContext extends React.Context<never> {
  state: SongsState;
  dispatch: React.Dispatch<SwitchFavoritesAction>;
}

export const SongsContext = React.createContext<SongsContext>({
  state: { showFavoritesOnly: getShowFavoritesOnly() }
} as SongsContext);
