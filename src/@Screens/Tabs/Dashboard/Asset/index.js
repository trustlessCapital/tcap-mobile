
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


import React,{useEffect} from 'react';
import { View,Text,ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import AssetCard from './AssetCard';
import WalletService from '../../../../@Services/wallet-service';
import walletUtils from '../../../../@Services/wallet-utils';
import { connect } from 'react-redux';
import * as DashboardActions from '../../../../@Redux/actions/dashboardActions';

const DashboardAsset = ({...props}) =>{

    const {
        updateVerifiedAccountBalances,verifiedBalances,
        exchangeRates
    } = props;

    const walletService = WalletService.getInstance();

    useEffect(()=>{
        getAccountAddress();
    },[]);

    const getAccountAddress = () =>{
        const pk = walletService.pk;
        const address = walletUtils.createAddressFromPrivateKey(pk);
        updateVerifiedAccountBalances(address);
    };

    if(verifiedBalances.length)
        return(
            <View style={styles.Wrapper}>
                <Text style={styles.titleBar_title}>Assets</Text>
                <View style={styles.redBar} />
                <ScrollView style={styles.cardWrapper}>
                    {
                        verifiedBalances.map((item,index)=>(
                            <AssetCard asset={item} exchangeRates={exchangeRates} key={index} />
                        ))
                    }
                </ScrollView>
            </View>
        );
    return null;
};

DashboardAsset.propTypes = {
    exchangeRates:PropTypes.array.isRequired,
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

export default connect(mapStateToProps,mapDispatchToProps)(DashboardAsset);