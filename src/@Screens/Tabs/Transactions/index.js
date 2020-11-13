/**
 * Create By @name Sukumar_Abhijeet 
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    AppState
} from 'react-native';
import styles from './styles';
import SecurityServices from '../../../@Services/security';
import Colors from '../../../@Constants/Colors';
import StatusBarColor from '../../../@Components/status-bar-color';
import TransactionHistory from './TransactionHistory';

export default class TransactionScreen extends Component {
  

    constructor(props) {
        super(props);
        if (this.props.route && this.props.route.params) {
            if (this.props.route.params.accountDetails)
                this.accountDetails = this.props.route.params.accountDetails;
        }
    }

  state = {
      appState: AppState.currentState,
      index: 0,
  };
authState = {};

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
              <TransactionHistory />
          </SafeAreaView>
      );
  }
}
