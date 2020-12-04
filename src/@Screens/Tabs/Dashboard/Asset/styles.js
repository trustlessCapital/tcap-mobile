import {
    StyleSheet,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../../@Constants/Colors';
  
export default (styles = StyleSheet.create({
    titleBar_title: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(18),
        marginLeft:moderateScale(30)
    },
    NoAssetText:{
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(14),
        alignSelf:'center'
    },
    Wrapper:{
        marginTop:moderateScale(20),
    },
    NoAssetWrapper:{
        marginTop:moderateScale(200)
    },
    cardWrapper:{
        backgroundColor:'#1a2360',
        borderRadius:moderateScale(30),
        marginTop:moderateScale(30),
        padding:moderateScale(25),
        paddingBottom:moderateScale(10)
    },
    redBar:{
        backgroundColor:Colors.error,
        width:moderateScale(30),
        height:moderateScale(3),
        marginLeft:moderateScale(30),
        marginTop:moderateScale(8)
    },
    assetCard:{
        borderBottomColor:Colors.primaryBorder,
        borderBottomWidth:1,
        flexDirection:'row',
        paddingBottom:moderateScale(20),
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:moderateScale(20),
    },
    imageWrapper:{
        flexDirection:'row',
        alignItems:'center'
    },
    imageHolder:{
        backgroundColor:Colors.primaryBg,
        width:moderateScale(60),
        height:moderateScale(60),
        borderRadius:moderateScale(10),
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(16),
    },
    leftWrapper:{
        paddingLeft:moderateScale(15),
    },
    subTitle: {
        color: Colors.darkGrey,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(12),
        marginTop:moderateScale(10)
    },
    percentBox:{
        backgroundColor:'#23387a',
        padding:moderateScale(6),
        paddingHorizontal:moderateScale(10),
        borderRadius:moderateScale(5),
        marginTop:moderateScale(5),
        alignSelf:'flex-end'
    },
    percent:{
        color: Colors.subTitle,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(10),
        alignSelf:'center'
    },
    iconStyle:{
        width:moderateScale(30),
        height:moderateScale(30)
    },
}));
  
  