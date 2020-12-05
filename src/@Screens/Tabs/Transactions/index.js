/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import {
    SafeAreaView
} from 'react-native';
import styles from './styles';
import Colors from '../../../@Constants/Colors';
import StatusBarColor from '../../../@Components/status-bar-color';
import TransactionHistory from './TransactionHistory';

const TransactionScreen = () =>{
    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBarColor
                backgroundColor={Colors.primary_bg}
                barStyle="light-content"
            />
            <TransactionHistory />
        </SafeAreaView>
    );
};

export default TransactionScreen;