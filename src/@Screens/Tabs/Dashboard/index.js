import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  AppState
} from 'react-native';
import styles from './styles';
import SecurityServices from '../../../@Services/security';
import Colors from '../../../@Constants/Colors';
import StatusBarColor from '../../../@Components/status-bar-color';
import DashboardWallet from './Wallet/index';

export default class DashboardScreen extends Component {
  state = {
    appState: AppState.currentState,
    index: 0,
  };
  authState = {};

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
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
        <StatusBarColor
          backgroundColor={Colors.primary_bg}
          barStyle="light-content"
        />
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={{ flex: 1 }}>
          <DashboardWallet
            accountDetails={this.accountDetails}
            navigation={this.props.navigation}
          />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
