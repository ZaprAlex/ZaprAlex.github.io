import React, { FC } from 'react';

import ThemeContextContainer from './containers/ThemeContextContainer';
import { NavigationProvider } from './components/Navigation';
import MainPage from './pages/MainPage';
import Layout from './components/Layout/Layout';

const App: FC = () => (
  <ThemeContextContainer>
    <NavigationProvider>
      <Layout>
        <MainPage />
      </Layout>
    </NavigationProvider>
  </ThemeContextContainer>
);

export default App;
