import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  AppState
} from 'react-native';
import styles from './styles';
import SecurityServices from '../../../@Services/security';
import Colors from '../../../@Constants/Colors';
import StatusBarColor from '../../../@Components/status-bar-color';
import {TabView, SceneMap} from 'react-native-tab-view';
import DashboardWallet from './Wallet/index';

export default class DashboardScreen extends Component {
  state = {
    appState: AppState.currentState,
    index: 0,
    routes: [
      {
        key: 'wallet',
        title: 'Wallet',
        icon: require('../../../../assets/images/icons/tab-icons/wallet.png'),
        iconActive: require('../../../../assets/images/icons/tab-icons/wallet-a.png')
      },
      {
        key: 'transactions',
        title: 'Transactions',
        icon: require('../../../../assets/images/icons/tab-icons/transactions.png'),
        iconActive: require('../../../../assets/images/icons/tab-icons/transactions-a.png')
      },
      {
        key: 'account',
        title: 'Account',
        icon: require('../../../../assets/images/icons/tab-icons/account.png'),
        iconActive: require('../../../../assets/images/icons/tab-icons/account-a.png')
      },
    ],
  };
  authState = {};

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  WalletRoute = () => (
    <DashboardWallet
      accountDetails={this.accountDetails}
      navigation={this.props.navigation}
    ></DashboardWallet>
  );
 
  TransactionsRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  );

   
  AccountRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#dd2e3a' }]} />
  );

  _handleAppStateChange = nextAppState => {
    SecurityServices.handleLocalAuthorization(
      this,
      nextAppState,
      this.state,
      this.authState,
    );
  };

  _handleIndexChange = index => this.setState({index});

  _renderTabs = SceneMap({
    wallet: this.WalletRoute,
    transactions: this.TransactionsRoute,
    account: this.AccountRoute,
  });

  _renderTabBar = props => {
    return (
      <>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const activeStyle =
              this.state.index === i ? styles.tabIconActive : null;

            return (
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => this.setState({index: i})}>
                <Image
                  style={[styles.tabIcon, activeStyle]}
                  source={this.state.index === i  ? route.iconActive : route.icon}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  get mainContent() {
    return (
      <>
        <TabView
          navigationState={this.state}
          renderScene={this._renderTabs}
          onIndexChange={this._handleIndexChange}
          renderTabBar={this._renderTabBar}
          tabBarPosition={'bottom'}
          swipeEnabled={false}
        />
      </>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <StatusBarColor
          backgroundColor={Colors.primary_bg}
          barStyle="light-content"
        />
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={{ flex: 1 }}>
            {this.mainContent}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
