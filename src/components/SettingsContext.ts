import React from 'react';


import { getShowFavoritesOnly } from '../api/settingService';

export const SWITCH_FAVORITES_ACTION = 'SWITCH_FAVORITES_ACTION';

export type SettingsState = {
  showFavoritesOnly: boolean;
};

export type SwitchFavoritesAction = {
  type: typeof SWITCH_FAVORITES_ACTION;
  payload: {
    showFavoritesOnly: SettingsState['showFavoritesOnly'];
  };
};

export interface SettingsContext extends React.Context<never> {
  state: SettingsState;
  dispatch: React.Dispatch<SwitchFavoritesAction>;
}

export const SettingsContext = React.createContext<SettingsContext>({
  state: { showFavoritesOnly: getShowFavoritesOnly() }
} as SettingsContext);
