import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import Colors from '../constants/Colors';

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  },
  balanceCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: Colors.tintColorDark,
    width: '100%',
    borderRadius: 20,
  },
  balanceTitle: {
    color: Colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    marginBottom: 20,
  },
  balanceWrapper: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  balanceText: {
    color: Colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
  },
  balanceTextDecimal: {
    color: Colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  balanceCardFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonStylePrimary: {
    borderRadius: 5,
    backgroundColor: Colors.tintColorSecondary,
    width: '40%',
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
  buttonStyleSecondary: {
    borderRadius: 5,
    backgroundColor: Colors.tintColor,
    width: '40%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    flex: 1
  }
}));

