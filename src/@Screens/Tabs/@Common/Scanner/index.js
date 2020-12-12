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

import React,{useState} from 'react';
import {
    SafeAreaView,View
} from 'react-native';
import PropTypes from 'prop-types';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AppHeader from '../../../../@Components/AppHeader';
import Colors from '../../../../@Constants/Colors';
import { moderateScale } from 'react-native-size-matters';
import LoadingIndicator from '../../../../@Components/loading-indicator';
 
const ScannerScreen = ({...props}) =>{

    const {navigation:{navigate}} = props;

    const onSuccess = (info) =>{
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false);
            navigate('TransferHomeScreen',{scannedAddress : info.data});
        },300);
    };

    const [loading, setIsLoading] = useState(false);
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:Colors.primaryBg}}>
            <View style={{paddingHorizontal:moderateScale(20)}}>
                <AppHeader headerTitle={'Scan Address'} />
            </View>
            <QRCodeScanner
                cameraStyle={{flex:1}}
                flashMode={RNCamera.Constants.FlashMode.auto}
                onRead={(e) => onSuccess(e)}
            />
            <LoadingIndicator
                message={'Retrieving Address'}
                visible={loading}
            />
        </SafeAreaView>
    );
};

ScannerScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
};
 
export default ScannerScreen;

  