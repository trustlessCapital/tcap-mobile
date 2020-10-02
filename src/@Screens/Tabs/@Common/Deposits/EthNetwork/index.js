import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarColor from '../../../../../@Components/status-bar-color';
import Colors from '../../../../../@Constants/Colors';
import styles from '../Home/styles';
import ConfirmDialog from '../../../../../@Components/confirm-dialog';
import LoadingIndicator from '../../../../../@Components/loading-indicator';
import StorageUtils from '../../../../../@Services/storage-utils';
import WalletUtils from '../../../../../@Services/wallet-utils';

export default class DepositEthScreen extends Component {
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

  goToDepositConfirmScreen = () => {
    this.props.navigation.push('DepositConfirmScreen', {
      accountDetails: this.accountDetails,
      amount: this.state.amount,
      token: this.token
    });
  }

  goToDashboard = () => {
    this.props.navigation.navigate('App',{
      screen:'Dashboard',
      params: { accountDetails: this.accountDetails },
    })
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
            <Text style={styles.titleBarTitle}>Deposit Funds</Text>
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
                  style={styles.inputText}
                  placeholder={'Enter Amount'}
                  placeholderTextColor={Colors.tintColorGreyedDark}
                  onChangeText={text => {
                    this.state.amount = text.replace(/[^0-9\.]/g, '');
                    this.setState({});
                  }}
                  keyboardType={'phone-pad'}
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
                  ~${WalletUtils.getAssetDisplayTextInUSD(this.token, this.state.amount, this.exchangeRates)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={this.goToDepositConfirmScreen.bind(this)}
              style={styles.buttonStyleSecondary}>
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
          <KeyboardAvoidingView style={{flex: 1}}>
            <View style={styles.container}>
              {this.titleBar}
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