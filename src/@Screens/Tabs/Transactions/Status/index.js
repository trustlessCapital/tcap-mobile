
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
import { SafeAreaView,View,Image,Text,ScrollView,TouchableOpacity,Linking } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import { moderateScale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import styles from './styles';
import AppHeader from '../../../../@Components/AppHeader';
import { capitalize } from 'lodash';
import GlobalStyles from '../../../../@GlobalStyles';
import walletUtils from '../../../../@Services/wallet-utils';
import Modal from 'react-native-modal';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import WalletService from '../../../../@Services/wallet-service';
import Colors from '../../../../@Constants/Colors';
 
const TransactionStatusScreen = ({...props}) =>{

    const walletService = WalletService.getInstance();
    
    const {route:{params}} = props;
    const {historyData:{
        txnType,
        status,
        asset,
        amount,
        walletAddress='',
        recipientAddress='',
        txnId,
        zksyncTxnId='',
        ethTxnId=''
    },historyData} = params;

    const [modal,setModal] = useState(false);

    console.log('historyData',historyData);

    const renderType = () =>{
        if(txnType === 'deposit')
            return(
                <View style={styles.viewBox}>
                    <Text style={styles.descText}>To</Text>
                    <Text style={styles.valueText}>{walletAddress}</Text>
                </View>
            );
        if(txnType === 'transfer')
            return(
                <View style={styles.viewBox}>
                    <Text style={styles.descText}>To</Text>
                    <Text style={styles.valueText}>{recipientAddress}</Text>
                </View>
            );
    };


    const copyToClipboard = () =>{
        // setModal(false);s
        Clipboard.setString(txnId);
        Toast.show('Transaction Id Copied to Clipboard',Toast.LONG);
    };

    const openLink = async ()=>{
        // setModal(false);
        let url;
        try {
            url = txnType === 'deposit' ?  walletService.getTxStatusUrl(ethTxnId) : url = walletService.getFundTransferStatusUrl(zksyncTxnId);
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

    const renderTransactionOptions = () =>{
        return(
            <View style={styles.moduleModal}>
                <TouchableOpacity onPress={()=>openLink()} style={styles.optionTouch}>
                    <Text style={styles.modalText}>View Transaction On {txnType === 'deposit' ? 'Etherscan' : 'ZKSync'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>copyToClipboard()} style={styles.optionTouch}>
                    <Text style={styles.modalText}>Copy Transaction Id</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return(
        <SafeAreaView style={styles.wrapper}>
            <View style={{padding:moderateScale(20)}}>
                <AppHeader headerTitle={`${capitalize(txnType)} Status`} />
                <View style={styles.statusBox}>
                    <Image source={status === 'complete' ? require('../../../../../assets/images/icons/check.png') : require('../../../../../assets/images/icons/pending.png')} style={styles.image} />
                    <Text style={styles.statusText}>{capitalize(status)}</Text>
                </View>
                <ScrollView style={{marginTop:moderateScale(20)}}>
                    <View style={GlobalStyles.primaryCard}>
                        {renderType()}
                        <View style={styles.viewBox}>
                            <Text style={styles.descText}>Amount</Text>
                            <Text style={styles.valueText}>{walletUtils.getAssetDisplayText( asset,amount) +' '+asset}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>setModal(true)} style={styles.viewBox}>
                            <Text style={styles.descText}>Txn Id : </Text>
                            <Text style={styles.valueText}>{txnId}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Modal
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                backdropColor={'#000'}
                dismissable={true}
                isVisible={modal}
                onBackButtonPress={()=>setModal(false)}
                onBackdropPress={()=>setModal(false)}
                style={{padding:0}}
                useNativeDriver={true}
            >
                {renderTransactionOptions()}
            </Modal>
        </SafeAreaView>
    );
};
 
TransactionStatusScreen.propTypes = {
    route:PropTypes.object.isRequired,
};
 
export default TransactionStatusScreen;