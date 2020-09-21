import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarColor from '../components/status-bar-color';
import Colors from '../constants/Colors';
import styles from '../stylesheets/deposit-home';

export default class DepositStatusScreen extends Component {
  state = {
  }

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
      if (this.props.route.params.pk) this.pk = this.props.route.params.pk;
      if (this.props.route.params.amount)
        this.state.amount = this.props.route.params.amount;
    }
  }

  navigateBack = () => { this.props.navigation.goBack(); }

  goToDepositFromEthScreen = (type) => {
    this.props.navigation.push('DepositEthScreen', {
      accountDetails: this.accountDetails,
      pk: this.pk,
      type
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
            <Text style={styles.titleBarTitle}>Deposit Initiated</Text>
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
          <View style={[styles.marginAround]}>
            <Image
              style={styles.titleIcon}
              source={require('../../assets/images/icons/check.png')}
            />
          </View>
          <Text style={styles.title}>
            Your deposit transaction has been mined and will be processed
            after 1 confirmations. Use the link below to track the progress
          </Text>
          <View style={styles.cardContent}>
            <View
              style={[
                styles.buttonStyle,
                styles.marginButtom,
                styles.noBackground,
              ]}>
              <Text style={[styles.buttonText3, styles.marginLeft]}>
                Amount
              </Text>
              <View style={[styles.rowFlex, styles.marginRight]}>
                <View
                  style={[
                    styles.columnFlex,
                    styles.marginLeft,
                    styles.centerAlign,
                  ]}>
                  <Text style={[styles.buttonText3]}>
                    {this.state.amount}
                  </Text>
                  <Text style={[styles.buttonText2, styles.greenText]}>
                    $881.25
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.cardFooter]}>
              <TouchableOpacity style={[styles.buttonStylePrimary]}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableOpacity>
            </View>
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
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}