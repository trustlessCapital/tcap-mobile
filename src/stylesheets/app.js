import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import Colors from '../constants/Colors';

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
    color: Colors.title,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginBottom: 10,
  },
  titleImage: {
    width: 400,
    resizeMode: 'contain',
  },
}));


