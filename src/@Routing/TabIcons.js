/**
 * Create By @name Sukumar_Abhijeet 
 */

import React from 'react';
import {Platform} from 'react-native';
import { Image, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const iconStyle = { width: moderateScale(25), height: moderateScale(25) };

const TabIcons = ({ ...props }) => {

    const { imageOption, focused } = props;

    const renderIcons = (option, focused) => {
        switch (option) {
        case 1:
            return (
                <Image
                    source={
                        focused ? require('../../assets/Tabs/homeFocused.svg') : require('../../assets/Tabs/home.svg')
                    }
                    style={iconStyle} />
            );
        case 2:
            return (
                <Image
                    source={
                        focused ? require('../../assets/Tabs/transactionFocused.svg') : require('../../assets/Tabs/transaction.svg')
                    }
                    style={iconStyle} />
            );
        case 3:
            return (
                <Image
                    source={
                        focused ? require('../../assets/Tabs/contactFocused.svg') : require('../../assets/Tabs/contact.svg')
                    }
                    style={iconStyle} />
            );
        case 4:
            return (
                <Image
                    source={
                        focused ? require('../../assets/Tabs/accountFocused.svg') : require('../../assets/Tabs/account.svg')
                    }
                    style={iconStyle} />
            );
        }
    };

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            {renderIcons(imageOption, focused)}
        </View>
    );
};

export default TabIcons;