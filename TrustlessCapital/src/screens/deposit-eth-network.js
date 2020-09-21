import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarColor from '../components/status-bar-color';
import Colors from '../constants/Colors';
import styles from '../stylesheets/deposit-home';

export default class DepositEthScreen extends Component {
  state = {
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
    this.props.navigation.push('DepositHomeScreen', {
      accountDetails: this.accountDetails,
      pk: this.pk,
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

  get depositContent() {
    return (
      <>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.inputLabel}>Amount / Asset</Text>
            <View
              onPress={this.openCountryPicker}
              style={[
                styles.buttonStyle,
                styles.marginButtom,
                styles.columnFlex,
              ]}>
              <View
                style={[
                  styles.rowFlex,
                  styles.centerAlign,
                  {marginBottom: 10},
                ]}>
                <TextInput
                  style={styles.inputText}
                  placeholder={'Enter Amount'}
                  placeholderTextColor={Colors.tintColorGreyedDark}
                  onChangeText={text => {
                    this.state.amount = text.replace(/[^0-9]/g, '');
                    this.setState({});
                  }}
                  keyboardType={'phone-pad'}
                  value={this.state.amount}
                />
                <View style={[styles.rowFlex, styles.marginRight]}>
                  <Text style={[styles.buttonText3]}>ETH</Text>
                </View>
              </View>
              <View style={[styles.rowFlex, styles.borderTop, { marginHorizontal: 10 }]}>
                <Text
                  style={[
                    styles.buttonText2,
                    styles.greenText,
                    {marginTop: 10, width: '100%'},
                  ]}>
                  ~$881.25
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={this.goToDepositFromEthScreen.bind(this)}
              style={styles.buttonStyleSecondary}>
              <Text style={styles.buttonText}>Deposit</Text>
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
              <ScrollView style={styles.mainContentWrapper}>
                {this.depositContent}
              </ScrollView>
              <View style={styles.cardFooter}>
                <TouchableOpacity style={[styles.buttonStylePrimary]}>
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