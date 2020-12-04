
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

 
import React,{useState,useEffect} from 'react';
import { SafeAreaView,View,Text,TextInput,TouchableOpacity,ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../../../@GlobalStyles';
import styles from './styles';
import AppHeader from '../../../../../@Components/AppHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../../../../@Constants/Colors';
import * as DashboardActions from '../../../../../@Redux/actions/dashboardActions';
import { connect } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import WalletService from '../../../../../@Services/wallet-service';
import walletUtils from '../../../../../@Services/wallet-utils';
import apiServices from '../../../../../@Services/api-services';
import LoadingIndicator from '../../../../../@Components/loading-indicator';
import ErrorDialog from '../../../../../@Components/error-dialog';
import * as AccountActions from '../../../../../@Redux/actions/accountActions';
 
const WithdrawHomeScreen = ({...props}) =>{
    const {
        updateVerifiedAccountBalances,verifiedBalances,exchangeRates,navigation,
        selectedCurrency,isAccountUnlockedFromServer,
        setIsAccountUnlocked,accountDetails
    } = props;

    const {email,phoneNumber}  = accountDetails;

    const walletService = WalletService.getInstance();
    const pk = walletService.pk;    
    const accAddress = walletUtils.createAddressFromPrivateKey(pk);

    const testAddress = '';
    const [address, setAddress] = useState(testAddress);
    const [selectedAsset, setSelectedAsset] = useState(verifiedBalances[0]);
    const [showTransactionUi , setShowTransactionUi] = useState(false);
    const [amountToWithdraw , setAmountToWithdraw] = useState(0.00); 
    const [modal, setModal] = useState(false);
    const [indicatingMssg , setIndicatingMsg] = useState('Please Wait...');
    const [loader, setLoader] = useState(true);
    const [fee , setFee] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [showError, setShowError] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [fastWithDraw , setFastWithDraw] =  useState(false);
    const [NormalWithDraw , setNormalWithDraw] =  useState(true);

    const renderAssetOptions = () => {
        return(
            <View style={styles.assetModal}>
                <View style={styles.modalHeader}>
                    <Text style={{color:Colors.white}}>Select From Available Funds</Text>
                </View>
                {
                    verifiedBalances.map((item,index)=>(
                        <TouchableOpacity key={index} onPress={()=>setNewAsset(item)} style={styles.eachAsset}>
                            <Text style={{fontSize:moderateScale(16),fontWeight:'bold'}}>{item.symbol.toUpperCase()}</Text>
                            <Text style={{fontSize:moderateScale(16),fontWeight:'bold'}}>{walletUtils.getAssetDisplayText( item.symbol,item.value)}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    };

    const setNewAsset = (item) =>{
        setSelectedAsset(item);
        setModal(false);
        refreshAssets(item,fastWithDraw);
    };

    useEffect(()=>{
        if(verifiedBalances.length) setShowTransactionUi(true);
        updateVerifiedAccountBalances(accAddress);
    },[]);

    useEffect(()=>{
        if(verifiedBalances.length) {
            setSelectedAsset(verifiedBalances[0]);
            setTimeout(()=>{
                setShowTransactionUi(true);
                refreshAssets(verifiedBalances[0]);
            },200);
        }
        else setLoader(false);
    },[verifiedBalances.length]);

    const refreshAssets = (currentAsset,fast=false) =>{
        setIndicatingMsg('Please Wait...');
        setLoader(true);
        updateVerifiedAccountBalances(accAddress);
        apiServices.getTransferFundProcessingFee(currentAsset.symbol,accAddress,fast ? 'fastwithdraw' : 'withdraw')
            .then(data=>{
                setLoader(false);
                setFee(data.totalFee);
            })
            .catch(()=>{
                setLoader(false);
            });
    };

    const checkAccountIsUnlocked = () =>{
        if(isAccountUnlockedFromServer)
        {
            setLoader(false);
            const data = { selectedAsset,address,fee,amountToWithdraw,fastWithDraw:fastWithDraw};
            navigation.navigate('WithdrawConfirmationScreen',{transactionData:data});
        }
        else fallbackToBlockChain();
    }; 
    
    const fallbackToBlockChain = async() =>{
        const isSigningKeySet = await walletService.unlockZksyncWallet(selectedAsset.symbol,true);
        if(isSigningKeySet)
        {
            setIsAccountUnlocked(true);
            apiServices.updateIsAccountUnlockedWithServer(email,phoneNumber).then();
            setLoader(false);
            const data = { selectedAsset,address,fee,amountToWithdraw,fastWithDraw:fastWithDraw};
            navigation.navigate('WithdrawConfirmationScreen',{transactionData:data});
        }
        else{
            setLoader(false);
            navigation.navigate('AccountUnlockScreen');
        }
    };

    const checkValidData = () =>{
        const max = walletUtils.getAssetDisplayText( selectedAsset.symbol,selectedAsset.value);
        const totalAmt = parseFloat(amountToWithdraw) + parseFloat(fee);
        if(!amountToWithdraw)
        {
            setShowError(true);
            setErrorMessage('Please enter an Amount to begin Withdrawl');
            setErrorTitle('Amount cannot be empty');
        }
        else if(totalAmt > max)
        {
            setShowError(true);
            setErrorMessage('Please add more funds to account before this transaction');
            setErrorTitle('Insufficient balance');
        }
        else if(!address.length)
        {
            setShowError(true);
            setErrorMessage('Please enter a valid address');
            setErrorTitle('Invalid Addess');
        }
        else{
            setLoader(true);
            setIndicatingMsg('Checking Account Please Wait.. It Takes a while to check from the Main BlockChain.');
            checkAccountIsUnlocked();
        }
    };

    const renderAssets = () =>{
        if(showTransactionUi)
            return (
                <ScrollView contentContainerStyle={{paddingBottom:moderateScale(100)}} showsVerticalScrollIndicator={false}>
                    <View style={GlobalStyles.primaryCard}>
                        <Text style={GlobalStyles.titleTypo}> Amount / Asset</Text>
                        <View style={GlobalStyles.inputBox}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                                <TextInput
                                    keyboardType={'numeric'}
                                    onChangeText={amt => {
                                        setAmountToWithdraw(amt);
                                    }}
                                    placeholder={'Enter Amount'}
                                    placeholderTextColor={Colors.tintColorGreyedDark}
                                    style={styles.inputText}
                                    value={amountToWithdraw}
                                />
                                <TouchableOpacity onPress={()=>setModal(true)} style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={styles.assetTitle}>{selectedAsset.symbol.toUpperCase()}</Text>
                                    <Icon color={Colors.green} name={'angle-down'} size={moderateScale(22)} style={{marginLeft:moderateScale(5)}} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bottomInputBar}>
                                <Text style={{color:Colors.green,maxWidth:moderateScale(150)}}> ~ {selectedCurrency.symbol} {walletUtils.getAssetDisplayTextInSelectedCurrency(selectedAsset.symbol.toLowerCase(),amountToWithdraw, exchangeRates)}</Text>
                                <Text style={{fontSize:moderateScale(12),fontWeight:'bold',color:Colors.activeTintRed}}>MAX : {walletUtils.getAssetDisplayText( selectedAsset.symbol,selectedAsset.value)} {selectedAsset.symbol.toUpperCase()} </Text>
                            </View>
                        </View>
                        <Text style={GlobalStyles.titleTypo}> To Addess</Text>
                        <View style={GlobalStyles.inputBox}>
                            <TextInput
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                keyboardType={'email-address'}
                                onChangeText={addr => {
                                    setAddress(addr);
                                }}
                                placeholder={'Enter Address'}
                                placeholderTextColor={Colors.tintColorGreyedDark}
                                style={{color:Colors.white,width:'100%'}}
                                value={address}
                            />
                        </View>  
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <CheckBox
                                onValueChange={(newValue) => {
                                    
                                    setToggleCheckBox(newValue);
                                    if(newValue) setAddress(accAddress);
                                    else setAddress('');
                                }}
                                style={{
                                    width: moderateScale(25),
                                    height: moderateScale(25),
                                }}
                                value={toggleCheckBox}
                            />
                            <Text style={styles.accountText}> Own Account</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:moderateScale(20),marginTop:moderateScale(10)}}>
                        <CheckBox
                            boxType={'square'}
                            onValueChange={(newValue) => {
                                refreshAssets(selectedAsset,!newValue);
                                if(newValue)
                                    setFastWithDraw(false);
                                if(!newValue)
                                    setFastWithDraw(true);

                                setNormalWithDraw(newValue);
                            }}
                            style={{
                                width: moderateScale(20),
                                height: moderateScale(20),
                            }}
                            value={NormalWithDraw}
                        />
                        <Text style={styles.accountText}> Normal, Processing time 12 mins 30 secs </Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:moderateScale(20),marginTop:moderateScale(10)}}>
                        <CheckBox
                            boxType={'square'}
                            onValueChange={(newValue) => {
                                refreshAssets(selectedAsset,newValue);
                                if(newValue)
                                    setNormalWithDraw(false);
                                if(!newValue)
                                    setNormalWithDraw(true);

                                setFastWithDraw(newValue);
                            }}
                            style={{
                                width: moderateScale(20),
                                height: moderateScale(20),
                            }}
                            value={fastWithDraw}
                        />
                        <Text style={styles.accountText}> Fast, Processing time 5 seconds</Text>
                    </View>
                    
                </ScrollView>
            );
        return (
            <View style={GlobalStyles.primaryCard}>
                <Text style={{...GlobalStyles.titleTypo,textAlign:'center'}}> Your Account donot have</Text>
                <Text style={{...GlobalStyles.titleTypo,textAlign:'center'}}> sufficient balance</Text>
            </View>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.appContainer}>
            <View style={styles.wrapper}>
                <AppHeader headerTitle={'Withdraw Funds'}  />
                {renderAssets()}
                {
                    showTransactionUi && (
                        <View style={styles.bottomView}>
                            <TouchableOpacity onPress={()=>checkValidData()} style={styles.transferButton}>
                                <Text style={styles.proceedText}>Proceed</Text>
                            </TouchableOpacity>
                            <Text style={styles.infoMsg}>
                                Your withdrawl should take max 12 minutes 30 seconds.
                            </Text>
                            <Text style={styles.feeText}>
                    Fee : {fee}{' '+selectedAsset.symbol.toUpperCase()+' '}
                    ~ {selectedCurrency.symbol} {walletUtils.getAssetDisplayTextInSelectedCurrency(selectedAsset.symbol.toLowerCase(),fee, exchangeRates)}
                            </Text>
                        </View>
                    )
                }
            </View>
            <Modal
                animationIn={'slideInRight'}
                animationOut={'slideOutRight'}
                backdropColor={'#000'}
                dismissable={true}
                isVisible={modal}
                onBackButtonPress={()=>setModal(false)}
                onBackdropPress={()=>setModal(false)}
                style={{justifyContent:'center',alignItems:'center',padding:0}}
                useNativeDriver={true}
            >
                {renderAssetOptions()}
            </Modal>
            <LoadingIndicator
                message={indicatingMssg}
                visible={loader}
            />
            <ErrorDialog
                message={errorMessage}
                onDismiss={() => {
                    setShowError(false);
                }}
                title={errorTitle}
                visible={showError}
            />
        </SafeAreaView>
    );
};
 
WithdrawHomeScreen.propTypes = {
    accountDetails:PropTypes.object.isRequired,
    exchangeRates:PropTypes.array.isRequired,
    isAccountUnlockedFromServer:PropTypes.bool.isRequired,
    navigation:PropTypes.object.isRequired,
    selectedCurrency:PropTypes.object.isRequired,
    setIsAccountUnlocked:PropTypes.func.isRequired,
    updateVerifiedAccountBalances:PropTypes.func.isRequired,
    verifiedBalances:PropTypes.array.isRequired,
};
 
function mapStateToProps(state){
    return{
        verifiedBalances : state.dashboard.verifiedBalances,
        exchangeRates : state.dashboard.exchangeRates,
        selectedCurrency : state.currency.selectedCurrency,
        isAccountUnlockedFromServer : state.account.isAccountUnlocked,
        accountDetails : state.account.accountDetails,
    };
}

function mapDispatchToProps(dispatch){
    return{
        updateVerifiedAccountBalances:address =>
            dispatch(DashboardActions.updateVerifiedAccountBalances(address)),
        setIsAccountUnlocked : isUnlocked =>
            dispatch(AccountActions.setIsAccountUnlocked(isUnlocked))
    };
}
 
export default connect(mapStateToProps,mapDispatchToProps)(WithdrawHomeScreen);