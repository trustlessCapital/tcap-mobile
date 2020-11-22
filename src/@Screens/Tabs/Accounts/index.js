// Copyright (C) 2020  Trustless Pvt Ltd. <https://trustless.capital>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Created By @name Sukumar_Abhijeet,
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    AppState,
    ScrollView
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import SecurityServices from '../../../@Services/security';
import Colors from '../../../@Constants/Colors';
import StatusBarColor from '../../../@Components/status-bar-color';

import Preferences from './Preferences';
import AboutYou from './AboutYou';
import Help from './Help';
import Legal from './Legal';
import Details from './Details';

export default class AccountsScreen extends Component {

    static propTypes = {
        navigation:PropTypes.object.isRequired,
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
              <ScrollView showsVerticalScrollIndicator={false}>
                  <Details />
                  <AboutYou accountDetails={this.accountDetails} />
                  <Preferences accountDetails={this.accountDetails} navigation={this.props.navigation}  />
                  <Help />
                  <Legal />
              </ScrollView>
          </SafeAreaView>
      );
  }
}
