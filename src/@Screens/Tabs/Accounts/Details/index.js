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

import React,{useEffect, useState} from 'react';
import {View,Text,TouchableOpacity,Share,WebView} from 'react-native';
import styles from '../styles';
import WalletService from '../../../../@Services/wallet-service';
import walletUtils from '../../../../@Services/wallet-utils';
import { moderateScale } from 'react-native-size-matters';
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import Colors from '../../../../@Constants/Colors';
import QRCode from 'qrcode';

const Details = () =>{

    const walletService = WalletService.getInstance();
    const pk = walletService.pk;    
    const accAddress = walletUtils.createAddressFromPrivateKey(pk);

    const [isActive, setIsActive] = useState(false);
    const [qrSvg , setQrSvg] = useState(undefined);

    useEffect(()=>{generateQR();},[]);

    const generateQR = async() => {
        let svg = await QRCode.toString(accAddress,{type:'svg'});
        setQrSvg(svg);
        console.log(svg);

        // QRCode.toDataURL(accAddress)
        //     .then(url => {
        //         console.log(url);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
    };

    const copyToClipboard = () =>{
        Clipboard.setString(accAddress);
        Toast.show('Address Copied to Clipboard',Toast.LONG);
    };

    const shareAddress = () =>{
        Share.share({
            message: accAddress,
        }, {
            // Android only:
            dialogTitle: 'Trustless Capital - Account Address',
            // iOS only:
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        });
    };

    const renderQrCodeBox = () =>{
        console.log('qrSvg',qrSvg);
        return(
            <View style={styles.bottomModal}>
                <TouchableOpacity onPress={()=>setIsActive(false)} style={{alignSelf:'flex-end',paddingHorizontal:moderateScale(8),padding:moderateScale(2)}}>
                    <Text style={{color:Colors.darkGrey}}>Done</Text>
                </TouchableOpacity>
                <Text style={{alignSelf:'center',fontSize:moderateScale(16),marginVertical:moderateScale(5),fontWeight:'bold'}}>Send To You Wallet</Text>
                <View style={styles.barcodeBox}>
                    {(!qrSvg) && <Text>Preparing...</Text>}
                    {
                        (qrSvg) && 
                            <WebView  source={{uri:qrSvg}} />
                    }
                </View>
                <TouchableOpacity onPress={()=>copyToClipboard()}>
                    <Text style={{...styles.accAddressText,color:Colors.darkGrey,alignSelf:'center',marginTop:moderateScale(10)}}>Account Addess</Text>
                    <Text style={{...styles.titleBar_title,maxWidth:moderateScale(200),color:Colors.darkGrey,alignSelf:'center',textAlign:'center'}}>{accAddress}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={()=>shareAddress()} style={styles.shareButton}>
                    <Text style={{color:Colors.white}}>Share</Text>
                </TouchableOpacity>
            </View>
        );
    };
    
    return(
        <View style={{...styles.boxWrapper,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.accAddressText}>Account Addess</Text>
            <Text ellipsizeMode={'middle'} numberOfLines={1} style={{...styles.titleBar_title,maxWidth:moderateScale(100)}}>{accAddress}</Text>
            <View style={styles.buttonWrappers}>
                <TouchableOpacity onPress={()=>copyToClipboard()} style={styles.buttons}>
                    <Icon name={'copy'} size={moderateScale(16)} />
                    <Text style={styles.buttonText}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setIsActive(true)} style={styles.buttons}>
                    <Icon name={'qrcode'} size={moderateScale(16)} />
                    <Text style={styles.buttonText}>Receive</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                backdropColor={'#000'}
                dismissable={true}
                isVisible={isActive}
                onBackButtonPress={()=>setIsActive(false)}
                onBackdropPress={()=>setIsActive(false)}
                style={{padding:0,margin:0}}
                useNativeDriver={true}
            >
                {renderQrCodeBox()}
            </Modal>
        </View>
    );
};

Details.propTypes = {
    
};

 
export default Details;