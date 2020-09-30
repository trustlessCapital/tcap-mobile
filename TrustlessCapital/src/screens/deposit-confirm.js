import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarColor from '../components/status-bar-color';
import Colors from '../constants/Colors';
import styles from '../stylesheets/deposit-home';
import ConfirmDialog from '../components/confirm-dialog';
import LoadingIndicator from '../components/loading-indicator';
import ErrorDialog from '../components/error-dialog';
import WalletService from '../services/wallet-service';
import StorageUtils from '../services/storage-utils';
import WalletUtils from '../services/wallet-utils';

export default class DepositConfirmScreen extends Component {
  state = {
    isLoading: true,
    confirmDialog: false,
    confirmDialogTitle: 'Cancel Deposit Funds',
    confirmDialogMessage: 'Are you sure you want to cancel the deposit funds transaction?',
  }

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
      if (this.props.route.params.amount)
        this.state.amount = this.props.route.params.amount;
      if (this.props.route.params.token)
        this.token = this.props.route.params.token;
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.state.isLoading = true;
    this.getExchangeRates().then(() => {
      this.setState({isLoading: false});
    }).catch(() => {
      // Show toast in case of any error
      this.setState({isLoading: false});
    })
  }

  getExchangeRates = async () => {
    this.exchangeRates = await StorageUtils.exchangeRates();
  }

  navigateBack = () => { this.props.navigation.goBack(); }

  depositFunds = () => {
    this.setState({isLoading: true});
    const walletService = WalletService.getInstance();
    walletService.depositFundsToZkSync(this.token, this.state.amount).then((txDetails) => {
      console.log('txDetails', txDetails);
      this.setState({ isLoading: false });
      this.goToDepositStatusScreen(txDetails);
    }).catch((e) => {
      console.log("Error ", e);
      this.setState({isLoading: false});
    });
  }

  goToDepositStatusScreen = (txDetails) => {
    this.props.navigation.push('DepositStatusScreen', {
      accountDetails: this.accountDetails,
      amount: this.state.amount,
      txDetails
    });
  }

  goToDashboard = () => {
    this.props.navigation.popToTop();
    this.props.navigation.replace('DashboardScreen', {
      accountDetails: this.accountDetails,
    });
  }

  cancelTx = () => {
    this.setState({ confirmDialog: true });
  }

  get titleBar() {
    return (
      <>
        <View style={styles.titleBar}>
          <View style={styles.titleBarContentLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={this.navigateBack}>
              <Icon
                name={'ios-arrow-back'}
                size={24}
                color={Colors.white}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBarContent}>
            <Text style={styles.titleBarTitle}>Confirm Deposit</Text>
          </View>
          <View style={styles.titleBarContentRight} />
        </View>
      </>
    );
  }

  get depositContent() {
    return (
      <>
        <View style={styles.card}>
          <Text style={styles.title}>
            Please confirm the amount to deposit
          </Text>
          <View style={styles.cardContent}>
            <View
              style={[
                styles.buttonStyle,
                styles.marginButtom,
                styles.noBackground,
              ]}>
              <Text style={[styles.buttonText3, styles.marginLeft]}>
                Amount
              </Text>
              <View style={[styles.rowFlex, styles.marginRight]}>
                <View
                  style={[
                    styles.columnFlex,
                    styles.marginLeft,
                    styles.centerAlign,
                  ]}>
                  <Text style={[styles.buttonText3]}>
                    {this.state.amount}
                  </Text>
                  <Text style={[styles.buttonText2, styles.greenText]}>
                    ~$
                    {WalletUtils.getAssetDisplayTextInUSD(
                      this.token,
                      this.state.amount,
                      this.exchangeRates,
                    )}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.buttonStyle,
                styles.marginButtom,
                styles.noBackground,
              ]}>
              <Text style={[styles.buttonText3, styles.marginLeft]}>
                Fee
              </Text>
              <View style={[styles.rowFlex, styles.marginRight]}>
                <View
                  style={[
                    styles.columnFlex,
                    styles.marginLeft,
                    styles.centerAlign,
                  ]}>
                  <Text style={[styles.buttonText3]}>0</Text>
                  <Text style={[styles.buttonText2, styles.greenText]}>
                    $0
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.buttonStyle,
                styles.marginButtom,
                styles.noBackground,
                styles.borderTop,
              ]}>
              <Text style={[styles.buttonText3, styles.marginLeft]}>
                Total
              </Text>
              <View style={[styles.rowFlex, styles.marginRight]}>
                <View
                  style={[
                    styles.columnFlex,
                    styles.marginLeft,
                    styles.centerAlign,
                  ]}>
                  <Text style={[styles.buttonText3]}>
                    {this.state.amount}
                  </Text>
                  <Text style={[styles.buttonText2, styles.greenText]}>
                    ~$
                    {WalletUtils.getAssetDisplayTextInUSD(
                      this.token,
                      this.state.amount,
                      this.exchangeRates,
                    )}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.cardFooter]}>
              <TouchableOpacity
                onPress={this.depositFunds.bind(this)}
                style={[styles.buttonStylePrimary, styles.halfButton]}>
                <Text style={styles.buttonText}>Deposit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.cancelTx.bind(this)}
                style={[styles.buttonStyleSecondary, styles.halfButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
        <SafeAreaView style={styles.wrapper}>
          <StatusBarColor
            backgroundColor={Colors.primary_bg}
            barStyle="light-content"
          />
          <KeyboardAvoidingView style={{flex: 1}}>
            <View style={styles.container}>
              {this.titleBar}
              <ScrollView style={styles.mainContentWrapper}>
                {this.depositContent}
              </ScrollView>
              <ConfirmDialog
                title={this.state.confirmDialogTitle}
                visible={this.state.confirmDialog}
                message={this.state.confirmDialogMessage}
                onDismiss={() => {
                  this.setState({confirmDialog: false});
                }}
                onOk={() => {
                  this.goToDashboard();
                  this.setState({confirmDialog: false});
                }}
              />
              <LoadingIndicator
                visible={this.state.isLoading}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}