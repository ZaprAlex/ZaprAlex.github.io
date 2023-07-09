import React, { FC } from 'react';

import ModalContextContainer from './containers/ModalContextContainer';
import SettingsContextContainer from './containers/SettingsContextContainer';
import { NavigationProvider } from './components/Navigation';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';

const App: FC = () => (
  <ModalContextContainer>
    <SettingsContextContainer>
      <NavigationProvider>
        <Layout>
          <MainPage />
        </Layout>
      </NavigationProvider>
    </SettingsContextContainer>
  </ModalContextContainer>
);

export default App;
