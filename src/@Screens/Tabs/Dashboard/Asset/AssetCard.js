
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
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../../@Constants/Colors';

const assetSet = [
    {symbol:'ETH',imageAsset : require('../../../../../assets/images/assetLogos/eth.svg')},
    {symbol:'DAI',imageAsset : require('../../../../../assets/images/assetLogos/dai.svg')},
    {symbol:'USDC',imageAsset : require('../../../../../assets/images/assetLogos/usdc.svg')},
    {symbol:'TUSD',imageAsset : require('../../../../../assets/images/assetLogos/tusd.svg')},
    {symbol:'USDT',imageAsset : require('../../../../../assets/images/assetLogos/usdt.svg')},
    // {symbol:'SUSD',imageAsset : require('../../../../../assets/images/assetLogos/usdc.svg')},
    {symbol:'BUSD',imageAsset : require('../../../../../assets/images/assetLogos/busd.svg')},
    {symbol:'LEND',imageAsset : require('../../../../../assets/images/assetLogos/lend.svg')},
    {symbol:'BAT',imageAsset : require('../../../../../assets/images/assetLogos/bat.svg')},
    {symbol:'KNC',imageAsset : require('../../../../../assets/images/assetLogos/knc.svg')},
    {symbol:'LINK',imageAsset : require('../../../../../assets/images/assetLogos/link.svg')},
    {symbol:'MANA',imageAsset : require('../../../../../assets/images/assetLogos/mana.svg')},
    {symbol:'MKR',imageAsset : require('../../../../../assets/images/assetLogos/mkr.svg')},
    {symbol:'REP',imageAsset : require('../../../../../assets/images/assetLogos/rep.svg')},
    {symbol:'SNX',imageAsset : require('../../../../../assets/images/assetLogos/snx.svg')},
    {symbol:'WBTC',imageAsset : require('../../../../../assets/images/assetLogos/wbtc.svg')},
    {symbol:'ZRX',imageAsset : require('../../../../../assets/images/assetLogos/zrx.svg')},
    // {symbol:'MLTT',imageAsset : require('../../../../../assets/images/assetLogos/usdc.svg')},
    {symbol:'LRC',imageAsset : require('../../../../../assets/images/assetLogos/lrc.svg')},
    {symbol:'HEX',imageAsset : require('../../../../../assets/images/assetLogos/hex.svg')},
    // {symbol:'PAN',imageAsset : require('../../../../../assets/images/assetLogos/usdc.svg')},
    {symbol:'SNT',imageAsset : require('../../../../../assets/images/assetLogos/snt.svg')},
    {symbol:'YFI',imageAsset : require('../../../../../assets/images/assetLogos/yfi.svg')},
    {symbol:'UNI',imageAsset : require('../../../../../assets/images/assetLogos/uni.svg')},
    {symbol:'STORJ',imageAsset : require('../../../../../assets/images/assetLogos/storj.svg')},
    // {symbol:'TBTC',imageAsset : require('../../../../../assets/images/assetLogos/usdc.svg')},
    // {symbol:'EURS',imageAsset : require('../../../../../assets/images/assetLogos/usdc.svg')},
    {symbol:'GUSD',imageAsset : require('../../../../../assets/images/assetLogos/gusd.svg')},
    // {symbol:'RENBTC',imageAsset : require('../../../../../assets/images/assetLogos/usdc.svg')},
];

const AssetCard = ({asset,exchangeRates,...props}) =>{ 

    const {depositingBalances,committedBalances} = props;

    const {symbol,value} = asset;
    const loadAssetValue = (defaultVal) =>{
        const cost = walletUtils.getAssetDisplayTextInSelectedCurrency(
            symbol.toLowerCase(),
            defaultVal ? 0.1 : walletUtils.getAssetDisplayText(symbol,value),
            exchangeRates,
        );
        if(cost)
            return cost;
        return null; 
    };

    const renderImage = () =>{
        let result = assetSet.find(x => x.symbol === symbol);
        if(result) 
            return <Image resizeMode={'contain'} source ={result.imageAsset} style={styles.iconStyle} />;
        return null;
       
    };

    const renderTickMark = () =>{
        const deposited = depositingBalances.findIndex(x => x.symbol === asset.symbol);
        const committed = committedBalances.findIndex(x => (x.symbol === asset.symbol && x.value === asset.value ));
        if(committed !== -1 && deposited === -1 )
            return <Icon color={Colors.green} name={'check-double'} size={moderateScale(16)} style={{marginLeft:moderateScale(3)}} />;
        return <Icon color={Colors.amber} name={'check'} size={moderateScale(16)} style={{marginLeft:moderateScale(3)}} />;
    };

    return(
        <View style={styles.assetCard}>
            <View style={styles.imageWrapper}>
                <View style={styles.imageHolder}> 
                    {renderImage()}
                </View>
                <View style={styles.leftWrapper}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.title}>$ {loadAssetValue(0)}</Text>
                        {renderTickMark()}
                    </View>
                    <Text style={styles.subTitle}>
                        {walletUtils.getAssetDisplayText( symbol,value)}
                        {' '+symbol.toUpperCase()} 
                    </Text>
                </View>
            </View>
            <View style={styles.detailWrapper}>
                <Text style={{...styles.title,fontSize:moderateScale(10)}}>$ {loadAssetValue(0.1)}</Text>
                <View style={styles.percentBox}>
                    <Text style={styles.percent}>2.5 %</Text>
                </View>
            </View>
        </View>
    );
};
 
AssetCard.propTypes = {
    asset:PropTypes.object.isRequired,
    committedBalances:PropTypes.array.isRequired,
    depositingBalances:PropTypes.array.isRequired,
    exchangeRates:PropTypes.array.isRequired,
};

function mapStateToProps(state){
    return{
        depositingBalances : state.dashboard.depositingBalances,
        committedBalances : state.dashboard.committedBalances
    };
}
 
export default connect(mapStateToProps)(AssetCard);