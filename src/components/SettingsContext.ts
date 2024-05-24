import React from 'react';

import { getShowFavoritesOnly, getTheme } from '../api/settingService';
import { Themes } from '../constants/Themes';

export const CHANGE_THEME_ACTION = 'CHANGE_THEME_ACTION';
export const SWITCH_FAVORITES_ACTION = 'SWITCH_FAVORITES_ACTION';
export const TOGGLE_AUTOSCROLL = 'TOGGLE_AUTOSCROLL';
export const TOGGLE_SHOW_CHORDS_ACTION = 'TOGGLE_SHOW_CHORDS_ACTION';

export type SettingsState = {
  autoscrollEnabled: boolean;
  showFavoritesOnly: boolean;
  showChords: boolean;
  theme: Themes;
};

export type ChangeThemeAction = {
  type: typeof CHANGE_THEME_ACTION;
  payload: {
    theme: SettingsState['theme'];
  };
};

export type ToggleAutoscrollAction = {
  type: typeof TOGGLE_AUTOSCROLL;
};

export type SwitchFavoritesAction = {
  type: typeof SWITCH_FAVORITES_ACTION;
  payload: {
    showFavoritesOnly: SettingsState['showFavoritesOnly'];
  };
};

export type ToggleShowChordsAction = {
  type: typeof TOGGLE_SHOW_CHORDS_ACTION;
};

export type SettingsAction =
  ChangeThemeAction |
  ToggleAutoscrollAction |
  SwitchFavoritesAction |
  ToggleShowChordsAction;

export interface SettingsContext extends React.Context<never> {
  state: SettingsState;
  dispatch: React.Dispatch<SettingsAction>;
}

export const SettingsContext = React.createContext<SettingsContext>({
  state: { showFavoritesOnly: getShowFavoritesOnly(), theme: getTheme(), autoscrollEnabled: false, showChords: false }
} as SettingsContext);
