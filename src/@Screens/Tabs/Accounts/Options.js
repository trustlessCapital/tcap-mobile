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
import {View,Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';

import Colors from '../../../@Constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
 
const Options = ({optionItem,optionValue,onPress}) =>{

    const { name='',icon='', showArrow=true , disabled = false } = optionItem;
    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.optionWrapper}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                {(icon !== '') && <Icon color={Colors.activeTintRed} name={icon} size={moderateScale(20)} style={{marginRight:moderateScale(8)}} />}
                <Text style={styles.optionText}>{name}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.optionValueText}>{optionValue}</Text>
                {(showArrow) && <Icon color={Colors.darkGrey} name={'angle-right'} size={moderateScale(16)} style={{marginLeft:moderateScale(5)}} />}
            </View>
        </TouchableOpacity>
    );
};

Options.propTypes = {
    onPress:PropTypes.func,
    optionItem:PropTypes.object.isRequired,
    optionValue:PropTypes.string.isRequired,
};

 
export default Options;