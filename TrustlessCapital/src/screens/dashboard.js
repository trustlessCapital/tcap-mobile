import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  AppState,
} from 'react-native';
import styles from '../stylesheets/dashboard';
import SecurityServices from '../services/security';

export default class DashboardScreen extends Component {
  state = {
    isLoading: false,
    appState: AppState.currentState
  };
  authState = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    SecurityServices.handleLocalAuthorization(
      this,
      nextAppState,
      this.state,
      this.authState,
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <Text style={styles.title}>Dashboard</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
