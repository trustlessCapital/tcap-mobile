/**
 * Modified By @name Sukumar_Abhijeet,
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    AppState,
    RefreshControl,
    ActivityIndicator,
    View,
    Text
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
import WalletService from '../../../@Services/wallet-service';
import * as DashboardActions from '../../../@Redux/actions/dashboardActions';
import walletUtils from '../../../@Services/wallet-utils';
import * as AccountActions from '../../../@Redux/actions/accountActions';

class DashboardScreen extends Component {
  static propTypes = {
      
      navigation:PropTypes.object.isRequired,
      route:PropTypes.object.isRequired,
      setAccountDetails:PropTypes.func.isRequired,
      updateBalanceObject:PropTypes.func.isRequired,
      updateVerifiedAccountBalances:PropTypes.func.isRequired,
      updateZkSyncTokens:PropTypes.func.isRequired,
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
      isFocused:false,
  };
  authState = {};

  componentDidMount() {
      this.focusListener = this.props.navigation.addListener('focus', () => {
          this.setState({isFocused:true});
      });
      this.props.updateZkSyncTokens();
      if(this.props.route.params.accountDetails)
          this.props.setAccountDetails(this.props.route.params.accountDetails);
      AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
      this.focusListener();
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
      this.fetchAccountBalance();
      const walletService = WalletService.getInstance();
      const pk = walletService.pk;
      const address = walletUtils.createAddressFromPrivateKey(pk);
      this.props.updateVerifiedAccountBalances(address);
      setTimeout(()=>{this.setState({refreshing:false});},500);
  };

  fetchAccountBalance = async () => {
      const walletService = WalletService.getInstance();
      await walletService.getZkSyncBalance().then(balanceObj => {
          this.props.updateBalanceObject(balanceObj);
      });
  }

  renderContent = () =>{
      if(this.state.isFocused)
          return(
              <>
                  <DashboardWallet
                      accountDetails={this.accountDetails}
                      navigation={this.props.navigation}
                  />
                  <DashboardAsset />
              </>
          );
      return (
          <View>
              <Text style={styles.titleBar_title}>Welcome to you Wallet!</Text>
              <ActivityIndicator color={Colors.title} size={'small'} />
          </View>
      );
  }
  

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
                  showsVerticalScrollIndicator={false}
              >
                  {this.renderContent()}
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
        updateZkSyncTokens:() =>
            dispatch(ZkSyncTokenActions.updateZkSyncTokens()),
        updateBalanceObject:balanceObj =>
            dispatch(DashboardActions.updateBalanceObject(balanceObj)),
        updateVerifiedAccountBalances:address =>
            dispatch(DashboardActions.updateVerifiedAccountBalances(address)),
        setAccountDetails : details =>
            dispatch(AccountActions.setAccountDetails(details)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(DashboardScreen);
