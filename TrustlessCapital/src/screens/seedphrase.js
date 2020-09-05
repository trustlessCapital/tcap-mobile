import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import styles from '../stylesheets/seedphrase';
import WalletServices from '../services/wallet-services';

export default class SeedPhraseScreen extends Component {
  state = {
    saveButtonText: 'Save',
    resetButtonText: 'Reset',
    seedPhrase: []
  };

  constructor(props) {
    super(props);
    this._generateMnemonic();
  }

  _generateMnemonic() {
    let seedPhrase = WalletServices.createMnemonic().split(' ');
    this.state.seedPhrase = seedPhrase;
    this.setState({seedPhrase});
  }

  _getPhraseItem(phrase, index) {
    return (
      <>
        <View style={styles.phraseItem}>
          {index != null ? (
             <View style={styles.phraseItemWrapper}><Text style={styles.phraseIndex}>{index + 1}</Text></View>
          ) : null}
          <Text style={styles.phraseText}>{phrase}</Text>
        </View>
      </>
    );
  }

  render() {
    let phrasesView = [];
    let phrases = [];
    this.state.seedPhrase.forEach((phrase, index) => {
      phrases.push(this._getPhraseItem(phrase, index));
      if ((index + 1) % 2 === 0) {
        phrasesView.push(<View style={styles.phraseRow}>{phrases}</View>);
        phrases = [];
      }
    });

    return (
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.mainTitle}>Mnemonic Seed Phrase</Text>
            <View style={styles.phrasesWrapper}>{phrasesView}</View>
            <View>
              <Text style={styles.title}>Disclaimer</Text>
              <Text style={styles.subTitle}>
                Please note down your 12 word mnemonic seed phrase in the
                displayed order and save it in a secure manner.
              </Text>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.primaryButtonStyle}>
                <Text style={styles.primaryButtonText}>
                  {this.state.saveButtonText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButtonStyle}
                onPress={this._generateMnemonic.bind(this)}>
                <Text style={styles.secondaryButtonText}>
                  {this.state.resetButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
