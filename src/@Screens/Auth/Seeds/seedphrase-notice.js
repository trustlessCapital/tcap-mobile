/* eslint-disable react/jsx-key */
// Copyright (C) 2020  Trustless Pvt Ltd. <https://trustless.capital>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Modified By @name Sukumar_Abhijeet,
 */


import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import styles from './noticeStyles';
import StatusBarColor from '../../../@Components/status-bar-color'; 
import Colors from '../../../@Constants/Colors';
import CheckBox from '@react-native-community/checkbox';

const carouselItems = [
    {
        title: 'Safety Notice',
        paragraphs: [
            <Text style={styles.paragraph}>
      Owning a wallet means that you and only you are in control of its content
            </Text>,
            <Text style={styles.paragraph}>
      With great power comes the great responsibility, which is why we invite you to read this short intrdocution first to understand what the implications are.
            </Text>,
            <Text style={styles.paragraph}>
      Skipping the introduction means you might miss some important safety practices, which will increase the chances of your funds being lost or stolen.
            </Text>,
            <Text style={styles.paragraphImportant}>
      Please note that in such cases, nobody will be able to help you retrieve your funds.
            </Text>,
            <Text style={styles.paragraph}>
      Don't skip this introduction (or do so at your own risk)
            </Text>,
        ],
    },
    {
        title: 'You are in control',
        paragraphs: [
            <Text style={styles.paragraph}>
      Trustless Capital is a free mobile app to help you interact with blockchain in general.
            </Text>,
            <Text style={styles.paragraph}>
      You have chosen to create a wallet with a seed phrase backup, which means you are in full control of your keys and funds.
            </Text>,
            <Text style={styles.paragraph}>
      We don't store or backup your keys and funds. It means that we cannot access, recover or reset your account.
            </Text>,
            <Text style={styles.paragraphImportant}>
      You are therefore solely responsible for securing your wallet
            </Text>,
        ],
    },
    {
        title: 'Your funds are not here',
        paragraphs: [
            <Text style={styles.paragraph}>
      Your token and coins are not shared on Wallet, they exist on the blockchain itself.
            </Text>,
            <Text style={styles.paragraph}>
      This wallet is only a tool to interact with them, which means that we do not control them.
            </Text>,
            <Text style={styles.paragraphImportant}>
      You are the only one in control of your funds.
            </Text>,
        ],
    },
    {
        title: 'You must save your seed phrase',
        paragraphs: [
            <Text style={styles.paragraph}>
      The seed phrase you are about to create is the only way to access your wallet and to restore it.
            </Text>,
            <Text style={styles.paragraphImportant}>
      If you lose it, the content of your wallet will be gone forever.
            </Text>,
            <Text style={styles.paragraph}>
      Therefore, it is imperative that you save your seed phrase in a secure manner: 
            </Text>,
            <Text style={styles.paragraphImportant}>
      Learn it by heart.
            </Text>,
            <Text style={styles.paragraphImportant}>
      Write it down and store it safely.
            </Text>,
            <Text style={styles.paragraphImportant}>
      Don't store your seed phrase online, on your phone or on your computer as it can be easily be hacked.
            </Text>,
        ],
    },
    {
        title: 'Never share your seed phrase',
        paragraphs: [
            <Text style={styles.paragraph}>
      If someone gets access to your seed phrase, they will be able to steal all your funds.
            </Text>,
            <Text style={styles.paragraphImportant}>
      Don't share it under any circumstance.
            </Text>,
        ],
    },
    {
        title: 'You\'re good to go',
        paragraphs: [
            <Text style={styles.paragraph}>
      Thank you for taking the time to read this safety notice!
            </Text>,
            <Text style={styles.paragraph}>
      If you have any additional questions or need help, feel free to contact us.
            </Text>,
        ],
    },
];

const SeedPhraseNoticeScreen = ({...props}) => {

    const {route:{params},navigation} = props;
    const {accountDetails,pin} = params;

    const [iUnderstand , setIunderstand] = useState(false);

    const _getcarouselItem = (item, index) => {
        return (
            <View key={index} style={styles.carouselItem}>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                {item.paragraphs}
            </View>
        );
    };

    const _goToSeedPhraseScreen =()=> {
        navigation.navigate('SeedPhraseScreen', {
            pin: pin,
            accountDetails: accountDetails,
        });
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBarColor
                backgroundColor={Colors.primary_bg}
                barStyle="light-content"
            />
            <ScrollView contentContainerStyle={styles.scrollWrapper}>
                <Image
                    source={require('../../../../assets/images/logo.png')}
                    style={styles.companyLogo} />
                {
                    carouselItems.map((item,index)=>(
                        _getcarouselItem(item,index)
                    ))
                }

                <View style={styles.checkBoxWrapper}>
                    <CheckBox
                        boxType={'square'}
                        onValueChange={(newValue) => {
                            setIunderstand(newValue);
                        }}
                        style={styles.checkBox}
                        value={iUnderstand}
                    />
                    <Text style={styles.accountText}> I Understand and Accept all terms.  </Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        disabled={!iUnderstand}
                        onPress={() =>_goToSeedPhraseScreen()}
                        style={{...styles.buttonStyle,opacity:iUnderstand ? 1: .4}}>
                        <Text style={styles.buttonText}>
                              Show Seed Phrase
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
              
        </SafeAreaView>
    );
};

export default SeedPhraseNoticeScreen;
