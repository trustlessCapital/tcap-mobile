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
import { TouchableOpacity,Text,View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import styles from './styles';
import walletUtils from '../../../../@Services/wallet-utils';
import Colors from '../../../../@Constants/Colors';
import { withNavigation } from '@react-navigation/compat';

const HistoryCard = ({historyData,...props}) =>{

    const {navigation} = props;

    const {asset,amount,txnType,walletAddress='',recipientAddress=''} = historyData;

    const renderType = () =>{
        if(txnType === 'deposit')
            return(
                <Text numberOfLines={1} style={styles.typeText}>To : {walletAddress}</Text>
            );
        if(txnType === 'transfer')
            return(
                <Text numberOfLines={1} style={styles.typeText}>To : {recipientAddress}</Text>
            );
    };

    const getIcon = () =>{
        if(txnType === 'deposit')
            return 'plus';
        if(txnType === 'transfer')
            return 'paper-plane';

        return 'angle-double-down';
    };

    const getColor = () =>{
        if(txnType === 'deposit')
            return Colors.green;
        if(txnType === 'transfer')
            return Colors.activeTintRed;

        return Colors.activeTintRed;
    };

    const checkNavigaion = () =>{
        navigation.navigate('TransactionStatusScreen',{historyData});
    };

    return(
        <TouchableOpacity onPress={()=>checkNavigaion()} style={styles.cardWrapper}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon color={getColor()} name={getIcon()} size={25}  />
                {renderType()}
            </View>
            <View>
                <Text style={styles.assetText}>{walletUtils.getAssetDisplayText( asset,amount)}{' '+asset}</Text>
            </View>
        </TouchableOpacity>
    );
};

HistoryCard.propTypes = {
    historyData:PropTypes.object.isRequired,
    navigation:PropTypes.object.isRequired,
};

export default withNavigation(HistoryCard);