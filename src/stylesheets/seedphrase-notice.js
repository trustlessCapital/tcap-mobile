import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';


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
  logo: {
    height: 40,
    resizeMode: 'contain',
    marginTop: 40,
    marginBottom: 40,
  },
  carouselItem: {
    flexDirection: 'column',
    height: Dimensions.get('window').height - 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.title,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 26,
    marginBottom: 20,
    marginHorizontal: 40,
  },
  paragraph: {
    color: Colors.subTitle,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 40,
  },
  paragraphImportant: {
    color: Colors.tintColorSecondary,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 40,
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
    marginTop: 40,
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
}));