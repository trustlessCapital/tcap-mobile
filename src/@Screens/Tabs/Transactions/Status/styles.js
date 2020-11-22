import {
    StyleSheet,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../../@Constants/Colors';
  
export default (styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
    },
    statusBox:{
        backgroundColor:Colors.white,height:moderateScale(300),
        justifyContent:'center',alignItems:'center',borderRadius:moderateScale(6)
    },
    image:{width:moderateScale(80),height:moderateScale(80)},
    statusText:{
        fontSize:moderateScale(22),
        fontWeight:'bold',
        marginTop:moderateScale(15),
        fontFamily: 'Montserrat-Bold',
    },
    viewBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:Colors.inactiveTintGrey,
        paddingVertical:moderateScale(15),
        borderBottomWidth:.6
    },
    valueText:{
        color:Colors.white,
        maxWidth:moderateScale(180),
    },
    descText:{
        color:Colors.darkGrey
    },
    moduleModal:{
        backgroundColor:Colors.white,
        width:'100%',
        position:'absolute',bottom:moderateScale(100),
        justifyContent:'center',
        alignItems:'center'
    },
    optionTouch:{
        paddingVertical:moderateScale(15)
    },
    modalText:{
        fontSize:moderateScale(16),
        fontWeight:'bold'
    }
}));
  
  