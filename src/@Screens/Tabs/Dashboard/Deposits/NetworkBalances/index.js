/**
 * Modified By @name Sukumar_Abhijeet,
 */

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';
import StatusBarColor from '../../../../../@Components/status-bar-color';
import Colors from '../../../../../@Constants/Colors';
import styles from '../Home/styles';
import ConfirmDialog from '../../../../../@Components/confirm-dialog';
import LoadingIndicator from '../../../../../@Components/loading-indicator';
import WalletService from '../../../../../@Services/wallet-service';
import StorageUtils from '../../../../../@Services/storage-utils';
import apiServices from '../../../../../@Services/api-services';
import walletUtils from '../../../../../@Services/wallet-utils';
import PropTypes from 'prop-types';
import ErrorDialog from '../../../../../@Components/error-dialog';
import AppHeader from '../../../../../@Components/AppHeader';
import { connect } from 'react-redux';

class DepositEthBalanceScreen extends Component {
    static propTypes = {
        navigation:PropTypes.object.isRequired,
        route:PropTypes.object.isRequired,
        selectedCurrency:PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        if (this.props.route && this.props.route.params) {
            if (this.props.route.params.accountDetails)
                this.accountDetails = this.props.route.params.accountDetails;
            if (this.props.route.params.pk) this.pk = this.props.route.params.pk;
        }
    }

  state = {
      inSufficientEth : false,
      ethBalance: [],
      isLoading: true,
      confirmDialog: false,
      confirmDialogTitle: 'Cancel Deposit Funds',
      confirmDialogMessage: 'Are you sure you want to cancel the deposit funds transaction?',
  }

  componentDidMount() {
      this.loadData();
  }

  loadData() {
      let promises = [this.fetchEtheriumBalance(), this.getExchangeRates()];
      this.state.isLoading = true;
      Promise.all(promises).then(() => {
          this.setState({isLoading: false});
      }).catch(() => {
          // Show toast in case of any error
          this.setState({isLoading: false});
      });
  }

  getExchangeRates = async () => {
      this.exchangeRates = await StorageUtils.exchangeRates();
  }

  fetchEtheriumBalance = async () => {
      const address = await WalletService.getInstance().getEtheriumAddress();
      await apiServices.getEtheriumBalance(address).then(ethBalance => {
          this.state.ethBalance = ethBalance;
      });
  }

  navigateBack = () => { this.props.navigation.goBack(); }

  goToDepositFromEthScreen = async(token) => {
      const allowDeposit = await  this.checkSuffucientEth();
      if(allowDeposit)
          this.props.navigation.navigate('DepositEthScreen', {
              accountDetails: this.accountDetails,
              pk: this.pk,
              token,
          });
      else this.setState({inSufficientEth:true});
  }

  goToDashboard = () => {
      this.props.navigation.navigate('Dashboard', {
          accountDetails: this.accountDetails,
          pk: this.pk, 
      });
  }

  checkSuffucientEth = (symbol = 'ETH') =>{
      let result = this.state.ethBalance.find(x => x.symbol.toUpperCase() === symbol);
      if(result)
      {
          const ETH =   walletUtils.getAssetDisplayText(result.symbol,result.value);
          if(ETH > 0.0002) return true;
          else return false;
      }
      else return false;
  };

  cancelTx = () => {
      this.setState({ confirmDialog: true });
  }


  checkNoBalance = () =>{
      const {ethBalance,isLoading} = this.state;
      if(!isLoading)
      {
          const sum = parseInt(ethBalance.map(item => item.value).reduce((prev, curr) => prev + curr, 0));
          if(!sum)
              return <Text style={styles.title}>No Balance is found</Text>;
          else return null;
      }
      return null;
  }

  get depositContent() {
      return (
          <>
              <View style={styles.card}>
                  <Text style={styles.title}>
            Choose from your balances in Ethereum Main Network
                  </Text>
                  <View style={styles.cardContent}>
                      {
                          this.state.ethBalance.map(
                              (balanceObj, index) =>
                                  balanceObj.value != 0 && (
                                      <TouchableOpacity
                                          key={index}
                                          onPress={() => {
                                              this.goToDepositFromEthScreen(balanceObj.symbol);
                                          }}
                                          style={[styles.buttonStyle, styles.marginButtom]}>
                                          <Text style={[styles.buttonText3, styles.marginLeft]}>
                                              {balanceObj.symbol.toUpperCase()}
                                          </Text>
                                          <View style={[styles.rowFlex, styles.marginRight]}>
                                              <View
                                                  style={[
                                                      styles.columnFlex,
                                                      styles.marginLeft,
                                                      styles.centerAlign,
                                                  ]}>
                                                  <Text style={[styles.buttonText3]}>
                                                      {walletUtils.getAssetDisplayText(
                                                          balanceObj.symbol,
                                                          balanceObj.value,
                                                      )}
                                                  </Text>
                                                  <Text
                                                      style={[styles.buttonText2, styles.greenText]}>
                                                      {this.props.selectedCurrency.symbol}
                                                      {walletUtils.getAssetDisplayTextInSelectedCurrency(
                                                          balanceObj.symbol,
                                                          walletUtils.getAssetDisplayText(
                                                              balanceObj.symbol,
                                                              balanceObj.value,
                                                          ),
                                                          this.exchangeRates,
                                                      )}
                                                  </Text>
                                              </View>
                                          </View>
                                      </TouchableOpacity>
                                  ),
                          )
                      }
                      {this.checkNoBalance()}
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
                              message={'Refreshing Balance..'}
                              visible={this.state.isLoading}
                          />
                          <ErrorDialog
                              message={'Not enough ETH to make transaction'}
                              onDismiss={() => {
                                  this.setState({inSufficientEth: false});
                              }}
                              title={'Insufficient ETH'}
                              visible={this.state.inSufficientEth}
                          />
                      </View>
                  </KeyboardAvoidingView>
              </SafeAreaView>
          </>
      );
  }
}

function mapStateToProps(state){
    return{
        selectedCurrency : state.currency.selectedCurrency,
    };
}

export default connect(mapStateToProps)(DepositEthBalanceScreen);