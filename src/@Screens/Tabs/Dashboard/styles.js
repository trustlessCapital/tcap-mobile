import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import Colors from '../../../@Constants/Colors';
  
export default (styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
    },
    container: {
        flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: Colors.primaryBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 20,
        marginEnd: 20,
    },
    title: {
        color: Colors.tintColor,
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        marginBottom: 10,
    },
    tabBar: {
        flexDirection: 'row',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Colors.tintColorDark,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 24,
    },
    tabIcon: {
        width: 26,
        height: 26,
    },
    scene: {
        flex: 1,
    },
    titleBar_title: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        alignSelf:'center'
    },
}));
  
  