  
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
import DashboardScreen from '../@Screens/Tabs/Dashboard';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from '../@Screens/Auth/Splash';

const Stack = createStackNavigator();
const navigationOptions = {headerShown: false};

const AuthNavigator = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Splash'} headerMode="none">
          <Stack.Screen
            component={SplashScreen}
            name="Splash"
            options={navigationOptions}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={navigationOptions}
            />
            <Stack.Screen
              name="PINScreen"
              component={PINScreen}
              initialParams={{mode: PIN_SCREEN_MODE.LOGIN_PIN}}
              options={navigationOptions}
            />
            <Stack.Screen
              name="VerificationScreen"
              component={VerificationScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="SeedPhraseNoticeScreen"
              component={SeedPhraseNoticeScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="SeedPhraseScreen"
              component={SeedPhraseScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="SeedPhraseRecoveryScreen"
              component={SeedPhraseRecoveryScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="DashboardScreen"
              component={DashboardScreen}
              options={navigationOptions}
            />
            {/* <Stack.Screen
              name="DepositHomeScreen"
              component={DepositHomeScreen}
              options={navigationOptions}
            /> */}
            {/* <Stack.Screen
              name="DepositEthBalanceScreen"
              component={DepositEthBalanceScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="DepositEthScreen"
              component={DepositEthScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="DepositConfirmScreen"
              component={DepositConfirmScreen}
              options={navigationOptions}
            />
            <Stack.Screen
              name="DepositStatusScreen"
              component={DepositStatusScreen}
              options={navigationOptions}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;