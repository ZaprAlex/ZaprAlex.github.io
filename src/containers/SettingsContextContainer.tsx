import React, { FC, PropsWithChildren, useReducer } from 'react';

import {
  SWITCH_FAVORITES_ACTION,
  SwitchFavoritesAction,
} from '../components/SettingsContext';
import { SettingsContext, SettingsState } from '../components/SettingsContext';

import { getShowFavoritesOnly } from '../api/settingService';

export function settingsReducer(state: SettingsState, action: SwitchFavoritesAction): SettingsState {
  if (action.type === SWITCH_FAVORITES_ACTION) {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
}

const SettingsContextContainer: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, { showFavoritesOnly: getShowFavoritesOnly() });
  const contextValue = { state, dispatch } as React.ContextType<typeof SettingsContext>;

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export default SettingsContextContainer;
