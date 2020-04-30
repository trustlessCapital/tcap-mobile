import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

export default styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
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
  titleImage: {
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    color: Colors.tintColor,
    fontFamily: 'montserratBold',
    fontSize: 18,
    marginBottom: 10,
  },
  subTitle: {
    color: Colors.textColorGrey,
    fontFamily: 'montserrat',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  otpInput: {
    height: 40,
    width: 200,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 10,
    fontFamily: 'montserratBold',
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.tintColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    color: '#FFF',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'montserratBold',
  },
  linkButton: {
    color: Colors.tintColor,
    fontFamily: 'montserrat',
    fontSize: 12,
    marginTop: 20
  },
});