import React, { FC } from 'react';

import ThemeContextContainer from './containers/ThemeContextContainer';
import SettingsContextContainer from './containers/SettingsContextContainer';
import { NavigationProvider } from './components/Navigation';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';

const App: FC = () => (
  <ThemeContextContainer>
    <SettingsContextContainer>
      <NavigationProvider>
        <Layout>
          <MainPage />
        </Layout>
      </NavigationProvider>
    </SettingsContextContainer>
  </ThemeContextContainer>
);

export default App;
