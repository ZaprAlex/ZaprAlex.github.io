import React, { FC } from 'react';
import cn from 'classnames';

import { useTheme } from './hooks/useTheme';
import { NavigationProvider } from './component/Navigation';
import ContextContainer from './containers/ContextContainer';
import ThemeContextContainer from './containers/ThemeContextContainer';
import MainPage from './pages/MainPage';

import styles from './App.module.scss';

const App: FC = () => {
    const { theme } = useTheme();

    return (
        <ThemeContextContainer>
            <ContextContainer>
                <NavigationProvider>
                    <div
                        id="base"
                        className={cn(styles.app, theme)}
                    >
                        <MainPage />
                    </div>
                </NavigationProvider>
            </ContextContainer>
        </ThemeContextContainer>
    );
};

export default App;
