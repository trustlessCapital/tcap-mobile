import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../@Constants/Colors';


export default (styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 20,
        marginEnd: 20,
        backgroundColor: Colors.primaryBg,
    },
    companyLogo: {
        height: moderateScale(60),
        resizeMode: 'contain',
        width:moderateScale(140)
    },
    scrollWrapper:{
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:moderateScale(50)
    },
    carouselItem: {
        marginTop:moderateScale(15)
    },
    title: {
        color: Colors.title,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: moderateScale(26),
        marginBottom: 20,
        textDecorationLine:'underline',
        marginHorizontal: moderateScale(20),
    },
    paragraph: {
        color: Colors.subTitle,
        fontFamily: 'Montserrat-Regular',
        fontSize: moderateScale(12),
        // textAlign: 'center',
        marginBottom: 20,
        marginHorizontal: moderateScale(20),
    },
    paragraphImportant: {
        color: Colors.tintColorSecondary,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(14),
        // textAlign: 'center',
        marginBottom: 20,
        marginHorizontal: moderateScale(20)
    },
    paginationWrapper: {
        alignItems: 'center',
    },
    dotStyle: {
        width: 20,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 1,
        backgroundColor: Colors.title,
    },
    inactiveDotStyle: {
        width: 20,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 1,
        backgroundColor: Colors.tintColorSecondary,
    },
    dotContainerStyle: {
        alignSelf: 'center',
    },
    footer: {
        alignItems: 'center',
        marginTop:moderateScale(5)
    },
    accountText:{
        color:Colors.white
    },
    buttonStyle: {
        borderRadius: 5,
        backgroundColor: Colors.tintColorSecondary,
        width: Dimensions.get('window').width - 80,
        paddingHorizontal: 20,
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
    checkBoxWrapper:{
        flexDirection:'row',alignItems:'center',marginTop:moderateScale(10)
    },
    checkBox:{
        marginRight:moderateScale(5)
    }
}));