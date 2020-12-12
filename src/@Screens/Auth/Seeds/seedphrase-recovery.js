import React, { Component } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
} from 'react-native';
import styles from './styles';
import WalletUtils from '../../../@Services/wallet-utils';
import WalletService from '../../../@Services/wallet-service';
import SortableGrid from '../../../@Components/sortable-grid';
import ConfirmDialog from '../../../@Components/confirm-dialog';
import ErrorDialog from '../../../@Components/error-dialog';
import LoadingIndicator from '../../../@Components/loading-indicator';
import StatusBarColor from '../../../@Components/status-bar-color';
import * as _ from 'lodash';
import Colors from '../../../@Constants/Colors';
import { moderateScale } from 'react-native-size-matters';

const WAIT_RECOVERWALLET = 'Please wait.. while we recover your wallet!';

export default class SeedPhraseRecoveryScreen extends Component {
  

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

  state = {
      saveButtonText: 'Save',
      resetButtonText: 'Reset',
      seedPhrase: [],
      confirmResetDialog: false,
      isLoading: false,
      loadingMessage: WAIT_RECOVERWALLET,
      isInvalidPhrase: false
  };


  _recoverWallet() {
      this.setState({ isLoading: true });
      setTimeout(()=>{this.privateKeyCreation();},300);
  }

  privateKeyCreation = () =>{
      WalletUtils.createAndStorePrivateKey(
          this.state.seedPhrase.join(' ').toLowerCase(),
          this.pin,
          this.accountDetails.email,
      ).then(() => {
          this._navigateToDashboard();
      }).catch(()=>{
          this.setState({ isLoading: false,isSeedPhraseValid:true });
      });
  }

  _navigateToDashboard() {
      WalletUtils.getPrivateKey(
          this.pin,
          this.accountDetails.email,
      ).then(pk => {
          const walletService = WalletService.getInstance();
          walletService.setPk(pk);
          this.setState({
              isLoading: false,
          });
          this.props.navigation.navigate('App',{ accountDetails: this.accountDetails });
      }).catch(()=>{
          this.setState({ isLoading: false,isSeedPhraseValid:true });
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
          return this.setState({isInvalidPhrase: true});
      }
      this._recoverWallet();
  }

  _onResetButtonClick() {
      this.state.seedPhrase = _.map(this.state.seedPhrase, () => '');
  }

  _getSortableGrid() {
      return (
          <SortableGrid
              itemHeight={Dimensions.get('window').height / 12}
              itemWidth={moderateScale(150)}
              itemsPerRow={2}
              onDragRelease={itemOrder =>
                  (this.seedPhraseOrder = itemOrder.itemOrder)
              }
              style={[styles.phrasesWrapper]}>
              {this.state.seedPhrase.map((phrase, index) => (
                  <View inactive={true} key={index} style={styles.phraseItem}>
                      <View style={styles.phraseItemWrapper}>
                          <Text style={styles.phraseIndex}>{index + 1}</Text>
                      </View>
                      <TextInput
                          autoCapitalize={'none'}
                          onChangeText={text => { this.state.seedPhrase[index] = text; this.setState({  }); }}
                          style={styles.seedPhraseInput}
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
              <ScrollView style={{flex: 1}}>
                  <View style={styles.container}>
                      <Text style={styles.mainTitle}>Recover Account</Text>
                      <View style={styles.header}>
                          <Text style={styles.title}>Disclaimer</Text>
                          <Text style={styles.subTitle}>
                  Please enter your 12 word mnemonic seed phrase in the
                  order to recover your wallet.
                          </Text>
                      </View>
                      <View style={{marginLeft:moderateScale(22)}}>
                          {this._getSortableGrid()}
                      </View>
                      
                      <ConfirmDialog
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
                          title={'Reset Mnemonic Phrase'}
                          visible={this.state.confirmResetDialog}
                      />
                      <LoadingIndicator
                          message={this.state.loadingMessage}
                          visible={this.state.isLoading}
                      />
                      <ErrorDialog
                          message={'Please ensure you have entered all 12 words correctly!!'}
                          onDismiss={() => {
                              this.setState({isInvalidPhrase: false});
                          }}
                          title={'Invalid seed phrase'}
                          visible={this.state.isInvalidPhrase}
                      />
                  </View>
              </ScrollView>
              <View style={{alignSelf:'center'}}>
                  <TouchableOpacity
                      onPress={this._onSaveButtonClick.bind(this)}
                      style={styles.primaryButtonStyle}>
                      <Text style={styles.primaryButtonText}>
                          {this.state.saveButtonText}
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {
                          this.setState({confirmResetDialog: true});
                      }}
                      style={styles.secondaryButtonStyle}>
                      <Text style={styles.secondaryButtonText}>
                          {this.state.resetButtonText}
                      </Text>
                  </TouchableOpacity>
              </View>
          </SafeAreaView>
      );
  }
}
