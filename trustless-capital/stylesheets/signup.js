import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';


export default styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
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
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
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
    color: Colors.tintColor,
    fontFamily: 'montserratBold',
    fontWeight: 'bold',
    fontSize: 30,
  },
  subTitle: {
    alignSelf: 'flex-start',
    color: Colors.subTitle,
    fontFamily: 'montserratBold',
    fontWeight: 'bold',
    fontSize: 20,
  },
  form: {
    flex: 1,
  },
  textInputRoot: {
    marginTop: 20,
    width: Dimensions.get('window').width - 40,
    borderBottomWidth: 1,
  },
  phoneTextInputWrapper: {
    marginTop: 20,
  },
  phoneTextInputRoot: {
    width: Dimensions.get('window').width - 40,
    borderBottomWidth: 1,
  },
  countryPickerButtonWrapper: {
    position: 'absolute',
    zIndex: 99,
    top: 15,
  },
  countryPickerButton: {
    padding: 5,
  },
  countryPickerLabel: {
    color: Colors.textColorGrey,
    fontFamily: 'montserratBold',
    fontWeight: 'bold',
  },
  textInput: {
    color: Colors.textColorGrey,
    fontSize: 14,
  },
  textInputLabel: {
    color: Colors.textColorGrey,
    fontSize: 12,
  },
  phoneTextInput: {
    color: Colors.textColorGrey,
    fontSize: 14,
    paddingLeft: 45,
  },
  phoneTextInputLabel: {
    fontSize: 12,
    paddingLeft: 45,
    color: Colors.textColorGrey,
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
    color: Colors.tintColor,
    fontFamily: 'montserratBold',
    fontSize: 18,
    paddingTop: 18,
  },
  flexEnd: {
    flex: 1,
    alignItems: 'flex-end',
    height: 60,
  },
  circleButton: {
    backgroundColor: Colors.tintColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  circleButtonDisabled: {
    backgroundColor: Colors.tintColorDisabled,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  footerLink: {
    color: Colors.tintColor,
    fontFamily: 'montserratBold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});