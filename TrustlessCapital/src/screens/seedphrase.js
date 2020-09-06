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
import WalletServices from '../services/wallet-services';
import SortableGrid from 'react-native-sort-grid';

export default class SeedPhraseScreen extends Component {
  state = {
    saveButtonText: 'Save',
    resetButtonText: 'Reset',
    seedPhrase: [],
    isVerificationMode: false
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
    return (
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.mainTitle}>Mnemonic Seed Phrase</Text>
            <View style={styles.header}>
              <Text style={styles.title}>Disclaimer</Text>
              <Text style={styles.subTitle}>
                Please note down your 12 word mnemonic seed phrase in the
                displayed order and save it in a secure manner.
              </Text>
            </View>
            <SortableGrid
              style={styles.phrasesWrapper}
              itemWidth={Dimensions.get('window').width / 2}
              itemHeight={Dimensions.get('window').height / 12}
              itemsPerRow={2}
              onDragRelease={itemOrder =>
                console.log(
                  'Drag was released, the blocks are in the following order: ',
                  itemOrder,
                )
              }>
              {this.state.seedPhrase.map((phrase, index) => (
                <View style={styles.phraseItem} key={index}>
                  {!this.state.isVerificationMode ? (
                    <View style={styles.phraseItemWrapper}>
                      <Text style={styles.phraseIndex}>{index + 1}</Text>
                    </View>
                  ) : null}
                  <Text style={styles.phraseText}>{phrase}</Text>
                </View>
              ))}
            </SortableGrid>
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
