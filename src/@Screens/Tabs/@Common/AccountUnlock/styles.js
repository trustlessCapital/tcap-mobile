
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

import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../../@Constants/Colors';
  
export default (styles = StyleSheet.create({
    wrapper: {
        padding:moderateScale(20),
        flex:1
    },
    description:{
        color:Colors.white,
        lineHeight:moderateScale(20)
    },
    unlockButton:{
        position:'absolute',
        bottom:moderateScale(10),
        width:'100%',
        paddingVertical:moderateScale(10),
        borderRadius:moderateScale(10),
        justifyContent:'center',alignItems:'center',
        backgroundColor:Colors.activeTintRed,
        alignSelf:'center',
        flexDirection:'row',
    },
    tokenBox:{
        marginVertical:moderateScale(15)
    },
    feeText:{
        fontWeight:'bold',
        color:Colors.activeTintRed,
        fontSize:moderateScale(16),
        marginLeft:moderateScale(5)
    },
    unlock:{
        fontSize:moderateScale(15),
        fontWeight:'bold',
        fontFamily: 'Montserrat-Bold',
        color:Colors.white,
        marginLeft:moderateScale(10)
    },
    selectedAssetBox:{
        flexDirection:'row',justifyContent:'space-between',
        alignItems:'center',width:'100%',
        borderColor:Colors.darkGrey,borderWidth:1,
        borderRadius:moderateScale(4),
        marginVertical:moderateScale(10),
        padding:moderateScale(10)
    },
    assetTitle:{
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: moderateScale(18),
    },
    assetBalance:{
        color: Colors.white,
        fontSize: moderateScale(14),
    },
    assetModal:{
        backgroundColor:Colors.primaryBg,
        width:'90%',
        padding:moderateScale(20),
        borderRadius:moderateScale(6)
    },
    modalHeader:{
        borderBottomWidth:1,
        borderBottomColor:Colors.darkGrey,
        paddingBottom:moderateScale(10)
    },
    eachAsset:{
        flexDirection:'row',
        paddingVertical:moderateScale(10),
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:Colors.textColorGrey,
        marginTop:moderateScale(10),
        borderRadius:moderateScale(6),
        paddingHorizontal:moderateScale(10)
    },
}));
  
  