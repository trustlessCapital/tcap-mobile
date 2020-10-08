/**
 * Modified By @name Sukumar_Abhijeet,
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarColor from '../../../../../@Components/status-bar-color';
import Colors from '../../../../../@Constants/Colors';
import styles from '../Home/styles';
import ConfirmDialog from '../../../../../@Components/confirm-dialog';
import LoadingIndicator from '../../../../../@Components/loading-indicator';
import PropTypes from 'prop-types';
import StorageUtils from '../../../../../@Services/storage-utils';
import WalletUtils from '../../../../../@Services/wallet-utils';

export default class DepositConfirmScreen extends Component {

  static propTypes = {
      navigation:PropTypes.object.isRequired,
      route:PropTypes.object.isRequired,
  };

  constructor(props) {
      console.log('DepositConfirmScreen');
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

  state = {
      isLoading: true,
      confirmDialog: false,
      confirmDialogTitle: 'Cancel Deposit Funds',
      confirmDialogMessage: 'Are you sure you want to cancel the deposit funds transaction?',
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
      });
  }

  getExchangeRates = async () => {
      this.exchangeRates = await StorageUtils.exchangeRates();
  }

  navigateBack = () => { this.props.navigation.goBack(); }

  depositFunds = () => {
      this.goToDepositStatusScreen();
  }

  goToDepositStatusScreen = () => {
      this.props.navigation.navigate('DepositStatusScreen', {
          accountDetails: this.accountDetails,
          amount: this.state.amount,
          token : this.token
      });
  }

  goToDashboard = () => {
      this.props.navigation.navigate('Dashboard', {
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
                          onPress={this.navigateBack}
                          style={styles.backButton}>
                          <Icon
                              color={Colors.white}
                              name={'ios-arrow-back'}
                              size={24}
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
                              message={this.state.confirmDialogMessage}
                              onDismiss={() => {
                                  this.setState({confirmDialog: false});
                              }}
                              onOk={() => {
                                  this.goToDashboard();
                                  this.setState({confirmDialog: false});
                              }}
                              title={this.state.confirmDialogTitle}
                              visible={this.state.confirmDialog}
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