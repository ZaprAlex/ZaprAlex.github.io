import React, { FC, PropsWithChildren, useReducer } from 'react';

import {
  SWITCH_FAVORITES_ACTION,
  SwitchFavoritesAction,
} from '../components/SongsContext';
import { SongsContext, SongsState } from '../components/SongsContext';
import { getShowFavoritesOnly } from '../api/songService';

export function songsReducer(state: SongsState, action: SwitchFavoritesAction): SongsState {
  if (action.type === SWITCH_FAVORITES_ACTION) {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
}

const SongsContextContainer: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(songsReducer, { showFavoritesOnly: getShowFavoritesOnly() });
  const contextValue = { state, dispatch } as React.ContextType<typeof SongsContext>;

  return <SongsContext.Provider value={contextValue}>{children}</SongsContext.Provider>;
};

export default SongsContextContainer;
