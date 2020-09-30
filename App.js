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
import Controller from './src/@Routing';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
    return (
        <SafeAreaProvider>
            <StatusBarColor
                backgroundColor={Colors.primaryBg}
                barStyle="light-content"
            />
            <NavigationContainer>
                <Controller />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}