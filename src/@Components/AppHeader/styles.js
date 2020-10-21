import {
    StyleSheet,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../@Constants/Colors';
  
export default (styles = StyleSheet.create({
   
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: moderateScale(30),
        marginBottom: moderateScale(40),
    },
    titleBarContentLeft: {
        flex: 1,
        alignItems: 'flex-start',
        width: moderateScale(30),
    },
   
    titleBarContent: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleBarContentRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    titleBarTitle: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(16),
    },
    title: {
        color: Colors.white,
        fontFamily: 'Montserrat-Regular',
        fontSize: moderateScale(14),
        textAlign: 'center',
        marginBottom: moderateScale(20),
        width: '100%',
    },
}));
  
  