import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarColor from '../../../../../@Components/status-bar-color';
import Colors from '../../../../../@Constants/Colors';
import styles from './styles';
import CountryPicker from 'react-native-country-picker-modal';

export default class DepositHomeScreen extends Component {
  state = {
    showCountryPicker: false,
    countryName: 'India'
  }

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
      if (this.props.route.params.pk) this.pk = this.props.route.params.pk;
    }
  }

  navigateBack = () => { this.props.navigation.goBack(); }

  goToDepositFromEthScreen = () => {
    this.props.navigation.navigate('DepositEthBalanceScreen', {
      accountDetails: this.accountDetails,
      pk: this.pk,
    });
  }
  
  openCountryPicker = () => {
    this.setState({ showCountryPicker: true });
  }

  onCountrySelect = (country) => {
    this.setState({
      countryCode: country.cca2,
      countryName: country.name,
      showCountryPicker: false,
    });
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

  get headerContent() {
    return (
      <>
        
      </>
    );
  }

  get depositContent() {
    return (
      <>
        <View style={styles.card}>
          <Text style={styles.title}>
            How would you like to add funds to your mobile wallet?
          </Text>
          <View style={styles.cardContent}>
            <TouchableOpacity
              onPress={this.openCountryPicker}
              style={[styles.buttonStyle, styles.marginButtom]}>
              <Text style={[styles.buttonText3, styles.marginLeft]}>
                Country
              </Text>
              <View style={[styles.rowFlex, styles.marginRight]}>
                <Text style={styles.buttonText2}>
                  {this.state.countryName}
                </Text>
                <Icon
                  name={'ios-arrow-down'}
                  size={16}
                  color={Colors.tintColorGreyedDark}
                  style={[{alignSelf: 'center', marginLeft: 10}]}
                />
              </View>
            </TouchableOpacity>
            <CountryPicker
              theme={{
                primaryColor: Colors.title,
                primaryColorVariant: Colors.primaryBorder,
                backgroundColor: Colors.primaryBg,
                onBackgroundTextColor: Colors.subTitle,
                fontSize: 14,
                fontFamily: 'Montserrat-Bold',
                filterPlaceholderTextColor: Colors.title,
                activeOpacity: 0.7,
                itemHeight: 40,
              }}
              {...{
                countryCode: this.state.countryCode,
                withFilter: true,
                withFlag: true,
                withCountryNameButton: false,
                withCallingCodeButton: false,
                withFlagButton: false,
                withAlphaFilter: true,
                withCallingCode: false,
                withEmoji: true,
                onSelect: this.onCountrySelect,
                onClose: () => {
                  this.setState({showCountryPicker: false});
                },
                containerButtonStyle: {height: 0, width: 0},
              }}
              visible={this.state.showCountryPicker}
            />
            <TouchableOpacity
              style={[styles.buttonStyleSecondary, styles.marginButtom]}>
              <Text style={styles.buttonText}>
                Bank and Credit/Debit Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.goToDepositFromEthScreen.bind(this)}
              style={styles.buttonStyleSecondary}>
              <Text style={styles.buttonText}>
                Add from Etherium main network
              </Text>
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
              {this.headerContent}
              {this.depositContent}
              {this.mainContent}
              <View style={styles.cardFooter}>
                <TouchableOpacity
                  onPress={this.navigateBack.bind(this)}
                  style={[styles.buttonStylePrimary]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}