import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
} from 'react-native';
import styles from '../stylesheets/seedphrase';
import WalletUtils from '../services/wallet-utils';
import WalletService from '../services/wallet-service';
import SortableGrid from '../components/sortable-grid';
import ConfirmDialog from '../components/confirm-dialog';
import ErrorDialog from '../components/error-dialog';
import LoadingIndicator from '../components/loading-indicator';
import * as _ from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Colors from '../constants/Colors';
const WAIT_RECOVERWALLET = 'Please wait.. while we recover your wallet!';
import StatusBarColor from '../components/status-bar-color';

export default class SeedPhraseRecoveryScreen extends Component {
  
  state = {
    saveButtonText: 'Save',
    resetButtonText: 'Reset',
    seedPhrase: [],
    confirmResetDialog: false,
    isLoading: false,
    loadingMessage: WAIT_RECOVERWALLET,
    isInvalidPhrase: false
  };

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
      if (this.props.route.params.pin)
        this.pin = this.props.route.params.pin;
    }

    _.times(12, () => this.state.seedPhrase.push(''));
  }

  _recoverWallet() {
    this.setState({ isLoading: true });
    return WalletUtils.createAndStorePrivateKey(
      this.state.seedPhrase.join(' ').toLowerCase(),
      this.pin,
      this.accountDetails.email,
    ).then(() => {
      this._navigateToDashboard();
    });
  }

  _navigateToDashboard() {
    return WalletUtils.getPrivateKey(
      this.pin,
      this.accountDetails.email,
    ).then(pk => {
      const walletService = WalletService.getInstance();
      walletService.setPk(pk);
      this.setState({
        isLoading: false,
      });
      this.props.navigation.replace('DashboardScreen', {
        accountDetails: this.accountDetails,
      });
    }); 
  }

  _onSaveButtonClick() {
    let isSeedPhraseValid = true;
    for (var i = 0; i < this.state.seedPhrase.length; ++i) {
      phrase = this.state.seedPhrase[i];
      if (!phrase || phrase.length < 3) {
        isSeedPhraseValid = false;
        break;
      }
    }
    if (!isSeedPhraseValid) {
      return this.setState({isInvalidPhrase: true})
    }
    this._recoverWallet();
  }

  _onResetButtonClick() {
    this.state.seedPhrase = _.map(this.state.seedPhrase, () => '');
  }

  _getSortableGrid() {
    return (
      <SortableGrid
        style={styles.phrasesWrapper}
        itemWidth={Dimensions.get('window').width / 2}
        itemHeight={Dimensions.get('window').height / 12}
        itemsPerRow={2}
        onDragRelease={itemOrder =>
          (this.seedPhraseOrder = itemOrder.itemOrder)
        }>
        {this.state.seedPhrase.map((phrase, index) => (
          <View style={styles.phraseItem} key={index} inactive={true}>
            <View style={styles.phraseItemWrapper}>
              <Text style={styles.phraseIndex}>{index + 1}</Text>
            </View>
            <TextInput
              style={styles.seedPhraseInput}
              onChangeText={text => { this.state.seedPhrase[index] = text; this.setState({  }); }}
              value={this.state.seedPhrase[index]}
            />
          </View>
        ))}
      </SortableGrid>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <StatusBarColor
          backgroundColor={Colors.primary_bg}
          barStyle="light-content"
        />
        <KeyboardAvoidingView style={{flex: 1}}>
          <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <Text style={styles.mainTitle}>Recover Account</Text>
              <View style={styles.header}>
                <Text style={styles.title}>Disclaimer</Text>
                <Text style={styles.subTitle}>
                  Please enter your 12 word mnemonic seed phrase in the
                  order to recover your wallet.
                </Text>
              </View>
              {this._getSortableGrid()}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.primaryButtonStyle}
                  onPress={this._onSaveButtonClick.bind(this)}>
                  <Text style={styles.primaryButtonText}>
                    {this.state.saveButtonText}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryButtonStyle}
                  onPress={() => {
                    this.setState({confirmResetDialog: true});
                  }}>
                  <Text style={styles.secondaryButtonText}>
                    {this.state.resetButtonText}
                  </Text>
                </TouchableOpacity>
              </View>
              <ConfirmDialog
                title={'Reset Mnemonic Phrase'}
                visible={this.state.confirmResetDialog}
                message={
                  'Are you sure you want to reset the entered mnemonic phrase?'
                }
                onDismiss={() => {
                  this.setState({confirmResetDialog: false});
                }}
                onOk={() => {
                  this._onResetButtonClick();
                  this.setState({confirmResetDialog: false});
                }}
              />
              <LoadingIndicator
                visible={this.state.isLoading}
                message={this.state.loadingMessage}
              />
              <ErrorDialog
                title={'Invalid seed phrase'}
                visible={this.state.isInvalidPhrase}
                message={'Please ensure you have entered all 12 words!'}
                onDismiss={() => {
                  this.setState({isInvalidPhrase: false});
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
