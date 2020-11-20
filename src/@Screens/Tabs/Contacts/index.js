/**
 * Create By @name Sukumar_Abhijeet 
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
    AppState,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import SecurityServices from '../../../@Services/security';
import Colors from '../../../@Constants/Colors';
import StatusBarColor from '../../../@Components/status-bar-color';
import { moderateScale } from 'react-native-size-matters';

export default class ContactsScreen extends Component {

    static propTypes = {
        route:PropTypes.object.isRequired,
    };
  
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

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    
    authState = {};


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
              <Text style={{color:'#fff',alignSelf:'center',fontSize:moderateScale(16)}}>Coming Soon.</Text>
          </SafeAreaView>
      );
  }
}
