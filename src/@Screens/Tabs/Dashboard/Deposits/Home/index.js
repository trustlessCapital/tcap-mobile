/**
 * Modified By @name Sukumar_Abhijeet,
 */

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import StatusBarColor from '../../../../../@Components/status-bar-color';
import Colors from '../../../../../@Constants/Colors';
import AppHeader from '../../../../../@Components/AppHeader';
import styles from './styles';
// import CountryPicker from 'react-native-country-picker-modal';
import PropTypes from 'prop-types';

export default class DepositHomeScreen extends Component {

  static propTypes = {
      navigation:PropTypes.object.isRequired,
      route:PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props);
      if (this.props.route && this.props.route.params) {
          if (this.props.route.params.accountDetails)
              this.accountDetails = this.props.route.params.accountDetails;
          if (this.props.route.params.pk) this.pk = this.props.route.params.pk;
      }
  }

  state = {
      showCountryPicker: false,
      countryName: 'India'
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
                      {/* TODO */}
                      {/* <TouchableOpacity
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
                                  color={Colors.tintColorGreyedDark}
                                  name={'angle-down'}
                                  size={16}
                                  style={[{alignSelf: 'center', marginLeft: 10}]}
                              />
                          </View>
                      </TouchableOpacity> */}
                      {/* <CountryPicker
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
                      /> */}
                      {/* <TouchableOpacity
                          style={[styles.buttonStyleSecondary, styles.marginButtom]}>
                          <Text style={styles.buttonText}>
                Bank and Credit/Debit Card
                          </Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity
                          onPress={this.goToDepositFromEthScreen.bind(this)}
                          style={styles.buttonStyleSecondary}>
                          <Text style={styles.buttonText}>
                Add from Etherium main network
                          </Text>
                      </TouchableOpacity>
                      <Text style={styles.optionStyle}>* Other Options will be available soon</Text>
                  </View>
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
                  <View style={styles.container}>
                      <AppHeader headerTitle={'Deposit Funds'}  />
                      {this.headerContent}
                      {this.depositContent}
                      <View style={{...styles.cardFooter,position:'absolute',bottom:20}}>
                          <TouchableOpacity
                              onPress={this.navigateBack.bind(this)}
                              style={[styles.buttonStylePrimary]}>
                              <Text style={styles.buttonText}>Cancel</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </SafeAreaView>
          </>
      );
  }
}