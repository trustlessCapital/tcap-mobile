import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../@Constants/Colors';


export default (styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginStart: 20,
        marginEnd: 20,
        backgroundColor: Colors.primaryBg,
    },
    mainTitle: {
        color: Colors.title,
        fontFamily: 'Montserrat-Regular',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 20,
        marginHorizontal: 20,
    },
    title: {
        color: Colors.tintColorSecondary,
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    subTitle: {
        color: Colors.title,
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        fontSize: 14,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    phrasesWrapper: {
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    phraseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    phraseItem: {
        borderRadius: 5,
        backgroundColor: Colors.tintColor,
        width: Dimensions.get('window').width / 2 - 40,
        height: 45,
        marginStart: 20,
        justifyContent: 'center',
    },
    phraseItemWithBorder: {
        borderRadius: 5,
        backgroundColor: Colors.tintColor,
        width: Dimensions.get('window').width / 2 - 40,
        height: 45,
        marginStart: 20,
        justifyContent: 'center',
        borderColor: Colors.tintColorSecondary,
        borderWidth: 1,
    },
    phraseItemWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: Colors.primaryBg,
    },
    phraseIndex: {
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        fontSize: 11,
        color: Colors.subTitle,
    },
    phraseText: {
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        fontSize: 14,
        color: Colors.title,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    disclaimerHeader:{
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
        position:'absolute',
        bottom:moderateScale(5)
    },
    primaryButtonStyle: {
        borderRadius: 5,
        backgroundColor: Colors.tintColorSecondary,
        width: Dimensions.get('window').width - 80,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonStyle: {
        borderRadius: 5,
        backgroundColor: Colors.tintColor,
        width: Dimensions.get('window').width - 80,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        color: Colors.title,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: 14,
    },
    secondaryButtonText: {
        color: Colors.subTitle,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: 14,
    },
    seedPhraseInput: {
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        fontSize: 14,
        color: Colors.title,
    },
}));