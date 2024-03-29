import React, { Component } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView, 
    TextInput,
    Linking
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoadingIndicator from '../../../@Components/loading-indicator';
import ErrorDialog from '../../../@Components/error-dialog';
import Colors from '../../../@Constants/Colors';
import {PIN_SCREEN_MODE} from '../../../@Constants';
import CountryPicker from 'react-native-country-picker-modal';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
import styles from './styles';
import StatusBarColor from '../../../@Components/status-bar-color';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import SUPPORT from '../../../@Constants/Supports';

export default class SignUp extends Component {
 

    constructor(props) {
        super(props);
        if (this.props.route &&
      this.props.route.params) {
            if (this.props.route.params.signupError) this.state.signupError = this.props.route.params.signupError;
            if (this.props.route.params.email) this.state.emailInput = this.props.route.params.email;
            if (this.props.route.params.phone) this.state.phoneInput = this.props.route.params.phone;
            if (this.props.route.params.recoverAccount) this.state.recoverAccount = true;
        }
        this.canGoBack = this.props.navigation.canGoBack();
    }

  state = {
      emailInput: '',
      phoneInput: '',
      isEmailValid: false,
      isPhoneValid: false,
      isLoading: false,
      countryCode: 'IN',
      showCountryPicker: false,
      countryCallingCode: '+91',
      signupError: false,
      recoverAccount: false
  };

  switchAccountMode = () => {
      if (this.state.recoverAccount) {
          this.setState({ recoverAccount: false });
      } else {
          this.setState({ recoverAccount: true });
      }
  }

  onSelect = (country) => {
      this.setState({
          countryCode: country.cca2,
          countryCallingCode: '+' + country.callingCode[0],
          showCountryPicker: false,
      });
  }

  openCountryPicker = () => {
      this.setState({ showCountryPicker: true });
  }

 
  goToPinLogin = () => {
      this.props.navigation.navigate('PINScreen');
  };

  signUp = () => {
      this.props.navigation.push('PINScreen', {
          mode: PIN_SCREEN_MODE.SIGNUP_PIN,
          email: this.state.emailInput,
          phone: this.state.countryCallingCode + this.state.phoneInput,
          recoverAccount: this.state.recoverAccount
      });
  }

  getSignUpButtonStyle = () => {
      return !this.state.isEmailValid || !this.state.isPhoneValid
          ? styles.circleButtonDisabled
          : styles.circleButton;
  }

  onEmailChange = (emailInput) => {
      emailInput = emailInput.toLowerCase();
      if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailInput)) {
          this.setState({ emailInput: emailInput, isEmailValid: true });
      } else {
          this.setState({ emailInput: emailInput, isEmailValid: false });
      }
  }

  getEmailBorderColor = () => {
      if (this.state.isEmailValid) {
          return Colors.tintColor;
      } else {
          return Colors.error;
      }
  }

  onPhoneChange = (phoneInput) => {
      let parsedNumber;
      try {
          parsedNumber = phoneUtil.parse(this.state.countryCallingCode + phoneInput);
      } catch (e) {}
    
      if (parsedNumber && phoneUtil.isValidNumber(parsedNumber)) {
          this.setState({ phoneInput: phoneInput, isPhoneValid: true });
      } else if (parsedNumber) {
          this.setState({ phoneInput: phoneInput, isPhoneValid: false });
      } else {
          this.setState({ phoneInput: phoneInput });
      }
  }

  getPhoneBorderColor = () => {
      if (this.state.isPhoneValid) {
          return Colors.tintColor;
      } else {
          return Colors.error;
      }
  }

  openLink = async ()=>{
      try {
          const url = SUPPORT.termAndConditions;
          if (await InAppBrowser.isAvailable()) {
              await InAppBrowser.open(url, {
                  // iOS Properties
                  dismissButtonStyle: 'done',
                  preferredBarTintColor: Colors.white,
                  preferredControlTintColor: Colors.tintColor,
                  readerMode: false,
                  animated: true,
                  modalPresentationStyle: 'pageSheet',
                  modalTransitionStyle: 'coverVertical',
                  modalEnabled: true,
                  enableBarCollapsing: true,
                  // Android Properties
                  showTitle: true,
                  toolbarColor: Colors.primaryBg,
                  secondaryToolbarColor: 'white',
                  enableUrlBarHiding: true,
                  enableDefaultShare: true,
                  forceCloseOnRedirection: false,
                  // Animations
                  animations: {
                      startEnter: 'slide_in_right',
                      startExit: 'slide_out_left',
                      endEnter: 'slide_in_left',
                      endExit: 'slide_out_right',
                  },
                  headers: {
                      'my-custom-header': 'Track Status',
                  },
              });
          }
          else Linking.openURL(url);
      } catch (error) {
          // toast error

      }
  };

  render() {
      return (
          <SafeAreaView style={styles.wrapper}>
              <StatusBarColor
                  backgroundColor={Colors.primary_bg}
                  barStyle="light-content"
              />
              <KeyboardAvoidingView style={{flex: 1}}>
                  <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
                      <View style={styles.container}>
                          <Image
                              source={require('../../../../assets/images/backgrounds/main-pattern.png')}
                              style={styles.mainPattern}
                          />
                          <Image
                              source={require('../../../../assets/images/backgrounds/bg-pattern-2.png')}
                              style={styles.bgPattern1}
                          />
                          <View style={styles.headerContainer}>
                              <Image
                                  source={require('../../../../assets/images/logo.png')}
                                  style={styles.logo}
                              />
                              <View style={styles.titleWrapper}>
                                  <Text style={styles.title}>
                                      {this.state.recoverAccount
                                          ? 'Recover Account'
                                          : 'Welcome!'}
                                  </Text>
                                  <Text style={styles.subTitle}>
                                      {this.state.recoverAccount
                                          ? 'Sign In to continue'
                                          : 'Sign up to Continue'}
                                  </Text>
                              </View>
                          </View>
                          <View style={styles.form}>
                              <View style={styles.textInputRoot}>
                                  <TextInput
                                      autoCapitalize={'none'}
                                      blurOnSubmit={false}
                                      onChangeText={this.onEmailChange}
                                      onSubmitEditing={() => { this.numberInput.focus(); }}
                                      placeholder={'E-mail'}
                                      placeholderTextColor={Colors.tintColorGreyedDark}
                                      returnKeyType={'next'}
                                      style={styles.textInput}
                                      value={this.state.emailInput}
                                  />
                              </View>
                              <View style={styles.phoneTextInputWrapper}>
                                  <View style={styles.countryPickerButtonWrapper}>
                                      <TouchableOpacity
                                          onPress={this.openCountryPicker}
                                          style={styles.countryPickerButton}>
                                          <Text style={styles.countryPickerLabel}>
                                              {this.state.countryCallingCode}
                                          </Text>
                                          <Icon
                                              color={Colors.subTitle}
                                              name={'arrow-down'}
                                              size={18}
                                              style={{paddingStart: 5}}
                                          />
                                      </TouchableOpacity>
                                      <CountryPicker
                                          theme={{
                                              primaryColor: Colors.title,
                                              primaryColorVariant: Colors.primaryBorder,
                                              backgroundColor: Colors.primaryBg,
                                              onBackgroundTextColor: Colors.subTitle,
                                              fontSize: 14,
                                              fontFamily: 'Montserrat-Bold',
                                              filterPlaceholderTextColor: Colors.title,
                                              activeOpacity: 0.7,
                                              itemHeight: 40,
                                          }}
                                          {...{
                                              countryCode: this.state.countryCode,
                                              withFilter: true,
                                              withFlag: true,
                                              withCountryNameButton: false,
                                              withCallingCodeButton: false,
                                              withFlagButton: false,
                                              withAlphaFilter: true,
                                              withCallingCode: true,
                                              withEmoji: true,
                                              onSelect: this.onSelect,
                                              onClose: () => {
                                                  this.setState({showCountryPicker: false});
                                              },
                                          }}
                                          visible={this.state.showCountryPicker}
                                      />
                                  </View>
                                  <View
                                      style={[
                                          styles.textInputRoot,
                                          styles.phoneTextInputRoot,
                                      ]}>
                                      <TextInput
                                          keyboardType={'phone-pad'}
                                          onChangeText={this.onPhoneChange}
                                          placeholder={'Phone Number'}
                                          placeholderTextColor={Colors.tintColorGreyedDark}
                                          ref={(input) => { this.numberInput = input; }}
                                          style={styles.textInput}
                                          value={this.state.phoneInput}
                                      />
                                  </View>
                                  <Text style={styles.termsAndCondView}>By Signing up you are accepting all the
                                  </Text>
                                  <Text onPress={()=>this.openLink()} style={styles.termText}>  Terms and Conditions</Text>

                              </View>
                              <View style={styles.formFooter}>
                                  <View style={styles.flexStart}>
                                      <Text style={styles.signinLabelStyle}>
                                          {this.state.recoverAccount ? 'Sign In' : 'Sign Up'}
                                      </Text>
                                  </View>
                                  <View style={styles.flexEnd}>
                                      <TouchableOpacity
                                          disabled={
                                              !this.state.isEmailValid || !this.state.isPhoneValid
                                          }
                                          onPress={this.signUp}
                                          style={this.getSignUpButtonStyle()}>
                                          <Icon
                                              color="#fff"
                                              name={'arrow-right'}
                                              size={22}
                                          />
                                      </TouchableOpacity>
                                  </View>
                              </View>
                          </View>
                          <View style={styles.footerContainer}>
                              <View style={styles.flexStart} />
                              <View style={styles.flexEnd}>
                                  <TouchableOpacity>
                                      <Text
                                          onPress={this.switchAccountMode.bind(this)}
                                          style={styles.recoverAccount}>
                                          {this.state.recoverAccount
                                              ? 'New User? Sign Up'
                                              : 'Recover Account'}
                                      </Text>
                                  </TouchableOpacity>
                                  {this.state.recoverAccount && this.canGoBack && (
                                      <TouchableOpacity>
                                          <Text
                                              onPress={this.goToPinLogin.bind(this)}
                                              style={[styles.recoverAccount, {marginTop: 5}]}>
                      Login
                                          </Text>
                                      </TouchableOpacity>
                                  )}
                              </View>
                          </View>
                      </View>
                  </KeyboardAwareScrollView>
              </KeyboardAvoidingView>
              <LoadingIndicator
                  message={'Please wait while we sign you up...'}
                  visible={this.state.isLoading}
              />
              <ErrorDialog
                  message={'Account already exists with given email!'}
                  onDismiss={() => {
                      this.setState({signupError: false});
                  }}
                  title={'Signup Failed'}
                  visible={this.state.signupError}
              />
          </SafeAreaView>
      );
  }

}
