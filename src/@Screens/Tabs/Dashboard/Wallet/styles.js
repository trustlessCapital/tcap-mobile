import {
    StyleSheet,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../../@Constants/Colors';
  
export default (styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleBar: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginVertical: 20
    },
    titleBar_title: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
    },
    balanceCard: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: Colors.tintColorDark,
        width: '100%',
        borderRadius: 20,
    },
    balanceTitle: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        marginBottom: 20,
    },
    balanceWrapper: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    balanceText: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(30),
    },
    balanceTextDecimal: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
    },
    balanceCardFooter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    buttonStylePrimary: {
        borderRadius: 5,
        backgroundColor: Colors.tintColorSecondary,
        width: '40%',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: 14,
    },
    buttonStyleSecondary: {
        borderRadius: 5,
        backgroundColor: Colors.tintColor,
        width: '40%',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContent: {
        flex: 1
    },
    buttonWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:moderateScale(30),
        width:'100%'
    },
    eachButton:{
        backgroundColor:Colors.white,
        width:moderateScale(100),
        justifyContent:'center',
        alignItems:'center',
        height:moderateScale(80),
        borderRadius:moderateScale(20)
    },
    itemText:{
        color:Colors.activeTintRed,
        fontFamily: 'Montserrat-Regular',
        marginTop:moderateScale(8)
    },
    icons:{
        color:Colors.activeTintRed
    },
}));
  
  