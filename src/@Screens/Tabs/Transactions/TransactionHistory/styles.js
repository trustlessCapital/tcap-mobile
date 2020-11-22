import {
    StyleSheet,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../../@Constants/Colors';
  
export default (styles = StyleSheet.create({
    container: {
        flex: 1,
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
        alignSelf:'center'
    },
    cardWrapper:{
        flexDirection:'row',
        width:'90%',
        height:moderateScale(60),
        backgroundColor:Colors.tintColorDark,
        alignItems:'center',
        paddingHorizontal:moderateScale(20),
        borderRadius:moderateScale(6),
        alignSelf:'center',
        justifyContent:'space-between'
    },
    assetText:{
        color:Colors.white,
        fontFamily:'Montserrat-Bold'
    },
    typeText:{
        color:Colors.darkGrey , width:moderateScale(120),
        marginLeft:moderateScale(10),
        fontSize:moderateScale(14)
    },
    dateText:{
        fontFamily: 'Montserrat-Regular',
        fontSize:moderateScale(10),
        color:Colors.white
    },
    timeView:{
        alignSelf:'flex-end',marginRight:moderateScale(20),backgroundColor:Colors.inactiveTintGrey,
        paddingHorizontal:moderateScale(15),borderRadius:moderateScale(10),
        marginTop:moderateScale(-10),
        padding:moderateScale(2)
    }
}));
  
  