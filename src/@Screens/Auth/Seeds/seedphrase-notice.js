import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './noticeStyles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import StatusBarColor from '../../../@Components/status-bar-color'; 
import Colors from '../../../@Constants/Colors';

export default class SeedPhraseNoticeScreen extends Component {
  state = {
    activeIndex: 0,
    nextButtonText: 'I Understand',
  };

  carousel = null;
  carouselItems = [
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

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
      if (this.props.route.params.pin)
        this.pin = this.props.route.params.pin;
    }
  }

  _getcarouselItem(item, index) {
    return (
      <>
        <View key={index} style={styles.carouselItem}>
          <Image
            style={styles.logo}
            source={require('../../../../assets/images/logo.png')}
          />
          <Text style={styles.title}>
            {item.title}
          </Text>
          {item.paragraphs}
        </View>
      </>
    );
  }

  _onSlideChange(index) {
    if (index === this.carouselItems.length - 1) {
      this.setState({
        activeIndex: index,
        nextButtonText: 'Show seed phrase',
      });
    } else {
      this.setState({
        activeIndex: index,
        nextButtonText: 'I Understand',
      });
    }
  }

  _goToNext() {
    if (
      this.state.activeIndex ===
      this.carouselItems.length - 1
    ) {
      this._goToSeedPhraseScreen();
    } else {
      this.carousel.snapToNext();
    }
  }

  _renderItem({item, index}) {
    return this._getcarouselItem(item, index);
  }

  get pagination() {
    const carouselItems = this.carouselItems;
    const {activeIndex} = this.state;
    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        dotStyle={styles.inactiveDotStyle}
        containerStyle={styles.dotContainerStyle}
        inactiveDotStyle={styles.dotStyle}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.8}
      />
    );
  }

  _goToSeedPhraseScreen() {
    this.props.navigation.navigate('SeedPhraseScreen', {
      pin: this.pin,
      accountDetails: this.accountDetails,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <StatusBarColor
          backgroundColor={Colors.primary_bg}
          barStyle="light-content"
        />
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.container}>
            <Carousel
              layout={'default'}
              ref={ref => (this.carousel = ref)}
              data={this.carouselItems}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
              renderItem={this._renderItem.bind(this)}
              onSnapToItem={this._onSlideChange.bind(this)}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              useScrollView={true}
            />
            {this.pagination}

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this._goToNext.bind(this)}>
                <Text style={styles.buttonText}>
                  {this.state.nextButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
