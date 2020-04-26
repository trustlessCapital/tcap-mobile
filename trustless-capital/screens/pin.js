import React, { Component } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AppState
} from 'react-native';
import LoadingIndicator from '../components/loading-indicator';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  backButtonWrapper: {
    width: 40,
    width: Dimensions.get('window').width,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center'
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  pinBackgroundLogo: {
    position: 'absolute',
    bottom: -200,
    left: Dimensions.get('window').width / 2 - 50,
    width: 100,
    resizeMode: 'contain',
    opacity: 0.05,
  },
  titleWrapper: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.textColorGrey,
    fontFamily: 'montserratBold',
    fontSize: 18,
  },
  pinWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  unfilledCircle: {
    margin: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.subTitle,
  },
  filledCircle: {
    margin: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.tintColor,
  },
  keyPadContainer: {
    flex: 2,
  },
  keyPadImage: {
    height: 80,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
  },
  keyPadWrapper: {
    flex: 1,
    backgroundColor: Colors.tintColor,
  },
  keyRow: {
    flex: 1,
    flexDirection: 'row',
  },
  key: {
    flex: 1,
    justifyContent: 'center',
  },
  keyStyle: {
    color: '#FFF',
    fontFamily: 'montserratBold',
    fontSize: 26,
    textAlign: 'center',
  },
});

export const PIN_SCREEN_MODE = {
  AUTH_PIN: 'auth_pin',
  SIGNUP_PIN: 'signup_pin',
  CONFIRM_PIN: 'confirm_pin',
};

export default class PINScreen extends Component {
  state = {
    pin: null,
    confirmPin: null,
    mode: PIN_SCREEN_MODE.AUTH_PIN,
    isLoading: false,
    enableBackButton: true,
    locked: true,
    appState: AppState.currentState
  };

  constructor(props) {
    super(props);
    if (
      this.props.route &&
      this.props.route.params &&
      this.props.route.params.mode
    )
    this.state.mode = this.props.route.params.mode;
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (!this.isAuthAsked) this.authenticateWithTouchID();
      this.isAuthAsked = false;
    } 
    this.setState({appState: nextAppState});
  }

  authenticateWithTouchID = async () => {
    let hasHardware = await LocalAuthentication.hasHardwareAsync();

    let isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      this.isAuthAsked = true;
      let authenticationResult = await LocalAuthentication.authenticateAsync();
      if (authenticationResult.success) {
        this.setState({ locked: false });
      }
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.backButtonWrapper}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={this.navigateBack}
          >
            <Ionicons
              name={'ios-arrow-back'}
              size={22}
              color={Colors.title}
              style={{ alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{this.getTitle()}</Text>
            </View>
            <View style={styles.pinWrapper}>
              <View style={this.getCircleStyle(1)}></View>
              <View style={this.getCircleStyle(2)}></View>
              <View style={this.getCircleStyle(3)}></View>
              <View style={this.getCircleStyle(4)}></View>
              <View style={this.getCircleStyle(5)}></View>
              <View style={this.getCircleStyle(6)}></View>
            </View>
          </View>
        </View>
        <View style={styles.keyPadContainer}>
          <Image
            style={styles.keyPadImage}
            source={require('../assets/images/backgrounds/pin-pattern.png')}
          ></Image>
          <View style={styles.keyPadWrapper}>
            <View style={styles.keyRow}>
              <TouchableOpacity
                style={styles.key}
                onPress={() => this.onButtonPress('1')}
              >
                <Text style={styles.keyStyle}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.key}
                onPress={() => this.onButtonPress('2')}
              >
                <Text style={styles.keyStyle}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.key}
                onPress={() => this.onButtonPress('3')}
              >
                <Text style={styles.keyStyle}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keyRow}>
              <TouchableOpacity
                style={styles.key}
                onPress={() => this.onButtonPress('4')}
              >
                <Text style={styles.keyStyle}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.key}
                onPress={() => this.onButtonPress('5')}
              >
                <Text style={styles.keyStyle}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.key}
                onPress={() => this.onButtonPress('6')}
              >
                <Text style={styles.keyStyle}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keyRow}>
              <TouchableOpacity
                style={styles.key}
                onPress={() => this.onButtonPress('7')}
              >
                <Text style={styles.keyStyle}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.key}
                onPress={() => this.onButtonPress('8')}
              >
                <Text style={styles.keyStyle}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.key}
                onPress={() => this.onButtonPress('9')}
              >
                <Text style={styles.keyStyle}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keyRow}>
              <View style={styles.key}></View>
              <TouchableOpacity
                style={styles.key}
                onPress={() => this.onButtonPress('0')}
              >
                <Text style={styles.keyStyle}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.key}
                onPress={this.deleteKeyPress}
              >
                <Ionicons
                  name={'ios-backspace'}
                  size={22}
                  color="#fff"
                  style={{ alignSelf: 'center' }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <LoadingIndicator
          visible={this.state.isLoading}
          message={'Please wait while we sign you in...'}
        />
      </SafeAreaView>
    );
  }

  getTitle = () => {
    if (this.state.mode === PIN_SCREEN_MODE.CONFIRM_PIN) {
      return 'Confirm your 6 Digit PIN';
    } else {
      return 'Enter 6 Digit PIN';
    }
  };

  getCircleStyle = (index) => {
    let pin;
    if (this.state.mode === PIN_SCREEN_MODE.CONFIRM_PIN) {
      pin = this.state.confirmPin;
    } else {
      pin = this.state.pin;
    }
    if (!pin) pin = '';
    if (index <= pin.length) {
      return styles.filledCircle;
    } else {
      return styles.unfilledCircle;
    }
  };

  navigateBack = () => {
    if (this.state.mode === PIN_SCREEN_MODE.CONFIRM_PIN) {
      this.setState({ mode: PIN_SCREEN_MODE.SIGNUP_PIN, pin: '', confirmPin: '' });
    } else {
      this.props.navigation.goBack();
    }
  }

  deleteKeyPress = () => {
    if (
      this.state.mode === PIN_SCREEN_MODE.CONFIRM_PIN &&
      this.state.confirmPin &&
      this.state.confirmPin.length > 0
    ) {
      this.state.confirmPin = this.state.confirmPin.slice(
        0,
        this.state.confirmPin.length - 1
      );
      this.setState({ confirmPin: this.state.confirmPin });
    } else if (this.state.pin && this.state.pin.length > 0) {
      this.state.pin = this.state.pin.slice(0, this.state.pin.length - 1);
      this.setState({ pin: this.state.pin });
    }
  };

  onButtonPress = (pin) => {
    if (
      this.state.mode === PIN_SCREEN_MODE.AUTH_PIN ||
      this.state.mode === PIN_SCREEN_MODE.SIGNUP_PIN
    ) {
      if (!this.state.pin) {
        this.state.pin = '';
      }
      if (this.state.pin.length < 6) this.state.pin += pin;
      this.setState({ pin: this.state.pin });
      if (
        this.state.mode === PIN_SCREEN_MODE.SIGNUP_PIN &&
        this.state.pin.length === 6
      ) {
        this.setState({ mode: PIN_SCREEN_MODE.CONFIRM_PIN });
      }
    } else if (this.state.mode === PIN_SCREEN_MODE.CONFIRM_PIN) {
      if (!this.state.confirmPin) {
        this.state.confirmPin = '';
      }
      if (this.state.confirmPin.length < 6) this.state.confirmPin += pin;
      this.setState({ confirmPin: this.state.confirmPin });
    }
  };
  
}
