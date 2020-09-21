import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarColor from '../components/status-bar-color';
import Colors from '../constants/Colors';
import styles from '../stylesheets/deposit-home';

export default class DepositConfirmScreen extends Component {
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

  goToDepositStatusScreen = (type) => {
    this.props.navigation.push('DepositStatusScreen', {
      accountDetails: this.accountDetails,
      pk: this.pk,
      type,
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
            <Text style={styles.titleBarTitle}>Confirm Deposit</Text>
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
          <Text style={styles.title}>
            Please confirm the amount to deposit
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
            <View
              style={[
                styles.buttonStyle,
                styles.marginButtom,
                styles.noBackground,
              ]}>
              <Text style={[styles.buttonText3, styles.marginLeft]}>
                Fee
              </Text>
              <View style={[styles.rowFlex, styles.marginRight]}>
                <View
                  style={[
                    styles.columnFlex,
                    styles.marginLeft,
                    styles.centerAlign,
                  ]}>
                  <Text style={[styles.buttonText3]}>2.34</Text>
                  <Text style={[styles.buttonText2, styles.greenText]}>
                    $881.25
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.buttonStyle,
                styles.marginButtom,
                styles.noBackground,
                styles.borderTop,
              ]}>
              <Text style={[styles.buttonText3, styles.marginLeft]}>
                Total
              </Text>
              <View style={[styles.rowFlex, styles.marginRight]}>
                <View
                  style={[
                    styles.columnFlex,
                    styles.marginLeft,
                    styles.centerAlign,
                  ]}>
                  <Text style={[styles.buttonText3]}>2.34</Text>
                  <Text style={[styles.buttonText2, styles.greenText]}>
                    $881.25
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.cardFooter]}>
              <TouchableOpacity
                onPress={this.goToDepositStatusScreen.bind(this)}
                style={[styles.buttonStylePrimary, styles.halfButton]}>
                <Text style={styles.buttonText}>Deposit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonStyleSecondary, styles.halfButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
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