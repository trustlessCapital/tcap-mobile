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
    Wrapper:{
        marginTop:moderateScale(20)
    },
    cardWrapper:{
        backgroundColor:'#1a2360',
        borderTopLeftRadius:moderateScale(30),
        borderTopRightRadius:moderateScale(30),
        marginTop:moderateScale(30),
        padding:moderateScale(25),
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
        borderRadius:moderateScale(10)
    },
    title: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(18),
    },
    leftWrapper:{
        paddingLeft:moderateScale(15),
    },
    subTitle: {
        color: Colors.primaryBorder,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(14),
        marginTop:moderateScale(10)
    },
    percentBox:{
        backgroundColor:'#23387a',
        padding:moderateScale(6),
        paddingHorizontal:moderateScale(10),
        borderRadius:moderateScale(5),
        marginTop:moderateScale(5)
    },
    percent:{
        color: Colors.subTitle,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(14),
    }
}));
  
  