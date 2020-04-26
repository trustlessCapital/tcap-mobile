import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoadingIndicator from '../components/loading-indicator';
import Colors from '../constants/Colors';
import { PIN_SCREEN_MODE } from './pin';
import { Hoshi } from 'react-native-textinput-effects';
import CountryPicker from 'react-native-country-picker-modal';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window').height + 50,
    resizeMode: 'contain',
  },
  bgPattern1: {
    position: 'absolute',
    top: -40,
    left: 40,
    height: 400,
    opacity: 0.2,
    resizeMode: 'contain',
    zIndex: 1,
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
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    flex: 1,
    width: 180,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleWrapper: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    alignSelf: 'flex-start',
    color: Colors.tintColor,
    fontFamily: 'montserratBold',
    fontWeight: 'bold',
    fontSize: 30,
  },
  subTitle: {
    alignSelf: 'flex-start',
    color: Colors.subTitle,
    fontFamily: 'montserratBold',
    fontWeight: 'bold',
    fontSize: 20,
  },
  form: {
    flex: 1,
  },
  textInputRoot: {
    marginTop: 20,
    width: Dimensions.get('window').width - 40,
    borderBottomWidth: 1,
  },
  phoneTextInputWrapper: {
    marginTop: 20,
  },
  phoneTextInputRoot: {
    width: Dimensions.get('window').width - 40,
    borderBottomWidth: 1,
  },
  countryPickerButtonWrapper: {
    position: 'absolute',
    zIndex: 99,
    top: 15,
  },
  countryPickerButton: {
    padding: 5,
  },
  countryPickerLabel: {
    color: Colors.textColorGrey,
    fontFamily: 'montserratBold',
    fontWeight: 'bold',
  },
  textInput: {
    color: Colors.textColorGrey,
    fontSize: 14,
  },
  textInputLabel: {
    color: Colors.textColorGrey,
    fontSize: 12,
  },
  phoneTextInput: {
    color: Colors.textColorGrey,
    fontSize: 14,
    paddingLeft: 45,
  },
  phoneTextInputLabel: {
    fontSize: 12,
    paddingLeft: 45,
    color: Colors.textColorGrey,
  },
  formFooter: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
  },
  flexStart: {
    flex: 1,
    height: 60,
  },
  signinLabelStyle: {
    color: Colors.tintColor,
    fontFamily: 'montserratBold',
    fontSize: 18,
    paddingTop: 18,
  },
  flexEnd: {
    flex: 1,
    alignItems: 'flex-end',
    height: 60,
  },
  circleButton: {
    backgroundColor: Colors.tintColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  circleButtonDisabled: {
    backgroundColor: Colors.tintColorDisabled,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  footerLink: {
    color: Colors.tintColor,
    fontFamily: 'montserratBold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default class SignUp extends Component {
  state = {
    emailInput: '',
    phoneInput: '',
    isEmailValid: false,
    isPhoneValid: false,
    isLoading: false,
    countryCode: 'IN',
    showCountryPicker: false,
    countryCallingCode: '+91'
  };

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
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <Image
                style={styles.mainPattern}
                source={require('../assets/images/backgrounds/main-pattern.png')}
              ></Image>
              <Image
                style={styles.bgPattern1}
                source={require('../assets/images/backgrounds/bg-pattern-2.png')}
              ></Image>
              <View style={styles.headerContainer}>
                <Image
                  style={styles.logo}
                  source={require('../assets/images/logo.png')}
                ></Image>
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
                ></Hoshi>
                <View style={styles.phoneTextInputWrapper}>
                  <View style={styles.countryPickerButtonWrapper}>
                    <TouchableOpacity
                      style={styles.countryPickerButton}
                      onPress={this.openCountryPicker}
                    >
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
                        fontFamily: 'montserratBold',
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
                          this.setState({ showCountryPicker: false });
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
                  ></Hoshi>
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
                      }
                    >
                      <Ionicons
                        name={'md-arrow-forward'}
                        size={22}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.footerContainer}>
                <View style={styles.flexStart}></View>
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
      </SafeAreaView>
    );
  }

  signUp = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
      this.props.navigation.push('PINScreen', {
        mode: PIN_SCREEN_MODE.SIGNUP_PIN
      });
    }, 4000);
  }

  getSignUpButtonStyle = () => {
    return !this.state.isEmailValid || !this.state.isPhoneValid
      ? styles.circleButtonDisabled
      : styles.circleButton;
  }

  onEmailChange = (emailInput) => {
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
    let parsedNumber, isPhoneValid;
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
