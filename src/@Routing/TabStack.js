/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, } from '@react-navigation/stack';
import { moderateScale } from 'react-native-size-matters';

import Colors from '../@Constants/Colors';
import TabIcons from './TabIcons';

// TABS
import AccountsScreen from '../@Screens/Tabs/Accounts';
import DashboardScreen from '../@Screens/Tabs/Dashboard';

// COMMON STACK
import DepositHomeScreen from '../@Screens/Tabs/@Common/Deposits/Home';
import DepositConfirmScreen from '../@Screens/Tabs/@Common/Deposits/Confirm';
import DepositStatusScreen from '../@Screens/Tabs/@Common/Deposits/Status';
import DepositEthBalanceScreen from '../@Screens/Tabs/@Common/Deposits/NetworkBalances';
import DepositEthScreen from '../@Screens/Tabs/@Common/Deposits/EthNetwork';
import TransactionScreen from '../@Screens/Tabs/Transactions';
import ContactsScreens from '../@Screens/Tabs/Contacts';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const navigationOptions = { headerShown: false };

const getTabBarIcon = (route, focused) => {
  const { name } = route;
  let imageName = '';
  switch (name) {
    case 'Dashboard':
      imageName = 1;
      break;
    case 'Tansactions':
      imageName = 2;
      break;
    case 'Contacts':
      imageName = 3;
      break;
    case 'Accounts':
      imageName = 4;
      break;
  }
  return <TabIcons focused={focused} imageOption={imageName} />;
}

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => getTabBarIcon(route, focused)
      })}
      tabBarOptions={{
        activeTintColor: Colors.activeTintRed,
        activeBackgroundColor: Colors.primaryBg,
        inactiveBackgroundColor: Colors.primaryBg,
        showLabel: false,
        style: { height: moderateScale(70), borderTopWidth: 0 },
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tansactions" component={TransactionScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreens} />
      <Tab.Screen name="Accounts" component={AccountsScreen} />
    </Tab.Navigator>
  );
}

const MixNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Tabs'} options={navigationOptions} headerMode="none">
      <Stack.Screen component={TabStack} name="Tabs" />

      <Stack.Screen name="DepositHomeScreen" component={DepositHomeScreen} />
      <Stack.Screen name="DepositConfirmScreen" component={DepositConfirmScreen} />
      <Stack.Screen name="DepositStatusScreen" component={DepositStatusScreen} />
      <Stack.Screen name="DepositEthBalanceScreen" component={DepositEthBalanceScreen} />
      <Stack.Screen name="DepositEthScreen" component={DepositEthScreen} />
    </Stack.Navigator>
  );
};

export default MixNavigator;