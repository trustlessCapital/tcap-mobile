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
    appState: AppState.currentState,
    pk : '' //TODO Remove this afterwards
  };
  authState = {};

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
      if (this.props.route.params.pk)
        this.state.pk = this.props.route.params.pk;
    }
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
              <Text style={styles.title}>{this.state.pk}</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
