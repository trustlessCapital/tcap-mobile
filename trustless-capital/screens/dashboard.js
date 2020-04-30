import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import LoadingIndicator from '../components/loading-indicator';
import styles from '../stylesheets/dashboard';
const mailImage = require('../assets/images/icons/mail.png');
const smsImage = require('../assets/images/icons/sms.png');

export default class DashboardScreen extends Component {
  state = {
    isLoading: false,
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <Text style={styles.title}>Dashboard</Text>
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
}
