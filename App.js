/**
 * @format
 * @flow strict-local
 */

/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from './src/@Constants/Colors';
import StatusBarColor from './src/@Components/status-bar-color';
import AppRouter from './src/@Routing';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import reduxStore from './src/@Redux/store';


export default function App() {
    return (
        <Provider store={reduxStore}>
            <SafeAreaProvider>
                <StatusBarColor
                    backgroundColor={Colors.primaryBg}
                    barStyle="light-content"
                />
                <NavigationContainer>
                    <AppRouter />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}