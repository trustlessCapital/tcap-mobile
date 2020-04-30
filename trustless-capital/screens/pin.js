import React, { Component } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AsyncStorage,
  Text,
  View,
  Image,
  TouchableOpacity,
  AppState,
} from 'react-native';
import LoadingIndicator from '../components/loading-indicator';
import ErrorDialog from '../components/error-dialog';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { VERIFICATION_MODE } from './verification';
import APIService from '../services/api-services';
import styles from '../stylesheets/pin';

export const PIN_SCREEN_MODE = {
  AUTH_PIN: 'auth_pin',
  LOGIN_PIN: 'login_pin',
  SIGNUP_PIN: 'signup_pin',
  CONFIRM_PIN: 'confirm_pin',
};

export default class PINScreen extends Component {
  email = null;
  phone = null;
  state = {
    pin: null,
    confirmPin: null,
    mode: PIN_SCREEN_MODE.AUTH_PIN,
    isLoading: false,
    enableBackButton: true,
    locked: true,
    appState: AppState.currentState,
    showError: false,
    errorMessage: null,
    errorTitle: null,
    loadingMessage: 'Please wait while we sign you up!',
  };

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.mode)
        this.state.mode = this.props.route.params.mode;
      if (this.state.mode === PIN_SCREEN_MODE.LOGIN_PIN) {
        this.state.disableBackButton = true;
      }
      if (this.props.route.params.email)
        this.email = this.props.route.params.email;
      if (this.props.route.params.phone)
        this.phone = this.props.route.params.phone;
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (!this.isAuthAsked) this.authenticateWithTouchID();
      this.isAuthAsked = false;
    }
    this.setState({ appState: nextAppState });
  };

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
        {!this.state.disableBackButton && (
          <View style={styles.backButtonWrapper}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={this.navigateBack}
            >
              <Ionicons
                name={'ios-arrow-back'}
                size={24}
                color={Colors.title}
                style={{ alignSelf: 'center' }}
              />
            </TouchableOpacity>
          </View>
        )}
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
          message={this.state.loadingMessage}
        />
        <ErrorDialog
          title={this.state.errorTitle}
          visible={this.state.showError}
          message={this.state.errorMessage}
          onDismiss={() => {
            this.setState({ showError: false });
          }}
        />
      </SafeAreaView>
    );
  }

  getTitle = () => {
    if (this.state.mode === PIN_SCREEN_MODE.CONFIRM_PIN) {
      return 'Confirm your 6 Digit PIN';
    } else if (this.state.mode === PIN_SCREEN_MODE.LOGIN_PIN) {
      return 'Enter 6 Digit PIN to Login';
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
      this.setState({
        mode: PIN_SCREEN_MODE.SIGNUP_PIN,
        pin: '',
        confirmPin: '',
      });
    } else {
      this.props.navigation.goBack();
    }
  };

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
      this.state.mode === PIN_SCREEN_MODE.SIGNUP_PIN ||
      this.state.mode === PIN_SCREEN_MODE.LOGIN_PIN
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

      if (
        this.state.mode === PIN_SCREEN_MODE.LOGIN_PIN &&
        this.state.pin.length === 6
      ) {
        this.loginUser();
      }
    } else if (this.state.mode === PIN_SCREEN_MODE.CONFIRM_PIN) {
      if (!this.state.confirmPin) {
        this.state.confirmPin = '';
      }
      if (this.state.confirmPin.length < 6) {
        this.state.confirmPin += pin;
        this.setState({ confirmPin: this.state.confirmPin });
      }

      if (this.state.confirmPin.length === 6) {
        this.signupUser();
      }
    }
  };

  signupUser = async () => {
    if (this.state.confirmPin != this.state.pin) {
      this.setState({
        showError: true,
        errorMessage: 'Confirmation PIN does not match!',
        errorTitle: 'PIN does not match',
      });
      return;
    }
    this.setState({ isLoading: true });
    APIService.signUp(this.email, this.phone)
      .then((accountDetails) => {
        // TODO Encrypt the account details with pin
        this.encryptAndSaveAccount(accountDetails, this.state.pin).then(() => {
          this.setState({ isLoading: false });
          this.props.navigation.popToTop();
          this.props.navigation.replace('VerificationScreen', {
            mode: VERIFICATION_MODE.SMS,
            accountDetails: accountDetails,
          });
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        if (error.status == 409) {
          this.props.navigation.popToTop();
          this.props.navigation.replace('SignUp', {
            signupError: true,
          });
        } else {
          this.setState({
            showError: true,
            errorMessage: 'Error occured in signing you up! Please try later!',
            errorTitle: 'Signup Failed',
          });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  failedLoginOrSignUp = () => {
    this.props.navigation.popToTop();
    this.props.navigation.replace('SignUp', {
      signupError: true,
    });
  };

  loginUser = async () => {
    this.setState({ isLoading: true, loadingMessage: 'Please wait!!' });
    // TODO Decrypt the Saved account details in asyncstorage using pin
    account = await AsyncStorage.getItem('account');
    try {
      account = JSON.parse(account);
    } catch (e) {
      this.failedLoginOrSignUp();
      return;
    }
    if (!account.email || !account.phoneNumber) {
      return this.failedLoginOrSignUp();
    }
    APIService.signIn(account.email, account.phoneNumber)
      .then((accountDetails) => {
        // TODO Encrypt the account details with pin
        this.encryptAndSaveAccount(accountDetails, this.state.pin).then(() => {
          this.setState({ isLoading: false });
          if (
            !accountDetails.isPhoneVerified ||
            !accountDetails.isEmailVerified
          ) {
            this.props.navigation.replace('VerificationScreen', {
              accountDetails: accountDetails,
              mode: !accountDetails.isPhoneVerified
                ? VERIFICATION_MODE.SMS
                : VERIFICATION_MODE.EMAIL,
            });
          } else {
            this.props.navigation.replace('DashboardScreen', {
              accountDetails: accountDetails,
            });
          }
        });
      })
      .catch((error) => {
        if (error.status == 409) {
          this.setState({
            isLoading: false,
            showError: true,
            errorMessage: 'Invalid PIN/User account not found!',
            errorTitle: 'Signin Failed',
          });
        } else {
          this.setState({
            isLoading: false,
            showError: true,
            errorMessage: 'Error occured in signing you in! Please try later!',
            errorTitle: 'Signin Failed',
          });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  encryptAndSaveAccount = (accountDetails, pin) => {
    return AsyncStorage.setItem('account', JSON.stringify(accountDetails));
  };
}
