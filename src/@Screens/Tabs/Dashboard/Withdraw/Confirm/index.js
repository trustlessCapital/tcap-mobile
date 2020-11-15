
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
import { SafeAreaView,View,Text,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../../../@GlobalStyles';
import styles from '../Home/styles';
import AppHeader from '../../../../../@Components/AppHeader';
import walletUtils from '../../../../../@Services/wallet-utils';
import { connect } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
 
const WithdrawConfirmationScreen = ({...props}) =>{

    const {
        route:{params},
        exchangeRates,
        navigation
    } = props;

    const {transactionData:{address='',fee=0,selectedAsset,amountToWithdraw},transactionData} = params;
    const amt = walletUtils.getAssetDisplayTextInSelectedCurrency(selectedAsset.symbol.toLowerCase(),amountToWithdraw, exchangeRates);
    const charges = walletUtils.getAssetDisplayTextInSelectedCurrency(selectedAsset.symbol.toLowerCase(),fee, exchangeRates);
    const total = parseFloat(amt)+parseFloat(charges);

    const navigateToStatus =() =>{
        navigation.navigate('WithdrawStatusScreen',{transactionData});
    };

    const renderDetails =() =>{
        return(
            <View style={GlobalStyles.primaryCard}>
                <View style={styles.dataRow}>
                    <Text style={styles.titleDetails}>ADDRESS</Text>
                    <Text style={{...styles.titleText,width:'60%'}}>{address}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.titleDetails}>AMOUNT ENTERED</Text>
                    <Text style={styles.titleText}>$ {amt}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.titleDetails}>CHARGES</Text>
                    <Text style={styles.titleText}>~ $ {charges}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.titleDetails}>TOTAL</Text>
                    <Text style={styles.titleText}>~ $ {total.toFixed(4)}</Text>
                </View>
            </View>
        );
    };

    return(
        <SafeAreaView style={GlobalStyles.appContainer}>
            <View style={styles.wrapper}>
                <AppHeader headerTitle={'Confirmation'}  />
                {
                    renderDetails()
                }
                <TouchableOpacity onPress={()=>navigateToStatus()} style={{...styles.transferButton,position:'absolute',bottom:moderateScale(10)}}>
                    <Text style={styles.proceedText}>CONFIRM</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
 
WithdrawConfirmationScreen.propTypes = {
    exchangeRates:PropTypes.array.isRequired,
    navigation:PropTypes.object.isRequired,
    route:PropTypes.object.isRequired,
};
 
function mapStateToProps(state){
    return{
        exchangeRates : state.dashboard.exchangeRates
    };
}
 
export default connect(mapStateToProps)(WithdrawConfirmationScreen);