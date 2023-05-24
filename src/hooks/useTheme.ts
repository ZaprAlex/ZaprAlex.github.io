import { useContext } from 'react';

import { getTheme } from '../api/settingService';
import { ThemeContext } from '../components/ThemeContext';

export const useTheme = () => {
  const {
    state: { theme }
  } = useContext(ThemeContext);

  return { theme: theme || getTheme() };
};
