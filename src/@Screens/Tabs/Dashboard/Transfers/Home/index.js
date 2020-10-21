
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
import { SafeAreaView,View,Text,TextInput,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../../../@GlobalStyles';
import AppHeader from '../../../../../@Components/AppHeader';
import styles from './styles';
import WalletService from '../../../../../@Services/wallet-service';
import walletUtils from '../../../../../@Services/wallet-utils';
import * as DashboardActions from '../../../../../@Redux/actions/dashboardActions';
import { connect } from 'react-redux';
import Colors from '../../../../../@Constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
 
const TransferHomeScreen = ({...props}) =>{
    const walletService = WalletService.getInstance();

    const {updateVerifiedAccountBalances,verifiedBalances,exchangeRates} = props;
    const [selectedAsset, setSelectedAsset] = useState(verifiedBalances[0]);

    const [amountToTransfer, setAmountToTransfer] = useState(0.00);
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        getAccountAddress();
    },[]);

    const getAccountAddress = () =>{
        const pk = walletService.pk;
        const address = walletUtils.createAddressFromPrivateKey(pk);
        updateVerifiedAccountBalances(address);
    };

    const renderAssets = () =>{
        if(verifiedBalances.length)
            return (
                <View style={GlobalStyles.primaryCard}>
                    <Text style={GlobalStyles.titleTypo}> Amount / Asset</Text>
                    <View style={GlobalStyles.inputBox}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                            <TextInput
                                keyboardType={'numeric'}
                                onChangeText={amt => {
                                    setAmountToTransfer(amt);
                                }}
                                placeholder={'Enter Amount'}
                                placeholderTextColor={Colors.tintColorGreyedDark}
                                style={styles.inputText}
                                value={amountToTransfer}
                            />
                            <TouchableOpacity onPress={()=>setModal(true)} style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={styles.assetTitle}>{selectedAsset.symbol.toUpperCase()}</Text>
                                <Icon color={Colors.green} name={'angle-down'} size={moderateScale(22)} style={{marginLeft:moderateScale(5)}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomInputBar}>
                            <Text style={{color:Colors.white,maxWidth:moderateScale(150)}}> ~ $ {walletUtils.getAssetDisplayTextInUSD(selectedAsset.symbol.toLowerCase(),amountToTransfer, exchangeRates)}</Text>
                            <Text style={{fontSize:moderateScale(12),fontWeight:'bold',color:Colors.primaryBg}}>MAX : {walletUtils.getAssetDisplayText( selectedAsset.symbol,selectedAsset.value)} {selectedAsset.symbol.toUpperCase()} </Text>
                        </View>
                    </View>
                    <Text style={GlobalStyles.titleTypo}> To Addess</Text>
                    <View style={GlobalStyles.inputBox}>
                        <TextInput
                            placeholder={'Enter Address'}
                            style={{color:Colors.white}}
                        />
                    </View>       
                </View>
            );
        return (
            <View style={GlobalStyles.primaryCard}>
                <Text style={{...GlobalStyles.titleTypo,textAlign:'center'}}> Your Account donot have</Text>
                <Text style={{...GlobalStyles.titleTypo,textAlign:'center'}}> sufficient balance</Text>
            </View>
        );
    };

    const renderAssetOptions = () => {
        return(
            <View style={styles.assetModal}>
                <View style={styles.modalHeader}>
                    <Text style={{color:Colors.white}}>Select From Available Funds</Text>
                </View>
                {
                    verifiedBalances.map((item,index)=>(
                        <TouchableOpacity key={index} onPress={()=>{setSelectedAsset(item),setModal(false);}} style={styles.eachAsset}>
                            <Text style={{fontSize:moderateScale(16),fontWeight:'bold'}}>{item.symbol.toUpperCase()}</Text>
                            <Text style={{fontSize:moderateScale(16),fontWeight:'bold'}}>{walletUtils.getAssetDisplayText( item.symbol,item.value)}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    };

    const checkDisabled = () =>{
        const maxAmt = walletUtils.getAssetDisplayText( selectedAsset.symbol,selectedAsset.value);
        if(amountToTransfer === 0 || amountToTransfer > maxAmt )
            return true;
        
        return false;
    };

    return(
        <SafeAreaView style={GlobalStyles.appContainer}>
            <View style={styles.wrapper}>
                <AppHeader headerTitle={'Transfer Funds'}  />
                {renderAssets()}
                <TouchableOpacity disabled={checkDisabled()} style={{...styles.transferButton,opacity:checkDisabled() ? .4:1}}>
                    <Text style={styles.proceedText}>Proceed</Text>
                </TouchableOpacity>
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
        </SafeAreaView>
    );
};
 
TransferHomeScreen.propTypes = {
    exchangeRates:PropTypes.array.isRequired,
    navigation:PropTypes.object.isRequired,
    updateVerifiedAccountBalances:PropTypes.func.isRequired,
    verifiedBalances:PropTypes.array.isRequired,
    
};

function mapStateToProps(state){
    return{
        verifiedBalances : state.dashboard.verifiedBalances,
        exchangeRates : state.dashboard.exchangeRates
    };
}

function mapDispatchToProps(dispatch){
    return{
        updateVerifiedAccountBalances:address =>
            dispatch(DashboardActions.updateVerifiedAccountBalances(address)),
    };
}
 
export default connect(mapStateToProps,mapDispatchToProps)(TransferHomeScreen);