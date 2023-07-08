import React, { FC } from 'react';

import ThemeContextContainer from './containers/ThemeContextContainer';
import SongsContextContainer from './containers/SongsContextContainer';
import { NavigationProvider } from './components/Navigation';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';

const App: FC = () => (
  <ThemeContextContainer>
    <SongsContextContainer>
      <NavigationProvider>
        <Layout>
          <MainPage />
        </Layout>
      </NavigationProvider>
    </SongsContextContainer>
  </ThemeContextContainer>
);

export default App;
