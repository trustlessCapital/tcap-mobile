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
import {View,SafeAreaView,Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../../@GlobalStyles';
import styles from './styles';
import AppHeader from '../../../../@Components/AppHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import Colors from '../../../../@Constants/Colors';
import walletUtils from '../../../../@Services/wallet-utils';
import WalletService from '../../../../@Services/wallet-service';
import apiServices from '../../../../@Services/api-services';
import LoadingIndicator from '../../../../@Components/loading-indicator';
import * as AccountActions from '../../../../@Redux/actions/accountActions';
import Config from '../../../../@Config/default';
import ErrorDialog from '../../../../@Components/error-dialog';

const {ACCOUNT_UNLOCK_GAS} = Config;

const AccountUnlockScreen = ({...props}) =>{

    const {
        // exchangeRates,
        // selectedCurrency,
        accountDetails,
        setIsAccountUnlocked,
        navigation
    } = props;

    const {email,phoneNumber}  = accountDetails;

    const walletService = WalletService.getInstance();
    // const pk = walletService.pk;    
    // const accAddress = walletUtils.createAddressFromPrivateKey(pk);

    const [isActive, setIsActive] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState({'symbol': '', 'value': '0'});  
    const [fee , setFee] = useState(0);
    const [loader, setLoader] = useState(true);
    const [showErr, setShowErr] = useState(false);
    const [errMsg, setErrMsg] = useState('An Error Occured!');
    const [indicatingMssg , setIndicatingMsg] = useState('Refreshing Balance');
    const [ethBalance, setEthbalance] = useState([]);

    useEffect(()=>{
        fetchEtheriumBalance();
    },[]);

    const fetchEtheriumBalance = async () => {
        const address = await WalletService.getInstance().getEtheriumAddress();
        await apiServices.getEtheriumBalance(address).then(ethBalance => {
            setLoader(false);
            let filteredEth = ethBalance.filter(function(e) {
                return e.value !== 0;
            });
            if(filteredEth.length) {
                setSelectedAsset(filteredEth[0]);
                setNewAsset(filteredEth[0]);
            }
            setEthbalance(filteredEth);
        });
    };

    const setNewAsset = (item) =>{
        setSelectedAsset(item);
        setIsActive(false);
        // refreshAssets(item);
    };

    // const refreshAssets = (currentAsset) =>{
    //     // setIndicatingMsg('Please Wait...');
    //     // setLoader(true);
    //     // const fee = await walletService.getUnlockAccountFee(accAddress,currentAsset.symbol);
    //     console.log('ACCOUNT_UNLOCK_GAS',ACCOUNT_UNLOCK_GAS);
    //     // setLoader(false);
    //     // setFee(data.totalFee);
    // };

    const renderAvailableAssets = () =>{
        return(
            <View style={styles.assetModal}>
                <View style={styles.modalHeader}>
                    <Text style={{color:Colors.white}}>Select From Available Funds</Text>
                </View>
                {
                    ethBalance.map((item,index)=>(
                        (item.value !== 0) &&
                        <TouchableOpacity key={index} onPress={()=>setNewAsset(item)} style={styles.eachAsset}>
                            <Text style={{fontSize:moderateScale(16),fontWeight:'bold'}}>{item.symbol.toUpperCase()}</Text>
                            <Text style={{fontSize:moderateScale(16),fontWeight:'bold'}}>{walletUtils.getAssetDisplayText( item.symbol,item.value)}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    };

    const renderSelectedAsset = () =>{
        if(ethBalance.length)
            return(
                <TouchableOpacity onPress={()=>setIsActive(true)} style={styles.selectedAssetBox}>
                    <View  style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.assetTitle}>{selectedAsset.symbol.toUpperCase()}</Text>
                        <Text style={styles.assetBalance}> ( Balance : {walletUtils.getAssetDisplayText( selectedAsset.symbol,selectedAsset.value)} ) </Text>
                    </View>
                    <Icon color={Colors.white} name={'angle-down'} size={moderateScale(22)} style={{marginLeft:moderateScale(5)}} />
                </TouchableOpacity>
            );
        return null;
    };

    const renderFee = () =>{
        if(ethBalance.length)
            return(
                <Text style={styles.feeText}>
                    Estimated Fee: {ACCOUNT_UNLOCK_GAS} Gas
                </Text>
                // <Text style={styles.feeText}>
                //     Fee : {fee}{' '+selectedAsset.symbol.toUpperCase()+' '}
                //     ~ {selectedCurrency.symbol} {walletUtils.getAssetDisplayTextInSelectedCurrency(selectedAsset.symbol.toLowerCase(),fee, exchangeRates)}
                // </Text>
            );
        return null;
    };

    const checkAvailableEtheriumBalance = () =>{
        const sum = parseInt(ethBalance.map(item => item.value).reduce((prev, curr) => prev + curr, 0));
        if(sum)
            return(
                <View style={styles.tokenBox}>
                    <Text style={GlobalStyles.titleTypo}> Token to cover verification costs :</Text>
                    {renderSelectedAsset()}
                    {renderFee()}
                </View>
            );
        return (
            <View style={{...styles.tokenBox,alignSelf:'center',width:'90%'}}>
                <Text style={{...GlobalStyles.titleTypo,fontSize:moderateScale(12)}}>You don't have ETH or ERC20 token balance in main chain to pay unlock fee. </Text>
            </View>
        );
    };

    const startUnlockProcess = async() =>{
        setLoader(true);
        setIndicatingMsg('We are unlocking you account, this may take a while, Please wait..');
        walletService.unlockZksyncWallet(selectedAsset.symbol)
            .then(unlockReceipt=>{
                setLoader(false);
                if(unlockReceipt.success)
                {
                    setShowErr(true);
                    setErrMsg('Yay!! Your account has been unlocked successfully');
                    setIsAccountUnlocked(true);
                    apiServices.updateIsAccountUnlockedWithServer(email,phoneNumber).then();
                }
                else
                {
                    setLoader(false);
                    setShowErr(true);
                    setErrMsg('An Unexpected Error Has Occured!, Please try again after sometime');
                }
            })
            .catch(()=>{
                setLoader(false);
                setShowErr(true);
                setErrMsg('An Unexpected Error Has Occured!, Please try again after sometime');
            });
    };

    return(
        <SafeAreaView style={GlobalStyles.appContainer}>
            <View style={styles.wrapper}>
                <AppHeader headerTitle={'Unlock Account'}  />
                <View style={GlobalStyles.primaryCard}>
                    <Text style={styles.description}>
                            Your account needs to be unlocked to use the services. 
                    </Text>
                </View>
                {
                    checkAvailableEtheriumBalance()
                }
                <TouchableOpacity 
                    disabled={!ethBalance.length} 
                    onPress={()=>{
                        startUnlockProcess();
                    }} 
                    style={{...styles.unlockButton,opacity : ethBalance.length ? 1 :0.4 }}>
                    <Icon color={'#fff'} name={'lock-open'} size={moderateScale(18)} />
                    <Text style={styles.unlock}>Unlock</Text>
                </TouchableOpacity>
            </View>
            <LoadingIndicator
                message={indicatingMssg}
                visible={loader}
            />
            
            <ErrorDialog
                message={errMsg}
                onDismiss={() => {
                    setShowErr(false);
                    navigation.goBack();
                }}             
                title={'Unlock Account'}
                visible={showErr}
            />
            <Modal
                animationIn={'slideInRight'}
                animationOut={'slideOutRight'}
                backdropColor={'#000'}
                dismissable={true}
                isVisible={isActive}
                onBackButtonPress={()=>setIsActive(false)}
                onBackdropPress={()=>setIsActive(false)}
                style={{justifyContent:'center',alignItems:'center',padding:0}}
                useNativeDriver={true}
            >
                {renderAvailableAssets()}
            </Modal>
        </SafeAreaView>
    );
};

AccountUnlockScreen.propTypes = {
    accountDetails:PropTypes.object.isRequired,
    exchangeRates:PropTypes.array.isRequired,
    navigation:PropTypes.object.isRequired,
    selectedCurrency:PropTypes.object.isRequired,
    setIsAccountUnlocked:PropTypes.func.isRequired,
};

function mapStateToProps(state){
    return{
        exchangeRates : state.dashboard.exchangeRates,
        selectedCurrency : state.currency.selectedCurrency,
        accountDetails : state.account.accountDetails,
    };
}

function mapDispatchToProps(dispatch){
    return{
        setIsAccountUnlocked : isUnlocked =>
            dispatch(AccountActions.setIsAccountUnlocked(isUnlocked))
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(AccountUnlockScreen);