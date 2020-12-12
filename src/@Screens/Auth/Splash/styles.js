import {
    StyleSheet
} from 'react-native';
import Colors from '../../../@Constants/Colors';
import {moderateScale} from 'react-native-size-matters';
  
export default (styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
        justifyContent:'center',
        alignItems:'center'
    },
    imageBox:{
        width: moderateScale(400),
        height:moderateScale(150)
    },
    titleImage: {
        flex:1,width:null,height:null
    },
    beta:{
        fontWeight:'bold',
        fontFamily: 'Montserrat-Bold',
        fontSize:moderateScale(20),
        color:Colors.activeTintRed
    },
}));
  
  