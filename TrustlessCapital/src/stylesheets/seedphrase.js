import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';


export default (styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 20,
    marginEnd: 20,
  },
  mainTitle: {
    color: Colors.tintColor,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  title: {
    color: Colors.tintColor,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  subTitle: {
    color: Colors.textColorGrey,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  phrasesWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  phraseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  phraseItem: {
    borderRadius: 5,
    backgroundColor: Colors.tintColorGreyed,
    width: Dimensions.get('window').width / 2 - 60,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phraseItemWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: Colors.tintColorGreyedDark,
  },
  phraseIndex: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: 11,
  },
  phraseText: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: Colors.tintColor,
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