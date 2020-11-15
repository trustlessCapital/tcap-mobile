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
import {View,Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import Options from '../Options';
 
const AboutYou = ({accountDetails,...props}) =>{
    const {email,phoneNumber} = accountDetails;

    const availabeOptions = [
        {icon:'envelope',name:'Email',showArrow:true,itemValue:email},
        {icon:'phone-alt',name:'Phone Number',showArrow:true,itemValue:phoneNumber},
    ];
    return(
        <View style={styles.boxWrapper}>
            <Text style={styles.titleBar_title}>About You</Text>
            {availabeOptions.map((item,index)=>(
                <Options key={index} optionItem={item} optionValue={item.itemValue} />
            ))}
        </View>
    );
};

AboutYou.propTypes = {
    accountDetails:PropTypes.object.isRequired,
};

 
export default AboutYou;

