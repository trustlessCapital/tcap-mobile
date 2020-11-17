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
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../@Constants/Colors';
import { moderateScale } from 'react-native-size-matters';
 
const ModalHeader = ({onPress,headerText = 'Trustless Capital'}) =>{
    return(
        <View style={styles.headerWrapper}>
            <Text style={{color:Colors.white}}>{headerText}</Text>
            <TouchableOpacity onPress={onPress}>
                <Icon color={Colors.activeTintRed} name={'times'} size={moderateScale(20)} />
            </TouchableOpacity>
        </View>
    );
};

ModalHeader.propTypes = {
    headerText:PropTypes.string.isRequired,
    onPress:PropTypes.func.isRequired,
};

 
export default ModalHeader;

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection:'row',justifyContent:'space-between',alignItems:'center',
        paddingBottom:moderateScale(15),borderBottomColor:Colors.inactiveTintGrey,borderBottomWidth:1
    }
});
  