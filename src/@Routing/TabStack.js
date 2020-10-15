/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import {Platform} from 'react-native';
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
};

const TabStack = ({...props}) => {
    const {route:{params}} = props;
    return (
        <Tab.Navigator
            initialRouteName={'Dashboard'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => getTabBarIcon(route, focused)
            })}
            tabBarOptions={{
                activeTintColor: Colors.activeTintRed,
                activeBackgroundColor: Colors.primaryBg,
                inactiveBackgroundColor: Colors.primaryBg,
                showLabel: false,
                // showIcon: true,
                style: { height: Platform.OS === 'ios' ? moderateScale(90)  : moderateScale(70), borderTopWidth: 0 },
            }}
        >
            <Tab.Screen component={DashboardScreen} initialParams={params} name="Dashboard" />
            <Tab.Screen component={TransactionScreen} name="Tansactions" />
            <Tab.Screen component={ContactsScreens} name="Contacts" />
            <Tab.Screen component={AccountsScreen} initialParams={params} name="Accounts" />
        </Tab.Navigator>
    );
};

const MixNavigator = ({...props}) => {
    const {navigation:{state:{params}}} = props;

    return (
        <Stack.Navigator headerMode="none" initialRouteName={'Tabs'} options={navigationOptions}>
            <Stack.Screen component={TabStack} initialParams={params} name="Tabs" />

            <Stack.Screen component={DepositHomeScreen}  name="DepositHomeScreen" />
            <Stack.Screen component={DepositConfirmScreen} name="DepositConfirmScreen" />
            <Stack.Screen component={DepositStatusScreen} name="DepositStatusScreen" />
            <Stack.Screen component={DepositEthBalanceScreen} name="DepositEthBalanceScreen" />
            <Stack.Screen component={DepositEthScreen} name="DepositEthScreen" />
        </Stack.Navigator>
    );
};

export default MixNavigator;