import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingIndicator from '../components/loading-indicator';
import ErrorDialog from '../components/error-dialog';
import Colors from '../constants/Colors';
import {PIN_SCREEN_MODE} from '../constants';
import { Hoshi } from 'react-native-textinput-effects';
import CountryPicker from 'react-native-country-picker-modal';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
import styles from '../stylesheets/signup';

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
    signupError: false
  };

  constructor(props) {
    super(props);
    if (this.props.route &&
      this.props.route.params) {
      if (this.props.route.params.signupError) this.state.signupError = this.props.route.params.signupError;
      if (this.props.route.params.email) this.state.emailInput = this.props.route.params.email;
      if (this.props.route.params.phone) this.state.phoneInput = this.props.route.params.phone;
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
        <KeyboardAvoidingView style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                  <Text style={styles.title}>Welcome!</Text>
                  <Text style={styles.subTitle}>Sign up to Continue</Text>
                </View>
              </View>
              <View style={styles.form}>
                <Hoshi
                  label={'Email'}
                  borderColor={this.getEmailBorderColor()}
                  style={styles.textInputRoot}
                  inputStyle={styles.textInput}
                  labelStyle={styles.textInputLabel}
                  borderHeight={2}
                  inputPadding={8}
                  keyboardType={'email-address'}
                  onChangeText={this.onEmailChange}
                  value={this.state.emailInput}
                />
                <View style={styles.phoneTextInputWrapper}>
                  <View style={styles.countryPickerButtonWrapper}>
                    <TouchableOpacity
                      style={styles.countryPickerButton}
                      onPress={this.openCountryPicker}>
                      <Text style={styles.countryPickerLabel}>
                        {this.state.countryCallingCode}
                      </Text>
                    </TouchableOpacity>
                    <CountryPicker
                      theme={{
                        primaryColor: '#ccc',
                        primaryColorVariant: '#eee',
                        backgroundColor: '#ffffff',
                        onBackgroundTextColor: Colors.textColorGrey,
                        fontSize: 14,
                        fontFamily: 'Montserrat-Bold',
                        filterPlaceholderTextColor: '#aaa',
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
                  <Hoshi
                    label={'Phone Number'}
                    borderColor={this.getPhoneBorderColor()}
                    style={styles.phoneTextInputRoot}
                    inputStyle={styles.phoneTextInput}
                    labelStyle={styles.phoneTextInputLabel}
                    borderHeight={2}
                    inputPadding={8}
                    keyboardType={'phone-pad'}
                    onChangeText={this.onPhoneChange}
                    value={this.state.phoneInput}
                  />
                </View>
                <View style={styles.formFooter}>
                  <View style={styles.flexStart}>
                    <Text style={styles.signinLabelStyle}>Sign Up</Text>
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
                  <Text style={styles.footerLink}>Recover Account</Text>
                </View>
              </View>
            </View>
          </ScrollView>
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

  signUp = () => {
    this.props.navigation.push('PINScreen', {
      mode: PIN_SCREEN_MODE.SIGNUP_PIN,
      email: this.state.emailInput,
      phone: this.state.countryCallingCode + this.state.phoneInput,
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
