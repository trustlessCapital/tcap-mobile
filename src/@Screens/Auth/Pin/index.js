/**
 * Modified By @name Sukumar_Abhijeet,
 */

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    AppState,
    // BackHandler,
    
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import LoadingIndicator from '../../../@Components/loading-indicator';
import StatusBarColor from '../../../@Components/status-bar-color';
import ErrorDialog from '../../../@Components/error-dialog';
import Colors from '../../../@Constants/Colors';

import { VERIFICATION_MODE } from '../Verification';
import { PIN_SCREEN_MODE } from '../../../@Constants';

import WalletUtils from '../../../@Services/wallet-utils';
import WalletService from '../../../@Services/wallet-service';
import APIService from '../../../@Services/api-services';
import SecurityServices from '../../../@Services/security';

import styles from './styles';

export default class PINScreen extends Component {

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
            if (this.props.route.params.isPinFallback)
                this.isPinFallback = this.props.route.params.isPinFallback;
        
            this.recoverAccount = this.props.route.params.recoverAccount;
        }
    }

  email = null;
  phone = null;
  isPinFallback = false;
  authState = {};
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

  componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange);
      if (this.state.mode === PIN_SCREEN_MODE.LOGIN_PIN && !this.isPinFallback) {
          SecurityServices.authenticateOnStartup().then(() => this.allowLogin = true).catch(() => {
              this.allowLogin = true;
          });
      }
      //   BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
  }

  componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
      //   BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  //   _handleBackButton = () =>{
  //       if(this.state.disableBackButton) this.props.navigation.pop();
  //       else return false;
  //   };

  _handleAppStateChange = (nextAppState) => {
      if (!this.isPinFallback) {
          SecurityServices.handleLocalAuthorization(
              this,
              nextAppState,
              this.state,
              this.authState,
          ); 
      }
      this.isPinFallback = false;
  };

  render() {
      return (
          <SafeAreaView style={styles.wrapper}>
              <StatusBarColor
                  backgroundColor={Colors.primary_bg}
                  barStyle="light-content"
              />
              {!this.state.disableBackButton && (
                  <View style={styles.backButtonWrapper}>
                      <TouchableOpacity
                          onPress={this.navigateBack}
                          style={styles.backButton}>
                          <Icon
                              color={Colors.title}
                              name={'angle-left'}
                              size={24}
                              style={{alignSelf: 'center'}}
                          />
                      </TouchableOpacity>
                  </View>
              )}
              <View style={styles.container}>
                  {this.state.mode === PIN_SCREEN_MODE.LOGIN_PIN && (
                      <View style={styles.recoverButtonWrapper}>
                          <TouchableOpacity
                              onPress={this.navigateToRecoverAccount.bind(this)}>
                              <Text style={styles.recoverAccount}>Recover Account</Text>
                          </TouchableOpacity>
                      </View>
                  )}
                  <View style={styles.headerContainer}>
                      <View style={styles.titleWrapper}>
                          <Text style={styles.title}>{this.getTitle()}</Text>
                      </View>
                      <View style={styles.pinWrapper}>
                          <View style={this.getCircleStyle(1)} />
                          <View style={this.getCircleStyle(2)} />
                          <View style={this.getCircleStyle(3)} />
                          <View style={this.getCircleStyle(4)} />
                          <View style={this.getCircleStyle(5)} />
                          <View style={this.getCircleStyle(6)} />
                      </View>
                  </View>
              </View>
              <View style={styles.keyPadContainer}>
                  <Image
                      source={require('../../../../assets/images/backgrounds/pin-pattern.png')}
                      style={styles.keyPadImage}
                  />
                  <View style={styles.keyPadWrapper}>
                      <View style={styles.keyRow}>
                          <TouchableOpacity
                              onPress={() => this.onButtonPress('1')}
                              style={styles.key}>
                              <Text style={styles.keyStyle}>1</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              onPress={() => this.onButtonPress('2')}
                              style={styles.key}>
                              <Text style={styles.keyStyle}>2</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              onPress={() => this.onButtonPress('3')}
                              style={styles.key}>
                              <Text style={styles.keyStyle}>3</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={styles.keyRow}>
                          <TouchableOpacity
                              onPress={() => this.onButtonPress('4')}
                              style={styles.key}>
                              <Text style={styles.keyStyle}>4</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              onPress={() => this.onButtonPress('5')}
                              style={styles.key}>
                              <Text style={styles.keyStyle}>5</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              onPress={() => this.onButtonPress('6')}
                              style={styles.key}>
                              <Text style={styles.keyStyle}>6</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={styles.keyRow}>
                          <TouchableOpacity
                              onPress={() => this.onButtonPress('7')}
                              style={styles.key}>
                              <Text style={styles.keyStyle}>7</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              onPress={() => this.onButtonPress('8')}
                              style={styles.key}>
                              <Text style={styles.keyStyle}>8</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              onPress={() => this.onButtonPress('9')}
                              style={styles.key}>
                              <Text style={styles.keyStyle}>9</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={styles.keyRow}>
                          <View style={styles.key} />
                          <TouchableOpacity
                              onPress={() => this.onButtonPress('0')}
                              style={styles.key}>
                              <Text style={styles.keyStyle}>0</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              onPress={this.deleteKeyPress}
                              style={styles.key}>
                              <Icon
                                  color="#fff"
                                  name={'backspace'}
                                  size={22}
                                  style={{alignSelf: 'center'}}
                              />
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
              <LoadingIndicator
                  message={this.state.loadingMessage}
                  visible={this.state.isLoading}
              />
              <ErrorDialog
                  message={this.state.errorMessage}
                  onDismiss={() => {
                      this.setState({showError: false});
                  }}
                  title={this.state.errorTitle}
                  visible={this.state.showError}
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

  navigateToRecoverAccount = () => {
      this.props.navigation.push('SignUp', {
          recoverAccount: true
      });
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
      let signUpP;
      if (this.recoverAccount) {
          signUpP = APIService.recoverAccount(this.email, this.phone);
      } else {
          signUpP = APIService.signUp(this.email, this.phone);
      }
      return signUpP
          .then(accountDetails => {
              let clearStorageP = this.clearStorage();
              clearStorageP.then(() => {
                  return SecurityServices.storeAccountDetails(
                      accountDetails,
                      this.state.pin,
                  ).then(() => {
                      this.setState({ isLoading: false });
                      this.props.navigation.popToTop();
                      this.props.navigation.replace('VerificationScreen', {
                          mode: VERIFICATION_MODE.SMS,
                          accountDetails: accountDetails,
                      });
                  });
              });
          })
          .catch(error => {
              this.setState({isLoading: false});
              if (error.status == 409) {
                  this.props.navigation.popToTop();
                  this.props.navigation.replace('SignUp', {
                      signupError: true,
                  });
              } else {
                  this.setState({
                      showError: true,
                      errorMessage:
              'Error occured in signing you up! Please try later!',
                      errorTitle: 'Signup Failed',
                  });
              }
          })
          .finally(() => this.setState({isLoading: false}));
  };

  clearStorage = async () => {
      await SecurityServices.clearStorageAndKey();
      await WalletUtils.clearPrivateKey();
  }

  failedLoginOrSignUp = () => {
      this.props.navigation.popToTop();
      this.props.navigation.replace('SignUp', {
          signupError: true,
      });
  };

  loginUser = async () => {
      this.setState({ isLoading: true, loadingMessage: 'Please wait!!' });
      SecurityServices.fetchAccountDetails(this.state.pin)
          .then((account) => {
              APIService.signIn(account.email, account.phoneNumber)
                  .then((accountDetails) => {
                      SecurityServices.storeAccountDetails(
                          accountDetails,
                          this.state.pin
                      ).then(() => {
                          this.setState({ isLoading: false });
                          if (!accountDetails.isPhoneVerified ||!accountDetails.isEmailVerified) {
                              this.props.navigation.replace('VerificationScreen', {
                                  accountDetails: accountDetails,
                                  mode: !accountDetails.isPhoneVerified
                                      ? VERIFICATION_MODE.SMS
                                      : VERIFICATION_MODE.EMAIL,
                              });
                          } else {
                              if (!accountDetails.isMnemonicCreated) {
                                  this.props.navigation.replace('SeedPhraseNoticeScreen', {
                                      accountDetails: accountDetails,
                                      pin: this.state.pin
                                  });
                              } else {
                                  WalletUtils.getPrivateKey(this.state.pin, accountDetails.email).then((pk) => {
                                      if (!pk) {
                                          return this.props.navigation.replace(
                                              'SeedPhraseRecoveryScreen',
                                              {
                                                  accountDetails: accountDetails,
                                                  pin: this.state.pin,
                                              },
                                          );
                                      }
                                      WalletService.getInstance().setPk(pk);
                                      this.props.navigation.reset({
                                          index: 0,
                                          routes: [{ name: 'App' ,params:{ accountDetails: accountDetails }}]
                                      });
                                  });
                              }
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
                              errorMessage:
                  'Error occured in signing you in! Please try later!',
                              errorTitle: 'Signin Failed',
                          });
                      }
                  })
                  .finally(() => this.setState({ isLoading: false }));
          })
          .catch((error) => {
              let errMsg = 'Error occured in signing you in! Please try later!';
              if (error.status == -1) {
                  errMsg = 'Error occured in signing you in!';
              } else if (error.status == -2) {
                  errMsg = 'You have entered incorrect PIN!';
              } 
              this.setState({
                  isLoading: false,
                  showError: true,
                  errorMessage: errMsg,
                  errorTitle: 'Signin Failed',
              });
          });
  }
}
