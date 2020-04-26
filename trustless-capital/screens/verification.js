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
  TextInput
} from 'react-native';
import LoadingIndicator from '../components/loading-indicator';
import Colors from '../constants/Colors';
import { PIN_SCREEN_MODE } from './pin';
const mailImage = require('../assets/images/icons/mail.png');
const smsImage = require('../assets/images/icons/sms.png');

const styles = StyleSheet.create({
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
  titleImage: {
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    color: Colors.tintColor,
    fontFamily: 'montserratBold',
    fontSize: 18,
    marginBottom: 10,
  },
  subTitle: {
    color: Colors.textColorGrey,
    fontFamily: 'montserrat',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  otpInput: {
    height: 40,
    width: 200,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 10,
    fontFamily: 'montserratBold',
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.tintColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    color: '#FFF',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'montserratBold',
  },
});

export const VERIFICATION_MODE = {
  SMS: 'sms',
  EMAIL: 'email'
};

export default class VerificationScreen extends Component {
  state = {
    isLoading: false,
    isOTPScreen: true,
    mode: VERIFICATION_MODE.EMAIL,
    otp: null
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

  onSelect = (country) => {
    this.setState({
      countryCode: country.cca2,
      countryCallingCode: '+' + country.callingCode[0],
      showCountryPicker: false,
    });
  };

  openCountryPicker = () => {
    this.setState({ showCountryPicker: true });
  };

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <Image
                style={styles.titleImage}
                source={this.getHeaderImage()}
              ></Image>
              <Text style={styles.title}>{this.getTitle()}</Text>
              <Text style={styles.subTitle}>{this.getSubTitle()}</Text>
              {this.state.mode === VERIFICATION_MODE.SMS && (
                <TextInput
                  style={styles.otpInput}
                  onChangeText={(otp) => this.setState({ otp })}
                  value={this.state.otp}
                  placeholder={'- - - -'}
                  maxLength={4}
                  keyboardType={'phone-pad'}
                />
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={this.onButtonPress}
              >
                <Text style={styles.buttonText} >{this.getButtonTitle()}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <LoadingIndicator
          visible={this.state.isLoading}
          message={'Verifying otp...'}
        />
      </SafeAreaView>
    );
  }

  getTitle = () => {
    if (this.state.mode === VERIFICATION_MODE.SMS) {
      return 'Verify your mobile number'
    } else {
      return 'Verify your email address';
    }
  }

  getSubTitle = () => {
    if (this.state.mode === VERIFICATION_MODE.SMS) {
      return 'Please enter the OTP sent to your mobile number. OTP is valid for 10 minutes.';
    } else {
      return 'An email is sent to your registered email-id. Please click on the verification link to finish your account verification and proceed to login.';
    }
  }

  getButtonTitle = () => {
    if (this.state.mode === VERIFICATION_MODE.SMS) {
      return 'Verify'
    } else {
      return 'Login';
    }
  }

  getHeaderImage = () => {
    if (this.state.mode === VERIFICATION_MODE.SMS) {
      return smsImage;
    } else {
      return mailImage;
    }
  }

  onButtonPress = () => {
    if (this.state.mode === VERIFICATION_MODE.SMS) {
      // TODO Make signup API Call
        this.setState({ isLoading: true });
        setTimeout(() => {
          this.setState({ isLoading: false, mode: VERIFICATION_MODE.EMAIL });
        }, 4000);
    } else {
      this.props.navigation.replace('PINScreen', {
        mode: PIN_SCREEN_MODE.LOGIN_PIN,
      });
    }
  }
}
