import { Themes } from '../constants/Themes';

const FAVORITES_KEY = 'show-favorites-only';
const THEME_KEY = 'app-theme';

export function saveTheme(theme: Themes) {
  window.localStorage.setItem(THEME_KEY, theme);
}
export function getTheme(): Themes {
  const theme = window.localStorage.getItem(THEME_KEY) as Themes | null;
  return theme ? theme : Themes.DARK;

}

export function saveShowFavoritesOnly(showFavoritesOnly: boolean) {
  window.sessionStorage.setItem(FAVORITES_KEY, String(showFavoritesOnly));
}

export function getShowFavoritesOnly() {
  return window.sessionStorage.getItem(FAVORITES_KEY) === 'true';
}