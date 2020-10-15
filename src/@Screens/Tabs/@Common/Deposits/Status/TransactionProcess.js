
//@flow
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


import React,{type StatelessFunctionalComponent } from 'react';
import { SafeAreaView,Text, View,Image } from 'react-native';
import StatusBarColor from '../../../../../@Components/status-bar-color';
import Colors from '../../../../../@Constants/Colors';
import styles from '../Home/styles';

/**
 * @description Initiates the Transaction Processing Loading Screen
 */

const TransactionProcessing:StatelessFunctionalComponent<Node> = () =>{
    return(
        <SafeAreaView style={styles.wrapper}>
            <StatusBarColor
                backgroundColor={Colors.primary_bg}
                barStyle="light-content"
            />
            <View style={styles.viewBox}>
                <Text style={styles.walletText}>My Wallet</Text>
                <Image source={require('../../../../../../assets/giffs/loader.gif')} style={styles.Loader} />
                <Text style={styles.transactText}>Transaction In Progress...</Text>
                <Text style={styles.secondsText}>This may take some time, Please wait</Text>
                <Text style={styles.infoText}>Please dont press back button.</Text>
            </View>
        </SafeAreaView>
    );
};

export default TransactionProcessing;