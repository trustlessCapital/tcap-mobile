import React, { Component } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import styles from './styles';
import WalletUtils from '../../../@Services/wallet-utils';
import WalletService from '../../../@Services/wallet-service';
// import SortableGrid from '../../../@Components/sortable-grid';
import ConfirmDialog from '../../../@Components/confirm-dialog';
import LoadingIndicator from '../../../@Components/loading-indicator';
import ErrorDialog from '../../../@Components/error-dialog';
import * as _ from 'lodash';
import { preventScreenCaptureAsync, allowScreenCaptureAsync } from 'expo-screen-capture';
import APIService from '../../../@Services/api-services';
import SecurityServices from '../../../@Services/security';
import StatusBarColor from '../../../@Components/status-bar-color';
import Colors from '../../../@Constants/Colors';
import { moderateScale } from 'react-native-size-matters';

const WAIT_SEEDPHRASE = 'Please wait.. while we create your seed phrase!';
const WAIT_CREATEWALLET = 'Please wait.. while we create your wallet!';
export default class SeedPhraseScreen extends Component {

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

  state = {
      saveButtonText: 'Save',
      resetButtonText: 'Reset',
      seedPhrase: [],
      isVerificationMode: false,
      seedPhraseText: '',
      confirmResetDialog: false,
      invalidOrder: false,
      isLoading: true,
      loadingMessage: WAIT_SEEDPHRASE,
      randomSeed1 : '',
      randomSeed4 : '',
      randomSeed7 : '',
      randomSeed10 : '',
      randomSeed12 : '',
  };

  componentDidMount() {
      preventScreenCaptureAsync(); 
  }

  componentWillUnmount() {
      allowScreenCaptureAsync(); 
  }

  //   _shuffleSeedPhrase(array) {
  //       for (let i = array.length - 1; i > 0; i--) {
  //           const j = Math.floor(Math.random() * (i + 1));
  //           [array[i], array[j]] = [array[j], array[i]];
  //       }
  //   }

  _generateMnemonic() {
      this.setState({loadingMessage: WAIT_SEEDPHRASE});
      WalletUtils.createMnemonic().then((mnemonic) => {
          let seedPhrase = mnemonic.split(' ');
          this.state.seedPhrase = seedPhrase;
          this.setState({ seedPhrase, isLoading: false });
      });
  }

  _checkReshuffledSeedPhrase() {

      const {
          randomSeed1,
          randomSeed4,
          randomSeed7,
          randomSeed10,
          randomSeed12
      } = this.state;
    
      const originalSeed1 = this.originalSeedPhrase[0];
      const originalSeed4 = this.originalSeedPhrase[3];
      const originalSeed7 = this.originalSeedPhrase[6];
      const originalSeed10 = this.originalSeedPhrase[9];
      const originalSeed12 = this.originalSeedPhrase[11];

      if(originalSeed1 === randomSeed1.toLowerCase() && originalSeed4 === randomSeed4.toLowerCase() && originalSeed7 === randomSeed7.toLowerCase() && originalSeed10 === randomSeed10.toLowerCase() && originalSeed12 === randomSeed12.toLowerCase())
      {
          this.setState({ isLoading: true, loadingMessage: WAIT_CREATEWALLET });
          return WalletUtils.createAndStorePrivateKey(
              this.originalSeedPhrase.join(' '),
              this.pin,
              this.accountDetails.email,
          ).then(() => {
              APIService.mnemonicGenerated(
                  this.accountDetails.email,
                  this.accountDetails.phoneNumber,
              ).then(accountDetails => {
                  SecurityServices.storeAccountDetails(accountDetails, this.pin).then(() => {
                      this.accountDetails = accountDetails;
                      this._navigateToDashboard();
                  });
              });
          });
      }
      else
      {
          this.setState({invalidOrder: true});
      }
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
          this.props.navigation.navigate('App',{ accountDetails: this.accountDetails });
      }); 
  }

  _onSaveButtonClick() {
      if (this.state.isVerificationMode) {
          this._checkReshuffledSeedPhrase();
      } else {
          this.originalSeedPhrase = _.clone(this.state.seedPhrase);
          //   this._shuffleSeedPhrase(this.state.seedPhrase);
          this.setState({isVerificationMode: true, saveButtonText: 'Done'});
      }
  }

  _onResetButtonClick() {
      this._generateMnemonic();
      if (this.state.isVerificationMode) {
          this.setState({isVerificationMode: false});
      }
  }

  returnRandomInputText = (phrase,index) =>{
      const {
          randomSeed1,randomSeed4,randomSeed7,
          randomSeed10,randomeSeed12
      } = this.state;
      const presentValue = index+1;
      if(presentValue === 1 || presentValue === 4 || presentValue === 7 || presentValue === 10 || presentValue === 12)
          return (
              <TextInput
                  autoCapitalize={'none'}
                  onChangeText={text => { 
                      presentValue === 1 ? this.setState({randomSeed1:text}) : 
                          presentValue === 4  ?  this.setState({randomSeed4:text}) : 
                              presentValue === 7 ? this.setState({randomSeed7:text}) : 
                                  presentValue === 10 ? this.setState({randomSeed10:text}) : 
                                      this.setState({randomSeed12:text});
                  }}
                  style={styles.seedPhraseInput}
                  value={
                      presentValue === 1 ? randomSeed1 :
                          presentValue === 4  ?  randomSeed4 :
                              presentValue === 7 ? randomSeed7 :
                                  presentValue === 10 ? randomSeed10 :
                                      randomeSeed12
                  }
              />
          );
      return <Text style={styles.phraseText}>{phrase}</Text>;
  }

  _getSortableGrid() {
      const {seedPhrase,isVerificationMode} = this.state;
      if(isVerificationMode)
      {
          return(
              <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
                  {
                      seedPhrase.map((phrase,index)=>(
                          <View
                              key={index}
                              style={styles.phraseItem}>
                              <View style={styles.phraseItemWrapper}>
                                  <Text style={styles.phraseIndex}>{index + 1}</Text>
                              </View>
                              {this.returnRandomInputText(phrase,index)}
                          </View>
                      ))
                  }
              </View>
          );
      }
      return(
          <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
              {
                  this.state.seedPhrase.map((phrase,index)=>(
                      <View
                          key={index}
                          style={styles.phraseItem}>
                          <View style={styles.phraseItemWrapper}>
                              <Text style={styles.phraseIndex}>{index + 1}</Text>
                          </View>
                          <Text style={styles.phraseText}>{phrase}</Text>
                      </View>
                  ))
              }
          </View>
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
                  <ScrollView style={{paddingBottom:moderateScale(300)}}>
                      <View style={styles.container}>
                          <Text style={styles.mainTitle}>
                              {this.state.isVerificationMode ? 'Verify ' : ''}Mnemonic Seed
              Phrase
                          </Text>
                          <View style={styles.disclaimerHeader}>
                              <Text style={styles.title}>Disclaimer</Text>
                              <Text style={styles.subTitle}>
                                  {this.state.isVerificationMode
                                      ? 'Enter the words in the missing positions of the seed phrase'
                                      : 'Please note down your 12 word mnemonic seed phrase in the displayed order and save it in a secure manner.'}
                              </Text>
                          </View>
                          {this._getSortableGrid()}
                      </View>
                  </ScrollView>
                  <View style={styles.footer}>
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
                  <LoadingIndicator
                      message={this.state.loadingMessage}
                      visible={this.state.isLoading}
                  />
                  <ConfirmDialog
                      message={'Are you sure you want to reset mnemonic phrase?'}
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
                  <ErrorDialog
                      message={
                          'Please ensure you have entered the correct seed phrases  and in correct order!'
                      }
                      onDismiss={() => {
                          this.setState({invalidOrder: false});
                      }}
                      title={'Invalid seed phrase order'}
                      visible={this.state.invalidOrder}
                  />
              </SafeAreaView>
              
          </>
      );
  }
}
