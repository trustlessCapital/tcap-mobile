
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
import { View,Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
 
const AssetCard = () =>{
    return(
        <View style={styles.assetCard}>
            <View style={styles.imageWrapper}>
                <View style={styles.imageHolder}> 

                </View>
                <View style={styles.leftWrapper}>
                    <Text style={styles.title}>$5000</Text>
                    <Text style={styles.subTitle}>0.1 ETH</Text>
                </View>
            </View>
            <View style={styles.detailWrapper}>
                <Text style={styles.title}>$5000</Text>
                <View style={styles.percentBox}>
                    <Text style={styles.percent}>2.5 %</Text>
                </View>
            </View>
        </View>
    );
};
 
AssetCard.propTypes = {
    navigation:PropTypes.object.isRequired,
};
 
export default AssetCard;