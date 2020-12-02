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
import TransactionScreen from '../@Screens/Tabs/Transactions';
import ContactsScreens from '../@Screens/Tabs/Contacts';


// DEPOSIT FUNDS
import DepositHomeScreen from '../@Screens/Tabs/Dashboard/Deposits/Home';
import DepositConfirmScreen from '../@Screens/Tabs/Dashboard/Deposits/Confirm';
import DepositStatusScreen from '../@Screens/Tabs/Dashboard/Deposits/Status';
import DepositEthBalanceScreen from '../@Screens/Tabs/Dashboard/Deposits/NetworkBalances';
import DepositEthScreen from '../@Screens/Tabs/Dashboard/Deposits/EthNetwork';

//TRANSFER FUNDS 
import TransferHomeScreen from '../@Screens/Tabs/Dashboard/Transfers/Home';
import TransferConfirmationScreen from '../@Screens/Tabs/Dashboard/Transfers/Confirm';
import TransferStatusScreen from '../@Screens/Tabs/Dashboard/Transfers/Status';

//WITHDRAW FUNDS
import WithdrawHomeScreen from '../@Screens/Tabs/Dashboard/Withdraw/Home';
import WithdrawConfirmationScreen from '../@Screens/Tabs/Dashboard/Withdraw/Confirm';
import WithdrawStatusScreen from '../@Screens/Tabs/Dashboard/Withdraw/Status';

//TRANSACTION-HISTORY
import TransactionStatusScreen from '../@Screens/Tabs/Transactions/Status';

//COMMON SCREENS
import ScannerScreen from '../@Screens/Tabs/@Common/Scanner';
import AccountUnlockScreen from '../@Screens/Tabs/@Common/AccountUnlock';

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
    case 'Transactions':
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
                showIcon: true,
                style: { 
                    height: Platform.OS === 'ios' ? moderateScale(90)  : moderateScale(40), borderTopWidth: 0, 
                },
            }}
        >
            <Tab.Screen component={DashboardScreen} initialParams={params} name="Dashboard" />
            <Tab.Screen component={TransactionScreen} initialParams={params} name="Transactions" />
            <Tab.Screen component={ContactsScreens} initialParams={params} name="Contacts" />
            <Tab.Screen component={AccountsScreen} initialParams={params} name="Accounts" />
        </Tab.Navigator>
    );
};

const MixNavigator = ({...props}) => {
    const {navigation:{state:{params}}} = props;

    return (
        <Stack.Navigator headerMode="none" initialRouteName={'Tabs'} options={navigationOptions}>
            <Stack.Screen component={TabStack} initialParams={params} name="Tabs" />

            {/* DEPOSIT STACK */}
            <Stack.Screen component={DepositHomeScreen}  name="DepositHomeScreen" />
            <Stack.Screen component={DepositConfirmScreen} name="DepositConfirmScreen" />
            <Stack.Screen component={DepositStatusScreen} name="DepositStatusScreen" />
            <Stack.Screen component={DepositEthBalanceScreen} name="DepositEthBalanceScreen" />
            <Stack.Screen component={DepositEthScreen} name="DepositEthScreen" />

            {/* TRANSFER STACK */}
            <Stack.Screen component={TransferHomeScreen}  name="TransferHomeScreen" />
            <Stack.Screen component={TransferConfirmationScreen}  name="TransferConfirmationScreen" />
            <Stack.Screen component={TransferStatusScreen}  name="TransferStatusScreen" />

            {/* WITHDRAW STACK */}
            <Stack.Screen component={WithdrawHomeScreen}  name="WithdrawHomeScreen" />
            <Stack.Screen component={WithdrawConfirmationScreen}  name="WithdrawConfirmationScreen" />
            <Stack.Screen component={WithdrawStatusScreen}  name="WithdrawStatusScreen" />


            {/* TRANSACTION HISTORY STACK */}
            <Stack.Screen component={TransactionStatusScreen}  name="TransactionStatusScreen" />

            {/* QRCODE SCANNER  */}
            <Stack.Screen component={ScannerScreen}  name="ScannerScreen" />

            {/* ACCOUNT UNLOCK */}
            <Stack.Screen component={AccountUnlockScreen} name ='AccountUnlockScreen' />
            
        </Stack.Navigator>
    );
};

export default MixNavigator;