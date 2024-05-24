import React, { FC, PropsWithChildren, useReducer } from 'react';

import {
  CHANGE_THEME_ACTION,
  SettingsAction,
  SettingsContext,
  SettingsState,
  SWITCH_FAVORITES_ACTION,
  TOGGLE_SHOW_CHORDS_ACTION,
  TOGGLE_AUTOSCROLL
} from '../components/SettingsContext';

import { getShowFavoritesOnly, getTheme } from '../api/settingService';

export function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
  case CHANGE_THEME_ACTION:
  case SWITCH_FAVORITES_ACTION:
    return { ...state, ...action.payload };
  case TOGGLE_AUTOSCROLL:
    return { ...state, autoscrollEnabled: !state.autoscrollEnabled };
  case TOGGLE_SHOW_CHORDS_ACTION:
    return { ...state, showChords: !state.showChords };
  default:
    return state;
  }
}

const SettingsContextContainer: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer,
    { showFavoritesOnly: getShowFavoritesOnly(), theme: getTheme(), autoscrollEnabled: false, showChords: false });
  const contextValue = { state, dispatch } as React.ContextType<typeof SettingsContext>;

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export default SettingsContextContainer;
