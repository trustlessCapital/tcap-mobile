/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { createSwitchNavigator } from "@react-navigation/compat";
import AuthNavigator from './AuthStack';
import MixNavigator from './TabStack';

const Controller = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        App: MixNavigator,
    },
    {
        initialRouteName: 'App'
    }
);

export default Controller