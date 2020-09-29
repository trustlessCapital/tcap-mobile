import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarColor from '../components/status-bar-color';
import Colors from '../constants/Colors';
import styles from '../stylesheets/deposit-home';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import WalletService from '../services/wallet-service';
import StorageUtils from '../services/storage-utils';
import LoadingIndicator from '../components/loading-indicator';

export default class DepositStatusScreen extends Component {
  state = {
    isLoading: true
  }

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
      if (this.props.route.params.amount)
        this.state.amount = this.props.route.params.amount;
      if (this.props.route.params.transactionDetails)
        this.state.transactionDetails = this.props.route.params.transactionDetails;
    }

    this.walletService = WalletService.getInstance();
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

  goToDepositFromEthScreen = (type) => {
    this.props.navigation.push('DepositEthScreen', {
      accountDetails: this.accountDetails,
      type
    });
  }

  goToDashboard = () => {
    this.props.navigation.popToTop();
    this.props.navigation.replace('DashboardScreen', {
      accountDetails: this.accountDetails,
    });
  }

  async openLink() {
    try {
      const url = this.walletService.getTxStatusUrl(this.transactionDetails.txId);
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
      else Linking.openURL(url)
    } catch (error) {
      console.log(error.message)
    }
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
            <Text style={styles.titleBarTitle}>Deposit Initiated</Text>
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
          <View style={[styles.marginAround]}>
            <Image
              style={styles.titleIcon}
              source={require('../../assets/images/icons/check.png')}
            />
          </View>
          <Text style={styles.title}>
            Your deposit transaction has been mined and will be processed
            after 1 confirmations. Click button below to track the progress
          </Text>
          <TouchableOpacity
            onPress={() => { this.openLink() }}
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
              <LoadingIndicator visible={this.state.isLoading} />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}