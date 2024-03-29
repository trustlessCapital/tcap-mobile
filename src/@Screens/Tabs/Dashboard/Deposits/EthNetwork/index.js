/**
 * Modified By @name Sukumar_Abhijeet,
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import StatusBarColor from '../../../../../@Components/status-bar-color';
import Colors from '../../../../../@Constants/Colors';
import styles from '../Home/styles';
import ConfirmDialog from '../../../../../@Components/confirm-dialog';
import LoadingIndicator from '../../../../../@Components/loading-indicator';
import WalletUtils from '../../../../../@Services/wallet-utils';
import PropTypes from 'prop-types';
import AppHeader from '../../../../../@Components/AppHeader';
import { connect } from 'react-redux';
import WalletService from '../../../../../@Services/wallet-service';
import walletUtils from '../../../../../@Services/wallet-utils';

class DepositEthScreen extends Component {

  static propTypes = {
      exchangeRates:PropTypes.array.isRequired,
      navigation:PropTypes.object.isRequired,
      route:PropTypes.object.isRequired,
      selectedCurrency:PropTypes.object.isRequired,
  };
  
  constructor(props) {
      super(props);
      if (this.props.route && this.props.route.params) {
          if (this.props.route.params.accountDetails)
              this.accountDetails = this.props.route.params.accountDetails;
          if (this.props.route.params.token)
              this.token = this.props.route.params.token;
      }
      this.walletService = WalletService.getInstance();
      this.accAddress = walletUtils.createAddressFromPrivateKey(this.walletService.pk);
  }

  state = {
      isLoading: false,
      confirmDialog: false,
      confirmDialogTitle: 'Cancel Deposit Funds',
      confirmDialogMessage: 'Are you sure you want to cancel the deposit funds transaction?',
  }

  navigateBack = () => { this.props.navigation.goBack(); }

  goToDepositConfirmScreen = () => {
      this.props.navigation.navigate('DepositConfirmScreen', {
          accountDetails: this.accountDetails,
          amount: this.state.amount,
          token: this.token
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

  get depositContent() {
      return (
          <>
              <View style={styles.card}>
                  <View style={styles.cardContent}>
                      <Text style={styles.inputLabel}>Amount / Asset</Text>
                      <View
                          onPress={this.openCountryPicker}
                          style={[
                              styles.buttonStyle,
                              styles.marginButtom,
                              styles.columnFlex,
                          ]}>
                          <View
                              style={[
                                  styles.rowFlex,
                                  styles.centerAlign,
                                  {marginBottom: 10},
                              ]}>
                              <TextInput
                                  keyboardType={'decimal-pad'}
                                  onChangeText={text => {
                                      this.state.amount = text.replace(/[^0-9\.]/g, '');
                                      this.setState({});
                                  }}
                                  placeholder={'Enter Amount'}
                                  placeholderTextColor={Colors.tintColorGreyedDark}
                                  style={styles.inputText}
                                  value={this.state.amount}
                              />
                              <View style={[styles.rowFlex, styles.marginRight]}>
                                  <Text style={[styles.buttonText3]}>{this.token.toUpperCase()}</Text>
                              </View>
                          </View>
                          <View
                              style={[
                                  styles.rowFlex,
                                  styles.borderTop,
                                  {marginHorizontal: 10},
                              ]}>
                              <Text
                                  style={[
                                      styles.buttonText2,
                                      styles.greenText,
                                      {marginTop: 10, width: '100%'},
                                  ]}>
                  ~ {this.props.selectedCurrency.symbol}{WalletUtils.getAssetDisplayTextInSelectedCurrency(this.token,this.state.amount, this.props.exchangeRates)}
                              </Text>
                          </View>
                      </View>
                      <TouchableOpacity
                          disabled={this.state.amount === undefined}
                          onPress={this.goToDepositConfirmScreen.bind(this)}
                          style={{...styles.buttonStyleSecondary,opacity:this.state.amount === undefined ? 0.4:1}}>
                          <Text style={styles.buttonText}>Deposit</Text>
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
              <SafeAreaView style={styles.wrapper}>
                  <StatusBarColor
                      backgroundColor={Colors.primary_bg}
                      barStyle="light-content"
                  />
                  <View style={styles.container}>
                      <AppHeader headerTitle={'Deposit Funds'}  />
                      <ScrollView style={styles.mainContentWrapper}>
                          {this.depositContent}
                      </ScrollView>
                      <View style={styles.cardFooter}>
                          <TouchableOpacity
                              onPress={this.cancelTx.bind(this)}
                              style={[styles.buttonStylePrimary]}>
                              <Text style={styles.buttonText}>Cancel</Text>
                          </TouchableOpacity>
                      </View>
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
              </SafeAreaView>
          </>
      );
  }
}

function mapStateToProps(state){
    return{
        selectedCurrency : state.currency.selectedCurrency,
        exchangeRates : state.dashboard.exchangeRates,
    };
}

export default connect(mapStateToProps)(DepositEthScreen);