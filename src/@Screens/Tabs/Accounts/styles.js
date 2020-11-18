import {
    Platform,
    StyleSheet,
} from 'react-native';
import Colors from '../../../@Constants/Colors';
import {moderateScale} from 'react-native-size-matters';
  
export default (styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
    },
    titleBar_title: {
        color: Colors.white,
        fontFamily: 'Montserrat-Regular',
        fontSize: moderateScale(13)
    },
    accAddressText:{
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(18),
        marginBottom:moderateScale(8)
    },
    boxWrapper:{
        borderBottomWidth:.6,
        borderBottomColor:Colors.primaryBorder,
        paddingHorizontal:moderateScale(20),
        paddingVertical:moderateScale(30),
    },
    optionWrapper:{
        paddingHorizontal:moderateScale(10),
        paddingTop:moderateScale(20),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    optionText:{
        color:Colors.tintColorGreyed,
        fontSize:moderateScale(12)
    },
    optionSymbol:{
        color:Colors.tintColorGreyed,
        fontSize:moderateScale(16),
        marginLeft:moderateScale(10)
    },
    optionValueText:{
        color:Colors.subTitle,
        fontSize:moderateScale(11)
    },
    modalWrapper:{
        backgroundColor:Colors.primaryBg,
        width:'100%',
        height:'100%',
        padding:moderateScale(10)
    },
    verificationModals:{
        backgroundColor:Colors.primaryBg,
        width:'90%',
        height:moderateScale(300),
        bottom:0,
        borderRadius:moderateScale(10),
        padding:moderateScale(20)
    },
    searchWrapper:{
        flexDirection:'row',width:'100%',alignItems:'center',
        borderBottomColor:Colors.inactiveTintGrey,
        borderBottomWidth:1,
        paddingBottom:Platform.OS === 'ios' ? moderateScale(14) : 0,
        paddingHorizontal:Platform.OS === 'ios' ? moderateScale(15) : 0,
    },
    searchBox:{
        color:Colors.white,
        width: Platform.OS === 'ios' ? '90%' : '85%'
    },
    buttonWrappers:{
        marginTop:moderateScale(15),flexDirection:'row',justifyContent:'space-between',
        alignItems:'center',width:moderateScale(250)
    },
    buttons:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:Colors.tintColorGreyedDark,
        paddingHorizontal:moderateScale(15),
        padding:moderateScale(4),
        borderRadius:moderateScale(15),
        width:moderateScale(110),
        shadowOpacity: .2,
        shadowRadius: moderateScale(5),
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 5,
    },
    buttonText:{
        marginLeft:moderateScale(10),
        fontFamily: 'Montserrat-Bold',
        fontSize:moderateScale(12)
    },
    bottomModal:{
        backgroundColor:Colors.white,
        width:'100%',
        height:moderateScale(550),
        position:'absolute',
        bottom:0,
        borderTopLeftRadius:moderateScale(10),
        borderTopRightRadius:moderateScale(10),
        padding:moderateScale(20)
    },
    barcodeBox:{
        alignSelf:'center',
        width:moderateScale(250),
        height:moderateScale(250),
        backgroundColor:Colors.black,
        shadowOpacity: .2,
        shadowRadius: moderateScale(5),
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 5,
        marginTop:moderateScale(30),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:moderateScale(30)
    },
    shareButton:{
        backgroundColor:Colors.activeTintRed,
        alignSelf:'center',
        marginTop:moderateScale(30),
        paddingHorizontal:moderateScale(30),
        padding:moderateScale(8),
        borderRadius:moderateScale(15)
    },
    currencyRowWrapper:{
        paddingVertical:moderateScale(15),paddingLeft:moderateScale(20),
        flexDirection:'row',alignItems:'center'
    },
    inputText:{
        fontSize:moderateScale(12),
        width:'80%',
        borderRadius:moderateScale(10),
        paddingLeft:moderateScale(10),
        color:Colors.white,
    },
    NumberWrapper:{
        flexDirection:'row',alignItems:'center',backgroundColor:Colors.primaryBgLight,
        marginTop:moderateScale(10),
        borderRadius:moderateScale(6),
        paddingLeft:moderateScale(8),
        paddingVertical:Platform.OS==='ios'? moderateScale(16) : 0
    },
    verifyButton:{
        backgroundColor:Colors.activeTintRed,
        paddingHorizontal:moderateScale(25),
        padding:moderateScale(8),
        borderRadius:moderateScale(10),
        alignSelf:'center',
        marginTop:moderateScale(40)
    },
    verifyText:{
        color:Colors.white,
        fontFamily:'Montserrat-Bold',
        
    },
    otpInput: {
        height: 40,
        fontSize: moderateScale(18),
        alignSelf: 'center',
        letterSpacing: 10,
        fontFamily: 'Montserrat-Bold',
        color: Colors.title,
        width:moderateScale(120),
    },
}));
  
  