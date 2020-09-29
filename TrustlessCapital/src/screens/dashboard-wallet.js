import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../stylesheets/dashboard-wallet';
import StorageUtils from '../services/storage-utils';
import WalletService from '../services/wallet-service';
import LoadingIndicator from '../components/loading-indicator';
import apiServices from '../services/api-services';

export default class DashboardWallet extends Component {
  state = {
    totalBalance: 0.0,
    isLoading: true
  }

  constructor(props) {
    super(props);
    this.accountDetails = this.props.accountDetails;
    this.walletService = WalletService.getInstance();
  }

  goToDepositHomeScreen = () => {
    this.props.navigation.push('DepositHomeScreen', {
      accountDetails: this.accountDetails,
      pk: this.pk,
    });
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let promises = [this.fetchAccountBalance(), this.getExchangeRates()];
    this.state.isLoading = true;
    Promise.all(promises).then(() => {
      this.setState({isLoading: false});
    }).catch(() => {
      // Show toast in case of any error
      this.setState({isLoading: false});
    })
  }

  getExchangeRates = async () => {
    await apiServices.getExchangePrice().then((exchangeRates) => {
      StorageUtils.exchangeRates(exchangeRates);
    });
  }

  fetchAccountBalance = async () => {
    const walletService = WalletService.getInstance();
    await walletService.getZkSyncBalance().then(balanceObj => {
      if (!balanceObj) {
        this.state.totalBalance = 0.0;
      } else {
        // Calculate balance
      } 
    });
  }

  get titleBar() {
    return (
      <>
        <View style={styles.titleBar}>
          <Text style={styles.titleBar_title}>Your Wallet</Text>
        </View>
      </>
    );
  }

  get balanceCard() {
    return (
      <>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Total Balance</Text>
          <View style={styles.balanceWrapper}>
            <Text style={styles.balanceText}>
              $ {this.state.totalBalance}
            </Text>
          </View>
          <View style={styles.balanceCardFooter}>
            <TouchableOpacity
              style={styles.buttonStylePrimary}
              onPress={this.goToDepositHomeScreen.bind(this)}>
              <Text style={styles.buttonText}>Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyleSecondary}>
              <Text style={styles.buttonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
          <LoadingIndicator
            visible={this.state.isLoading}
            message={'Please wait while we prepare your wallet dashboard...'}
          />
        </View>
      </>
    );
  }

  get mainContent() {
    return (
      <>
        <View style={styles.mainContent}>
          
        </View>
      </>
    );
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          {this.titleBar}
          {this.balanceCard}
          {this.mainContent}
        </View>
      </>
    );
  }
}