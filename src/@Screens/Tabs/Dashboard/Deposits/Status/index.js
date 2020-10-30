/**
 * Modified By @name Sukumar_Abhijeet,
 */

import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, SafeAreaView,
    KeyboardAvoidingView, ScrollView, Image,Linking,
    BackHandler
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import StatusBarColor from '../../../../../@Components/status-bar-color';
import Colors from '../../../../../@Constants/Colors';
import styles from '../Home/styles';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import WalletService from '../../../../../@Services/wallet-service';
import StorageUtils from '../../../../../@Services/storage-utils';
import TransactionProcessing from '../../../../../@Components/TransactionProcess';
import PropTypes from 'prop-types';
import WalletUtils from '../../../../../@Services/wallet-utils';
import { moderateScale } from 'react-native-size-matters';
import { sendEmail } from '../../../../../@Services/email-service';
import Support from '../../../../../@Constants/Supports';
import Toast from 'react-native-simple-toast';
import apiServices from '../../../../../@Services/api-services';
import walletUtils from '../../../../../@Services/wallet-utils';
import AppHeader from '../../../../../@Components/AppHeader';

const {supportMail} = Support;

export default class DepositStatusScreen extends Component {
  
  static propTypes = {
      navigation:PropTypes.object.isRequired,
      route:PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props);
      if (this.props.route && this.props.route.params) {
          if (this.props.route.params.token)
              this.token = this.props.route.params.token;
          if (this.props.route.params.accountDetails)
              this.accountDetails = this.props.route.params.accountDetails;
          if (this.props.route.params.amount)
              this.state.amount = this.props.route.params.amount;
      }

      this.walletService = WalletService.getInstance();
  }
  
  state = {
      isLoading: true,
      errorOccured:false,
      transactionDetails:{}
  };

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
      this.loadData();
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  _handleBackButton = () =>{
      if(this.state.isLoading) return true;
      else return false;
  };

  loadData() {
      this.initiateTransaction();
      this.getExchangeRates();
  }

  initiateTransaction = () =>{
      const address =  walletUtils.createAddressFromPrivateKey(this.walletService.pk);
      const decimalForToken = WalletUtils.getDecimalValueForAsset(this.token);
      let weiUnit = Math.pow(10,decimalForToken);
      let Wei = (this.state.amount * weiUnit).toString();

      this.walletService.depositFundsToZkSync(this.token, this.state.amount)
          .then(async(txDetails) => {
              const [receipt,txCommit] = txDetails;
              const body = {
                  'walletAddress': address,
                  'txnType': 'deposit',
                  'amount': Wei,
                  'asset': this.token.toUpperCase(),
                  'status': receipt.executed ? 'complete' : 'pending',
                  'ethTxnId': txCommit.transactionHash,
              };
              apiServices.setTransactionDetailsWithServer(body)
                  .then(data=>{
                      console.log('Deposit',data);
                  })
                  .catch();
              this.setState({ transactionDetails:txCommit,isLoading: false });
          }).catch((err) => {
              console.log('Error',err);
              this.setState({isLoading: false,errorOccured:true});
          });
  }

  getExchangeRates = async () => {
      this.exchangeRates = await StorageUtils.exchangeRates();
  }

  navigateBack = () => { this.props.navigation.goBack(); }

  goToDepositFromEthScreen = (type) => {
      this.props.navigation.navigate('DepositEthScreen', {
          accountDetails: this.accountDetails,
          type
      });
  }

  goToDashboard = () => {
      this.props.navigation.navigate('Dashboard', {
          accountDetails: this.accountDetails,
      });
  }

  async openLink() {
      try {
          const url = this.walletService.getTxStatusUrl(this.state.transactionDetails.transactionHash);
          if (await InAppBrowser.isAvailable()) {
              await InAppBrowser.open(url, {
                  // iOS Properties
                  dismissButtonStyle: 'done',
                  preferredBarTintColor: Colors.white,
                  preferredControlTintColor: Colors.tintColor,
                  readerMode: false,
                  animated: true,
                  modalPresentationStyle: 'pageSheet',
                  modalTransitionStyle: 'coverVertical',
                  modalEnabled: true,
                  enableBarCollapsing: true,
                  // Android Properties
                  showTitle: true,
                  toolbarColor: Colors.primaryBg,
                  secondaryToolbarColor: 'white',
                  enableUrlBarHiding: true,
                  enableDefaultShare: true,
                  forceCloseOnRedirection: false,
                  // Animations
                  animations: {
                      startEnter: 'slide_in_right',
                      startExit: 'slide_out_left',
                      endEnter: 'slide_in_left',
                      endExit: 'slide_out_right',
                  },
                  headers: {
                      'my-custom-header': 'Track Status',
                  },
              });
          }
          else Linking.openURL(url);
      } catch (error) {
          console.log(error.message);
      }
  }

  openEmailLink = () =>{
      sendEmail(supportMail)
          .then(() => {
              console.log('Our email successful provided to device mail ');
          });
  };

  copyToClipboard = () =>{
      Clipboard.setString(supportMail);
      Toast.show('Email Copied to Clipboard',Toast.LONG);
  }


  get depositContent() {
      return (
          <>
              <View style={styles.card}>
                  <View style={[styles.marginAround]}>
                      <Image
                          source={require('../../../../../../assets/images/icons/check.png')}
                          style={styles.titleIcon}
                      />
                  </View>
                  <Text style={styles.title}>
            Your deposit transaction has been mined and will be processed
            after 1 confirmations. Click button below to track the progress
                  </Text>
                  <TouchableOpacity
                      onPress={() => { this.openLink(); }}
                      style={[styles.buttonStyleSecondary, styles.halfButton]}>
                      <Text style={styles.buttonText}>Track Status</Text>
                  </TouchableOpacity>
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
                                  ~$ {
                                          WalletUtils.getAssetDisplayTextInUSD(
                                              this.token,
                                              this.state.amount,
                                              this.exchangeRates,
                                          )
                                      }
                                  </Text>
                              </View>
                          </View>
                      </View>
                      <View style={[styles.cardFooter]}>
                          <TouchableOpacity
                              onPress={this.goToDashboard.bind(this)}
                              style={[styles.buttonStylePrimary]}>
                              <Text style={styles.buttonText}>Ok</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </>
      );
  }

  get errorContent() {
      return (
          <>
              <View style={styles.card}>
                  <Text style={styles.title}>
                    Please try after sometime. 
                  </Text>
                  <Text style={styles.title}>
                    If issue still persists, the please contact at  {supportMail}
                  </Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%'}}>
                      <TouchableOpacity
                          onPress={() => { this.openEmailLink(); }}
                          style={[styles.buttonStyleSecondary, styles.halfButton]}>
                          <Text style={styles.buttonText}>Send Email</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => { this.copyToClipboard(); }}
                          style={[styles.buttonStyleSecondary, styles.halfButton]}>
                          <Text style={styles.buttonText}>Copy Email</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{...styles.cardContent,marginTop:moderateScale(30)}}>
                      <View style={[styles.cardFooter]}>
                          <TouchableOpacity
                              onPress={this.goToDashboard.bind(this)}
                              style={[styles.buttonStylePrimary]}>
                              <Text style={styles.buttonText}>Visit Dashboard</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </>
      );
  }

  render() {
      const {isLoading,errorOccured} = this.state;
      if(isLoading)
          return <TransactionProcessing />;

      return (
          <SafeAreaView style={styles.wrapper}>
              <StatusBarColor
                  backgroundColor={Colors.primary_bg}
                  barStyle="light-content"
              />
              <KeyboardAvoidingView style={{flex: 1}}>
                  <View style={styles.container}>
                      <AppHeader headerTitle={errorOccured ? 'Transaction Failed' : 'Deposit Initiated'}  />
                      <ScrollView style={styles.mainContentWrapper}>
                          { !errorOccured && this.depositContent}
                          { errorOccured && this.errorContent}
                      </ScrollView>
                  </View>
              </KeyboardAvoidingView>
          </SafeAreaView>
      );
  }
}