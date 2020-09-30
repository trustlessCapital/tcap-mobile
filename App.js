/**
 * @format
 * @flow strict-local
 */

import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthNavigator from './src/@Routing/AuthStack';
import Colors from './src/constants/Colors';
import StatusBarColor from './src/components/status-bar-color';
import MixNavigator from './src/@Routing/TabStack';


export default function App() {
    return (
        <SafeAreaProvider>
            <StatusBarColor
                backgroundColor={Colors.primaryBg}
                barStyle="light-content"
            />
            {/* <AuthNavigator /> */}
            <MixNavigator />
        </SafeAreaProvider>
    );
}