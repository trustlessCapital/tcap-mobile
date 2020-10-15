/**
 * Modified By @name Sukumar_Abhijeet,
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    AppState,
    RefreshControl
} from 'react-native';
import styles from './styles';
import SecurityServices from '../../../@Services/security';
import Colors from '../../../@Constants/Colors';
import StatusBarColor from '../../../@Components/status-bar-color';
import DashboardWallet from './Wallet/index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ZkSyncTokenActions from '../../../@Redux/actions/zkSyncTokenActions';
import DashboardAsset from './Asset';

class DashboardScreen extends Component {
  static propTypes = {
      SyncZkSyncTokensFromServer:PropTypes.func.isRequired,
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
      refreshing:false,
  };
  authState = {};

  componentDidMount() {
      this.props.SyncZkSyncTokensFromServer();
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

  onRefresh = () =>{
      this.setState({refreshing:true});
      setTimeout(()=>{this.setState({refreshing:false});},500);
  };

  render() {
      const {refreshing} = this.state;
      return (
          <SafeAreaView style={styles.wrapper}>
              <StatusBarColor
                  backgroundColor={Colors.primary_bg}
                  barStyle="light-content"
              />
              <ScrollView 
                  refreshControl={
                      <RefreshControl
                          onRefresh={this.onRefresh} refreshing={refreshing} tintColor={Colors.white}
                          title="Refreshing Dashboard"
                          titleColor={Colors.white} />
                  } 
                  showsVerticalScrollIndicator={false} style={{ flex: 1 }}
              >
                  <DashboardWallet
                      accountDetails={this.accountDetails}
                      navigation={this.props.navigation}
                  />
                  <DashboardAsset />
              </ScrollView>
          </SafeAreaView>
      );
  }
}

function mapStateToProps(){    
    return{
    };
}

function mapDispatchToProps(dispatch){
    return{
        SyncZkSyncTokensFromServer:() =>
            dispatch(ZkSyncTokenActions.updateZkSyncTokens()),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(DashboardScreen);
