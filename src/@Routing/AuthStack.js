  
/**
 * Create By @name Sukumar_Abhijeet
 */

import React from 'react';
import {createStackNavigator,} from '@react-navigation/stack';

import SignUp from '../@Screens/Auth/SignUp';
import PINScreen from '../@Screens/Auth/Pin';
import {PIN_SCREEN_MODE} from '../@Constants';
import VerificationScreen from '../@Screens/Auth/Verification';
import SeedPhraseNoticeScreen from '../@Screens/Auth/Seeds/seedphrase-notice';
import SeedPhraseScreen from '../@Screens/Auth/Seeds/seedphrase';
import SeedPhraseRecoveryScreen from '../@Screens/Auth/Seeds/seedphrase-recovery';
import SplashScreen from '../@Screens/Auth/Splash';

const Stack = createStackNavigator();
const navigationOptions = {headerShown: false};

const AuthNavigator = ({...props}) => {
    const {navigation:{state:{params}}} = props;
    return (
        <Stack.Navigator headerMode="none"  initialRouteName={'Splash'}>
            <Stack.Screen
                component={SplashScreen}
                initialParams={params}
                name="Splash"
                options={navigationOptions}
            />
            <Stack.Screen
                component={SignUp}
                name="SignUp"
                options={navigationOptions}
            />
            <Stack.Screen
                component={PINScreen}
                initialParams={{mode: PIN_SCREEN_MODE.LOGIN_PIN}}
                name="PINScreen"
                options={navigationOptions}
            />
            <Stack.Screen
                component={VerificationScreen}
                name="VerificationScreen"
                options={navigationOptions}
            />
            <Stack.Screen
                component={SeedPhraseNoticeScreen}
                name="SeedPhraseNoticeScreen"
                options={navigationOptions}
            />
            <Stack.Screen
                component={SeedPhraseScreen}
                name="SeedPhraseScreen"
                options={navigationOptions}
            />
            <Stack.Screen
                component={SeedPhraseRecoveryScreen}
                name="SeedPhraseRecoveryScreen"
                options={navigationOptions}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;