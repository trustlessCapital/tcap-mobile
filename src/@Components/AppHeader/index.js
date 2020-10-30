
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
import { TouchableOpacity,View,Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { withNavigation } from '@react-navigation/compat';
import styles from './styles';
import Colors from '../../@Constants/Colors';
 
const AppHeader = ({headerTitle='Loading',...props}) =>{

    const {navigation} = props;

    return(
        <View style={styles.titleBar}>
            <View style={styles.titleBarContentLeft}>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={styles.backButton}>
                    <Icon
                        color={Colors.white}
                        name={'angle-left'}
                        size={24}
                        style={{alignSelf: 'center'}}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.titleBarContent}>
                <Text style={styles.titleBarTitle}>{headerTitle}</Text>
            </View>
            <View style={styles.titleBarContentRight} />
        </View>
    );
};
 
AppHeader.propTypes = {
    headerTitle:PropTypes.string.isRequired,
    navigation:PropTypes.object.isRequired,
};
 
export default withNavigation(AppHeader);