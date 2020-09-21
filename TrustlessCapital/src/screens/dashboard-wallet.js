import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../stylesheets/dashboard-wallet';
import {Placeholder, PlaceholderLine, Shine} from 'rn-placeholder';
import Colors from '../constants/Colors';
import WalletService from '../services/wallet-service';

export default class DashboardWallet extends Component {
  state = {
    verifiedBalance: 0,
    depositingBalance: 0,
    loadingBalance: true
  }

  constructor(props) {
    super(props);
    this.pk = this.props.pk;
    this.accountDetails = this.props.accountDetails;
    this.walletService = WalletService.getInstance();
    this.fetchAccountBalance();
  }

  goToDepositHomeScreen = () => {
    this.props.navigation.push('DepositHomeScreen', {
      accountDetails: this.accountDetails,
      pk: this.pk,
    });
  }

  fetchAccountBalance = async () => {
    this.state.loadingBalance = true;
    this.setState({});
    let accountState = await this.walletService.getAccountState(this.pk);
    this.walletService.getEtheriumBalance(this.pk);
    this.state.loadingBalance = false;
    this.setState({});
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
            <Text style={styles.balanceText}>$ 77,777.</Text>
            <Text style={styles.balanceTextDecimal}>00</Text>
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