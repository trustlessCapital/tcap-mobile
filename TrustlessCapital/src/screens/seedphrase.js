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
import SortableGrid from '../components/sortable-grid';

export default class SeedPhraseScreen extends Component {
  state = {
    saveButtonText: 'Save',
    resetButtonText: 'Reset',
    seedPhrase: [],
    isVerificationMode: false,
    seedPhraseText: ''
  };

  constructor(props) {
    super(props);
    this._generateMnemonic();
  }

  _generateMnemonic() {
    let seedPhraseText = WalletServices.createMnemonic();
    let seedPhrase = seedPhraseText.split(' ');
    this.state.seedPhrase = seedPhrase;
    this.state.seedPhraseText = seedPhraseText;
    this.setState({seedPhrase: seedPhrase, seedPhraseText: seedPhraseText});
  }

  _onSaveButtonClick() {
    if (this.state.isVerificationMode) {

    } else {
      this.setState({isVerificationMode : true});
    }
  }

  _onResetButtonClick() {
    if (this.state.isVerificationMode) {
      this.setState({isVerificationMode: false});
      this._generateMnemonic();
    } else {
      this._generateMnemonic();
    }
  }

  _getSortableGrid() {
    return <SortableGrid
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
        <View
          style={styles.phraseItem}
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
    </SortableGrid>;
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.mainTitle}>{this.state.isVerificationMode? 'Verify ' : ''}Mnemonic Seed Phrase</Text>
            <View style={styles.header}>
              <Text style={styles.title}>Disclaimer</Text>
              <Text style={styles.subTitle}>
                {this.state.seedPhraseText}
              </Text>
            </View>
            {this._getSortableGrid()}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.primaryButtonStyle}
              onPress={this._onSaveButtonClick.bind(this)}>
                <Text style={styles.primaryButtonText}>
                  {this.state.saveButtonText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButtonStyle}
                onPress={this._onResetButtonClick.bind(this)}>
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
