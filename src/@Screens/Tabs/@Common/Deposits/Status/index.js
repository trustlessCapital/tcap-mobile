/**
 * Modified By @name Sukumar_Abhijeet,
 */

import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, SafeAreaView,
    KeyboardAvoidingView, ScrollView, Image,Linking,
    BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarColor from '../../../../../@Components/status-bar-color';
import Colors from '../../../../../@Constants/Colors';
import styles from '../Home/styles';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import WalletService from '../../../../../@Services/wallet-service';
import StorageUtils from '../../../../../@Services/storage-utils';
import TransactionProcessing from './TransactionProcess';
import PropTypes from 'prop-types';

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
      this.walletService.depositFundsToZkSync(this.token, this.state.amount).then((txDetails) => {
          this.setState({ transactionDetails:txDetails,isLoading: false });
      }).catch(() => {
          this.setState({isLoading: false});
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
          const url = this.walletService.getTxStatusUrl(this.state.transactionDetails.txId);
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
                      <Text style={styles.titleBarTitle}>Deposit Initiated</Text>
                  </View>
                  <View style={styles.titleBarContentRight} />
              </View>
          </>
      );
  }

  get depositContent() {
      console.log('transactionDetails',this.state.transactionDetails);
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
                    $881.25
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

  render() {
    
      if(this.state.isLoading)
          return <TransactionProcessing />;
      return (
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
                  </View>
              </KeyboardAvoidingView>
          </SafeAreaView>
      );
  }
}