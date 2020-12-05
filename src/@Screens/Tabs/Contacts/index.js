/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import {
    SafeAreaView,
    Text,
} from 'react-native';
import styles from './styles';
import Colors from '../../../@Constants/Colors';
import StatusBarColor from '../../../@Components/status-bar-color';
import { moderateScale } from 'react-native-size-matters';

const ContactsScreen = () =>{
    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBarColor
                backgroundColor={Colors.primary_bg} 
                barStyle="light-content"
            />
            <Text style={{color:'#fff',alignSelf:'center',fontSize:moderateScale(16)}}>Coming Soon.</Text>
        </SafeAreaView>
    );
};

export default ContactsScreen;
