
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
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../../../@Constants/Colors';
  
export default (styles = StyleSheet.create({
    wrapper: {
        padding:moderateScale(20),
        flex:1
    },
    assetTitle:{
        color: Colors.green,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: moderateScale(22),
    },
    inputText:{
        color:Colors.white,fontSize:moderateScale(16),
        maxWidth:moderateScale(200)
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
    bottomInputBar:{
        borderTopWidth:1,
        borderTopColor:Colors.darkGrey,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:moderateScale(8),
        marginTop:moderateScale(10)
    },
    transferButton:{
        position:'absolute',
        bottom:moderateScale(10),
        width:'100%',
        paddingVertical:moderateScale(10),
        borderRadius:moderateScale(10),
        justifyContent:'center',alignItems:'center',
        backgroundColor:Colors.activeTintRed,
        alignSelf:'center'
    },
    proceedText:{
        fontSize:moderateScale(15),
        fontWeight:'bold',
        fontFamily: 'Montserrat-Bold',
        color:Colors.white
    },
    feeText:{
        alignSelf:'center',
        marginTop:moderateScale(10),
        fontWeight:'bold',
        color:Colors.activeTintRed,
        fontSize:moderateScale(12),
        position:'absolute',
        bottom:moderateScale(55)
    },
    dataRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:moderateScale(10)
    },
    titleDetails:{
        color: Colors.textColorGrey,
        fontFamily: 'Montserrat-Regular',
        fontSize: moderateScale(12),
    },
    titleText:{
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(14),
    },
    titleIcon: {
        width: moderateScale(100),
        height: moderateScale(100),
        alignSelf:'center',
        marginBottom:moderateScale(10)
    },
    title: {
        color: Colors.white,
        fontFamily: 'Montserrat-Regular',
        fontSize: moderateScale(14),
        textAlign: 'center',
        marginBottom: moderateScale(20),
        width: '100%',
    },
    buttonStyleSecondary: {
        borderRadius: 5,
        backgroundColor: Colors.tintColor,
        width: '50%',
        alignSelf:'center',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
    },
    buttonStylePrimary: {
        borderRadius: 5,
        width: '100%',
        backgroundColor: Colors.tintColorSecondary,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:moderateScale(10)
    },
}));
  
  