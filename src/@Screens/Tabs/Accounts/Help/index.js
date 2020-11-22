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
import styles from '../styles';
import Options from '../Options';
import {version} from '../../../../../package.json';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Colors from '../../../../@Constants/Colors';
import SUPPORT from '../../../../@Constants/Supports';

const {twitterLink,helpAndSuport} = SUPPORT;

const availabeOptions = [
    {icon:'question-circle',name:'Help And Support',showArrow:true,itemValue:''},
    {icon:'twitter',name:'Follow Us on Twitter',showArrow:true,itemValue:''},
    {icon:'info-circle',name:'App Version',showArrow:false,itemValue:version,disabled:true},
];
 
const Help = () =>{

    const checkOption = (index) =>{
        openLink(index);
    };

    const openLink = async (index)=>{
        try {
            const url =  index ? twitterLink : helpAndSuport;
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
            <Text style={styles.titleBar_title}>Help</Text>
            {availabeOptions.map((item,index)=>(
                <Options key={index} onPress={()=>checkOption(index)} optionItem={item} optionValue={item.itemValue} />
            ))}
        </View>
    );
};

Help.propTypes = {
    
};

 
export default Help;