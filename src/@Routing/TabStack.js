/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator,} from '@react-navigation/stack';

// TABS
import AccountsScreen from '../@Screens/Tabs/Accounts';
import DashboardScreen from '../@Screens/Tabs/Dashboard';

// COMMON STACK
import DepositHomeScreen from '../@Screens/Tabs/@Common/Deposits/Home';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const navigationOptions = {headerShown: false};

const TabStack =()=> {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Accounts" component={AccountsScreen} />
        </Tab.Navigator>
    );
  }

const MixNavigator = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Tabs'} headerMode="none">
          <Stack.Screen
            component={TabStack}
            name="Tabs"
            options={navigationOptions}
            />
            
            <Stack.Screen
              name="DepositHomeScreen"
              component={DepositHomeScreen}
              options={navigationOptions}
            />
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

export default MixNavigator;