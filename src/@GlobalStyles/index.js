import {
    StyleSheet,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../@Constants/Colors';
  
const GlobalStyles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
    },
    primaryCard: {
        padding:moderateScale(20),
        backgroundColor: Colors.tintColorDark,
        width: '100%',
        borderRadius:moderateScale(20),
    },
    titleTypo: {
        color: Colors.white,
        fontFamily: 'Montserrat-Regular',
        fontSize: moderateScale(14),
        width: '100%',
    },
    inputBox:{
        borderRadius: moderateScale(10),
        backgroundColor: Colors.tintColorLight,
        width: '100%',
        padding: moderateScale(10),
        paddingVertical:moderateScale(15),
        marginVertical:moderateScale(10)
    }
    
});

export default GlobalStyles;
  
  