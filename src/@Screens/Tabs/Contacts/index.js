/**
 * Create By @name Sukumar_Abhijeet 
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
    AppState,
    TouchableOpacity
} from 'react-native';
import styles from './styles';
import SecurityServices from '../../../@Services/security';
import Colors from '../../../@Constants/Colors';
import StatusBarColor from '../../../@Components/status-bar-color';
import { moderateScale } from 'react-native-size-matters';

export default class ContactsScreen extends Component {
  
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

    state = {
        appState: AppState.currentState,
        index: 0,
    };
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
              <Text style={{color:'#fff',alignSelf:'center'}}>Contacts Screen</Text>
              <TouchableOpacity
                  onPress={()=>this.props.navigation.reset({
                      index: 0,
                      routes: [{ name: 'Auth'}],
                  })} style={{backgroundColor:'red',paddingBottom:moderateScale(10)}}>
                  <Text>Button</Text>
              </TouchableOpacity>
          </SafeAreaView>
      );
  }
}
