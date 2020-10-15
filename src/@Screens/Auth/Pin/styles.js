import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../@Constants/Colors';

export default (styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
    },
    container: {
        flex: 1,
    },
    backButtonWrapper: {
        width: 40,
        width: Dimensions.get('window').width,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    pinBackgroundLogo: {
        position: 'absolute',
        bottom: -200,
        left: Dimensions.get('window').width / 2 - 50,
        width: 100,
        resizeMode: 'contain',
        opacity: 0.05,
    },
    titleWrapper: {
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        color: Colors.title,
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
    },
    pinWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    unfilledCircle: {
        margin: 5,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.subTitle,
    },
    filledCircle: {
        margin: 5,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.tintColorSecondary,
    },
    keyPadContainer: {
        flex: 2,
    },
    keyPadImage: {
        height: 80,
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
    },
    keyPadWrapper: {
        flex: 1,
        backgroundColor: Colors.tintColor,
    },
    keyRow: {
        flex: 1,
        flexDirection: 'row',
    },
    key: {
        flex: 1,
        justifyContent: 'center',
    },
    keyStyle: {
        color: '#FFF',
        fontFamily: 'Montserrat-Bold',
        fontSize: 26,
        textAlign: 'center',
    },
    recoverButtonWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    recoverAccount: {
        color: Colors.tintColorSecondary,
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        marginHorizontal: 20,
        marginVertical: 10,
    },
}));
