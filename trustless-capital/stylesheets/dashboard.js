import {
  StyleSheet,
  Dimensions,
} from 'react-native';
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
  title: {
    color: Colors.tintColor,
    fontFamily: 'montserratBold',
    fontSize: 18,
    marginBottom: 10,
  }
});

