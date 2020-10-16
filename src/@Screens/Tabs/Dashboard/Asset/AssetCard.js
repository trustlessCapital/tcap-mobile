
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
import { View,Text,Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import walletUtils from '../../../../@Services/wallet-utils';
 
const AssetCard = ({asset,exchangeRates}) =>{    
    const {symbol,value} = asset;
    const loadAssetValue = (defaultVal) =>{
        const value = walletUtils.getAssetDisplayTextInUSD(
            symbol.toLowerCase(),
            defaultVal ? 0.1 : walletUtils.getAssetDisplayText(symbol,value),
            exchangeRates,
        );
        if(value)
            return value;
        return null; 
    };

    const renderImage = () =>{
        console.log('symbol',symbol);
        if(symbol === 'ETH')
            return <Image resizeMode={'contain'} source ={require('../../../../../assets/images/assetLogos/eth.svg')} style={styles.iconStyle} />;
        if(symbol === 'USDC')
            return <Image resizeMode={'contain'} source ={require('../../../../../assets/images/assetLogos/usdc.svg')}  style={styles.iconStyle} />;
    };

    return(
        <View style={styles.assetCard}>
            <View style={styles.imageWrapper}>
                <View style={styles.imageHolder}> 
                    {renderImage()}
                </View>
                <View style={styles.leftWrapper}>
                    <Text style={styles.title}>$ {loadAssetValue()}</Text>
                    <Text style={styles.subTitle}>
                        {walletUtils.getAssetDisplayText( symbol,value)}
                        {' '+symbol.toUpperCase()} 
                    </Text>
                </View>
            </View>
            <View style={styles.detailWrapper}>
                <Text style={styles.title}>$ {loadAssetValue(0.1)}</Text>
                <View style={styles.percentBox}>
                    <Text style={styles.percent}>2.5 %</Text>
                </View>
            </View>
        </View>
    );
};
 
AssetCard.propTypes = {
    asset:PropTypes.object.isRequired,
    exchangeRates:PropTypes.array.isRequired,
};
 
export default AssetCard;