
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

 
import React, { useEffect, useState } from 'react';
import { View,SafeAreaView,TouchableOpacity,Text,Image,Linking } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../../../@GlobalStyles';
import styles from '../Home/styles';
import AppHeader from '../../../../../@Components/AppHeader';
import TransactionProcessing from '../../../../../@Components/TransactionProcess';
import Support from '../../../../../@Constants/Supports';
import Toast from 'react-native-simple-toast';
import { moderateScale } from 'react-native-size-matters';
import WalletService from '../../../../../@Services/wallet-service';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Colors from '../../../../../@Constants/Colors';
import { sendEmail } from '../../../../../@Services/email-service';
import walletUtils from '../../../../../@Services/wallet-utils';
import apiServices from '../../../../../@Services/api-services';

const {supportMail} = Support;
 
const TransferStatusScreen = ({...props}) =>{

    const walletService = WalletService.getInstance();

    const {
        route:{params},
        navigation
    } = props;

    const {transactionData:{address='',selectedAsset,amountToTransfer}} = params;
    const {symbol} = selectedAsset;
    const [isLoading,setIsLoading] = useState(true);
    const [errorOccured,setErrorOccured] = useState(false);
    const [transactionHash , setTransactionHash] = useState();

    useEffect(()=>{
        initiateTransaction();
    },[]);

    const initiateTransaction = () =>{
        const accAddress =  walletUtils.createAddressFromPrivateKey(walletService.pk);
        const decimalForToken = walletUtils.getDecimalValueForAsset(symbol);
        let weiUnit = Math.pow(10,decimalForToken);
        let Wei = (amountToTransfer * weiUnit).toString();

        walletService.transferFundsToZkSync(address,symbol,amountToTransfer)
            .then(data =>{
                const [receipt, txHash] = data;

                const body = {
                    'walletAddress': accAddress,
                    'txnType': 'transfer',
                    'amount': Wei,
                    'asset': symbol.toUpperCase(),
                    'status': receipt.executed ? 'complete' : 'pending',
                    'zksyncTxnId': txHash,
                    'recipientAddress': address
                };
                apiServices.setTransactionDetailsWithServer(body)
                    .then()
                    .catch();

                if(receipt.success)
                {
                    setTransactionHash(txHash);
                    setIsLoading(false);
                }
                else{
                    setErrorOccured(true);
                    setIsLoading(false);
                }
                
            })
            .catch(() =>{
                setErrorOccured(true);
                setIsLoading(false);
            });

    };

    const copyToClipboard = () =>{
        Clipboard.setString(supportMail);
        Toast.show('Email Copied to Clipboard',Toast.LONG);
    };

    const openEmailLink = () =>{
        sendEmail(supportMail)
            .then(() => {
                console.log('Our email successful provided to device mail ');
            });
    };

    const openLink = async ()=>{
        try {
            const url = walletService.getFundTransferStatusUrl(transactionHash);
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

    const getTransferContent = () =>{
        return (
            <View style={GlobalStyles.primaryCard}>
                <Image
                    resizeMode='contain'
                    source={require('../../../../../../assets/images/icons/check.png')}
                    style={styles.titleIcon}
                />
                <Text style={styles.title}>
            Your Fund Transfer transaction has been mined and will be processed
            after 1 confirmations. Click button below to track the progress
                </Text>
                <TouchableOpacity
                    onPress={() => openLink()}
                    style={[styles.buttonStyleSecondary]}>
                    <Text style={styles.buttonText}>Track Status</Text>
                </TouchableOpacity>
                <View style={styles.cardContent}>
                    <View style={[styles.cardFooter]}>
                        <TouchableOpacity
                            onPress={()=>{navigation.navigate('Dashboard');}}
                            style={[styles.buttonStylePrimary]}>
                            <Text style={styles.buttonText}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const getErrorContent = () =>{
        return (
            <View style={GlobalStyles.primaryCard}>
                <Text style={styles.title}>
                    Please try after sometime. 
                </Text>
                <Text style={styles.title}>
                    If issue still persists, the please contact at  {supportMail}
                </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%'}}>
                    <TouchableOpacity
                        onPress={() => openEmailLink()}
                        style={[styles.buttonStyleSecondary]}>
                        <Text style={styles.buttonText}>Send Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => copyToClipboard()}
                        style={[styles.buttonStyleSecondary,{marginLeft:moderateScale(25)}]}>
                        <Text style={styles.buttonText}>Copy Email</Text>
                    </TouchableOpacity>
                </View>
                <View style={{...styles.cardContent,marginTop:moderateScale(30)}}>
                    <View style={[styles.cardFooter]}>
                        <TouchableOpacity
                            onPress={()=>navigation.navigate('Dashboard')}
                            style={[styles.buttonStylePrimary]}>
                            <Text style={styles.buttonText}>Visit Dashboard</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    if(isLoading)
        return <TransactionProcessing />;

    return(
        <SafeAreaView style={GlobalStyles.appContainer}>
            <View style={styles.wrapper}>
                <AppHeader headerTitle={errorOccured ? 'Transaction Failed' : 'Transfer Initiated'}  />
                { !errorOccured && getTransferContent()}
                { errorOccured && getErrorContent()}
            </View>
        </SafeAreaView>
    );
};
 
TransferStatusScreen.propTypes = {
    navigation:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
};
 
export default TransferStatusScreen;