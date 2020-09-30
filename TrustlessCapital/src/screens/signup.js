import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView, TextInput
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingIndicator from '../components/loading-indicator';
import ErrorDialog from '../components/error-dialog';
import Colors from '../constants/Colors';
import {PIN_SCREEN_MODE} from '../constants';
import { Hoshi } from 'react-native-textinput-effects';
import CountryPicker from 'react-native-country-picker-modal';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
import styles from '../stylesheets/signup';
import StatusBarColor from '../components/status-bar-color';

export default class SignUp extends Component {
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
                style={styles.mainPattern}
                source={require('../../assets/images/backgrounds/main-pattern.png')}
              />
              <Image
                style={styles.bgPattern1}
                source={require('../../assets/images/backgrounds/bg-pattern-2.png')}
              />
              <View style={styles.headerContainer}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/images/logo.png')}
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
                    placeholder={'E-mail'}
                    placeholderTextColor={Colors.tintColorGreyedDark}
                    style={styles.textInput}
                    onChangeText={this.onEmailChange}
                    value={this.state.emailInput}
                  />
                </View>
                <View style={styles.phoneTextInputWrapper}>
                  <View style={styles.countryPickerButtonWrapper}>
                    <TouchableOpacity
                      style={styles.countryPickerButton}
                      onPress={this.openCountryPicker}>
                      <Text style={styles.countryPickerLabel}>
                        {this.state.countryCallingCode}
                      </Text>
                      <Icon
                        name={'ios-arrow-down'}
                        size={18}
                        color={Colors.subTitle}
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
                      placeholder={'Phone Number'}
                      placeholderTextColor={Colors.tintColorGreyedDark}
                      style={styles.textInput}
                      keyboardType={'phone-pad'}
                      onChangeText={this.onPhoneChange}
                      value={this.state.phoneInput}
                    />
                  </View>
                </View>
                <View style={styles.formFooter}>
                  <View style={styles.flexStart}>
                    <Text style={styles.signinLabelStyle}>
                      {this.state.recoverAccount ? 'Sign In' : 'Sign Up'}
                    </Text>
                  </View>
                  <View style={styles.flexEnd}>
                    <TouchableOpacity
                      style={this.getSignUpButtonStyle()}
                      onPress={this.signUp}
                      disabled={
                        !this.state.isEmailValid || !this.state.isPhoneValid
                      }>
                      <Icon
                        name={'md-arrow-forward'}
                        size={22}
                        color="#fff"
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
                      style={styles.recoverAccount}
                      onPress={this.switchAccountMode.bind(this)}>
                      {this.state.recoverAccount
                        ? 'New User? Sign Up'
                        : 'Recover Account'}
                    </Text>
                  </TouchableOpacity>
                  {this.state.recoverAccount && this.canGoBack && (
                    <TouchableOpacity>
                      <Text
                        style={[styles.recoverAccount, {marginTop: 5}]}
                        onPress={this.goToPinLogin.bind(this)}>
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
          visible={this.state.isLoading}
          message={'Please wait while we sign you up...'}
        />
        <ErrorDialog
          title={'Signup Failed'}
          visible={this.state.signupError}
          message={'Account already exists with given email!'}
          onDismiss={() => {
            this.setState({signupError: false});
          }}
        />
      </SafeAreaView>
    );
  }

  goToPinLogin = () => {
    this.props.navigation.goBack();
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
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)) {
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
}
