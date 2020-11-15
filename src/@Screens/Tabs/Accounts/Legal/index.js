// Copyright (C) 2020  Trustless Pvt Ltd. <https://trustless.capital>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Created By @name Sukumar_Abhijeet,
 */

import React from 'react';
import {View,Text,Linking} from 'react-native';
import PropTypes from 'prop-types';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import styles from '../styles';
import Options from '../Options';
import Colors from '../../../../@Constants/Colors';
import SUPPORT from '../../../../@Constants/Supports';

const {termAndConditions,privacyPolicy} = SUPPORT;

const availabeOptions = [
    {icon:'',name:'Privacy Policy',showArrow:true},
    {icon:'',name:'Terms And Conditions',showArrow:true},
];
 
const Legal = ({...props}) =>{

    const checkOptions = (index) =>{
        console.log('checkOptions',index);
    };

    const openLink = async (index)=>{
        try {
            const url = index ? termAndConditions : privacyPolicy;
            if (await InAppBrowser.isAvailable()) {
                await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'done',
                    preferredBarTintColor: Colors.white,
                    preferredControlTintColor: Colors.tintColor,
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'pageSheet',
                    modalTransitionStyle: 'coverVertical',
                    modalEnabled: true,
                    enableBarCollapsing: true,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: Colors.primaryBg,
                    secondaryToolbarColor: 'white',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Animations
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right',
                    },
                    headers: {
                        'my-custom-header': 'Track Status',
                    },
                });
            }
            else Linking.openURL(url);
        } catch (error) {
            console.log(error.message);
        }
    };

    return(
        <View style={styles.boxWrapper}>
            <Text style={styles.titleBar_title}>Legal</Text>
            {availabeOptions.map((item,index)=>(
                <Options key={index} onPress={()=>openLink(index)} optionItem={item} />
            ))}
        </View>
    );
};

Legal.propTypes = {
    
};

 
export default Legal;