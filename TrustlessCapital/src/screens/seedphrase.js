import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import styles from '../stylesheets/seedphrase';
import WalletUtils from '../services/wallet-utils';
import WalletService from '../services/wallet-service';
import SortableGrid from '../components/sortable-grid';
import ConfirmDialog from '../components/confirm-dialog';
import LoadingIndicator from '../components/loading-indicator';
import ErrorDialog from '../components/error-dialog';
import * as _ from 'lodash';
import { preventScreenCaptureAsync, allowScreenCaptureAsync } from 'expo-screen-capture';

const WAIT_SEEDPHRASE = 'Please wait.. while we create your seed phrase!';
const WAIT_CREATEWALLET = 'Please wait.. while we create your wallet!';
export default class SeedPhraseScreen extends Component {
  
  state = {
    saveButtonText: 'Save',
    resetButtonText: 'Reset',
    seedPhrase: [],
    isVerificationMode: false,
    seedPhraseText: '',
    confirmResetDialog: false,
    invalidOrder: false,
    isLoading: true,
    loadingMessage: WAIT_SEEDPHRASE
  };

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
      if (this.props.route.params.pin)
        this.pin = this.props.route.params.pin;
    }
    this._generateMnemonic();
  }

  componentDidMount() {
    preventScreenCaptureAsync(); 
  }

  componentWillUnmount() {
    allowScreenCaptureAsync(); 
  }

  _shuffleSeedPhrase(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  _generateMnemonic() {
    this.setState({loadingMessage: WAIT_SEEDPHRASE});
    WalletUtils.createMnemonic().then((mnemonic) => {
      let seedPhrase = mnemonic.split(' ');
      this.state.seedPhrase = seedPhrase;
      this.setState({ seedPhrase, isLoading: false });
    });
  }

  _checkReshuffledSeedPhrase() {
    if (!this.seedPhraseOrder) {
      this.setState({ invalidOrder: true });
      return;
    }
    let seedPhraseUserOrder = [];
    this.seedPhraseOrder.forEach((o) => {
      seedPhraseUserOrder.push(this.state.seedPhrase[o.key]);
    });
    if (seedPhraseUserOrder.join(' ') == this.originalSeedPhrase.join(' ')) {
      this.setState({ isLoading: true, loadingMessage: WAIT_CREATEWALLET });
      return WalletUtils.createAndStorePrivateKey(
        this.originalSeedPhrase.join(' '),
        this.pin,
        this.accountDetails.email,
      ).then(() => {
        this.setState({isLoading: true});
        return WalletUtils.getPrivateKey(
          this.pin,
          this.accountDetails.email,
        ).then(pk => {
          const walletService = WalletService.getInstance();
          walletService.getSyncWallet(pk).then(() => {
            walletService.getAccountState(pk).then((accountState) => {
              console.log('ACCOUNT STATE ::: ', accountState);
              this.setState({
                isLoading: false,
              });
              this.props.navigation.replace('DashboardScreen', {
                accountDetails: this.accountDetails,
                pk: pk,
              });
            });
          });
        });
      });
    } else {
      this.setState({invalidOrder: true});
      console.log('FALSE');
    }
  }

  _onSaveButtonClick() {
    if (this.state.isVerificationMode) {
      this._checkReshuffledSeedPhrase();
    } else {
      this.originalSeedPhrase = _.clone(this.state.seedPhrase);
      this._shuffleSeedPhrase(this.state.seedPhrase)
      this.setState({isVerificationMode: true, saveButtonText: 'Done'});
    }
  }

  _onResetButtonClick() {
    this._generateMnemonic();
    if (this.state.isVerificationMode) {
      this.setState({isVerificationMode: false});
    }
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
          <View
            style={this.state.isVerificationMode? styles.phraseItemWithBorder: styles.phraseItem}
            key={index}
            inactive={!this.state.isVerificationMode}>
            {!this.state.isVerificationMode ? (
              <View style={styles.phraseItemWrapper}>
                <Text style={styles.phraseIndex}>{index + 1}</Text>
              </View>
            ) : null}
            <Text style={styles.phraseText}>{phrase}</Text>
          </View>
        ))}
      </SortableGrid>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.mainTitle}>
              {this.state.isVerificationMode ? 'Verify ' : ''}Mnemonic Seed Phrase
            </Text>
            <View style={styles.header}>
              <Text style={styles.title}>Disclaimer</Text>
              <Text style={styles.subTitle}>
                {this.state.isVerificationMode
                  ? 'Press and hold each shuffled phrase and reorder it correctly to your 12 word mnemonic seed phrase to verify.'
                  : 'Please note down your 12 word mnemonic seed phrase in the displayed order and save it in a secure manner.'}
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
                onPress={() => {this.setState({confirmResetDialog: true});}}>
                <Text style={styles.secondaryButtonText}>
                  {this.state.resetButtonText}
                </Text>
              </TouchableOpacity>
            </View>
            <ConfirmDialog
              title={'Reset Mnemonic Phrase'}
              visible={this.state.confirmResetDialog}
              message={'Are you sure you want to reset mnemonic phrase?'}
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
              title={'Invalid seed phrase order'}
              visible={this.state.invalidOrder}
              message={'Please ensure the correct order of your 12 word seed phrase!'}
              onDismiss={() => {
                this.setState({invalidOrder: false});
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
