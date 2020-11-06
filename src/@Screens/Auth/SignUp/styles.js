import { StyleSheet, Dimensions, Platform } from 'react-native';
import Colors from '../../../@Constants/Colors';
import {moderateScale} from 'react-native-size-matters';

export default (styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
    },
    mainPattern: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: Dimensions.get('window').height + 50,
        resizeMode: 'contain',
    },
    bgPattern1: {
        position: 'absolute',
        top: -40,
        left: 40,
        height: 400,
        opacity: 0.2,
        resizeMode: 'contain',
        zIndex: 1,
    },
    container: {
        flex: 1,
        height: Dimensions.get('window').height - 70,
        backgroundColor: Colors.primaryBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 20,
        marginEnd: 20,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        marginTop: 40,
        marginBottom: 20,
    },
    logo: {
        flex: 1,
        width: 180,
        resizeMode: 'contain',
        alignSelf: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
    },
    titleWrapper: {
        flex: 1,
        marginTop: 30,
    },
    title: {
        alignSelf: 'flex-start',
        color: Colors.title,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: 30,
    },
    subTitle: {
        alignSelf: 'flex-start',
        color: Colors.subTitle,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: 20,
    },
    form: {
        flex: 1,
    },
    textInputRoot: {
        width: Dimensions.get('window').width - 40,
        borderWidth: 1,
        paddingVertical: Platform.OS === 'ios' ? 20 : moderateScale(5),
        paddingHorizontal:  20,
        borderRadius: 10,
        borderColor: Colors.tintColorLight,
    },
    phoneTextInputWrapper: {
        marginTop: 20,
    },
    phoneTextInputRoot: {
        paddingStart: 85
    },
    countryPickerButtonWrapper: {
        position: 'absolute',
        zIndex: 99,
        top: 15,
        left: 10
    },
    countryPickerButton: {
        padding: 5,
        flexDirection: 'row',
    },
    countryPickerLabel: {
        color: Colors.subTitle,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
    },
    textInput: {
        color: Colors.subTitle,
        fontSize: 14,
    },
    textInputLabel: {
        color: Colors.subTitle,
        fontSize: 12,
    },
    phoneTextInput: {
        color: Colors.subTitle,
        fontSize: 14,
        paddingLeft: 60,
    },
    phoneTextInputLabel: {
        fontSize: 12,
        paddingLeft: 60,
        color: Colors.subTitle,
    },
    formFooter: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 40,
    },
    flexStart: {
        flex: 1,
        height: 60,
    },
    signinLabelStyle: {
        color: Colors.title,
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        paddingTop: 18,
    },
    flexEnd: {
        flex: 1,
        alignItems: 'flex-end',
        height: 60,
    },
    circleButton: {
        backgroundColor: Colors.tintColorSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    circleButtonDisabled: {
        backgroundColor: Colors.tintColorSecondaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(30),
        opacity:.4
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recoverAccount: {
        color: Colors.tintColorSecondary,
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
}));