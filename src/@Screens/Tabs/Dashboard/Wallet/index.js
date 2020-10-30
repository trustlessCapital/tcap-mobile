import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import StorageUtils from '../../../../@Services/storage-utils';
import WalletService from '../../../../@Services/wallet-service';
import LoadingIndicator from '../../../../@Components/loading-indicator';
import apiServices from '../../../../@Services/api-services';
import walletUtils from '../../../../@Services/wallet-utils';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as DashboardActions from '../../../../@Redux/actions/dashboardActions';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';

const buttons = [
    {name : 'Send' , icon:'paper-plane'},
    {name : 'Add funds' , icon:'plus' },
    {name : 'Withdraw' , icon:'angle-double-down' }
];

class DashboardWallet extends Component {

  static propTypes = {
      accountDetails:PropTypes.object.isRequired,
      balanceObj:PropTypes.object.isRequired,
      exchangeRates:PropTypes.array.isRequired,
      navigation:PropTypes.object.isRequired,
      updateBalanceObject:PropTypes.func.isRequired,
      updateExchangeRates:PropTypes.func.isRequired,
  };

  constructor(props) {
      super(props);
      this.accountDetails = this.props.accountDetails;
      this.walletService = WalletService.getInstance();
  }

  state = {
      totalBalance: 0.0,
      isLoading: true
  }

  componentDidMount() {
      this.loadData();
  }

  componentDidUpdate(prevProps) {
      const {balanceObj} = prevProps;
      if (this.props.balanceObj !== balanceObj) {
          this.calculateBalance();
      }
  }

  checkNavigation = (indexValue) =>{

      switch (indexValue) {
      case 0:
          this.goToTransferHomeScreen();
          break;
      case 1:
          this.goToDepositHomeScreen();
          break;
      case 2:
          break;
    
      default:
          break;
      }

  }

  goToDepositHomeScreen = () => {
      this.props.navigation.push('DepositHomeScreen', {
          accountDetails: this.accountDetails,
          pk: this.walletService.pk,
      });
  }
  
  goToTransferHomeScreen = () => {
      this.props.navigation.push('TransferHomeScreen', {
          accountDetails: this.accountDetails,
          pk: this.walletService.pk,
      });
  }

  calculateBalance = () =>{
      this.setState({isLoading:true});
      const {balanceObj,exchangeRates} = this.props;
      if (balanceObj) {
          let total = 0;
          _.forOwn(balanceObj, (val, key) => {
              let value = walletUtils.getAssetDisplayText(key.toLowerCase(), val);
              let price = walletUtils.getAssetDisplayTextInUSD(key.toLowerCase(), value, exchangeRates);
              console.log('Price',typeof price,price);
              total +=parseFloat(price);
              console.log('Total',total);
          });
          this.setState({totalBalance:total,isLoading:false});
      }
  }

  loadData() {
      let promises = [this.fetchAccountBalance(), this.getExchangeRates()];
      this.setState({isLoading:true});
      Promise.all(promises).then(() => {
          this.setState({isLoading: false});
      }).catch((e) => {
          console.log('Error ', e);
          this.setState({isLoading: false});
      });
  }

  getExchangeRates = async () => {
      await apiServices.getExchangePrice().then((exchangeRates) => {
          this.exchangeRates = exchangeRates;
          this.props.updateExchangeRates(exchangeRates);
          StorageUtils.exchangeRates(exchangeRates);
      });
  }

  fetchAccountBalance = async () => {
      const walletService = WalletService.getInstance();
      await walletService.getZkSyncBalance().then(balanceObj => {
          this.props.updateBalanceObject(balanceObj);
          console.log('balanceObj',balanceObj);
          if (!balanceObj) {
              this.setState({totalBalance:0});
          } 
      });
  }

  get titleBar() {
      return (
          <>
              <View style={styles.titleBar}>
                  <Text style={styles.titleBar_title}>Your Wallet</Text>
              </View>
          </>
      );
  }

  get balanceCard() {
      return (
          <>
              <LinearGradient colors={['#f2935a', '#9845c1', '#844bf6']} end={{x: 1, y: 0}} start={{x: .1, y: 0}} style={styles.balanceCard}>
                  <Text style={styles.balanceTitle}>Total Balance</Text>
                  <View style={styles.balanceWrapper}>
                      <Text style={styles.balanceText}>
              $ {this.state.totalBalance.toFixed(4)}
                      </Text>
                  </View>
                  <LoadingIndicator
                      message={'Please wait while we prepare your wallet dashboard...'}
                      visible={this.state.isLoading}
                  />
              </LinearGradient>
          </>
      );
  }

  get buttons(){
      return(
          <View style={styles.buttonWrapper}>
              {
                  buttons.map((item,index)=>(
                      <TouchableOpacity key={index} onPress={()=>{this.checkNavigation(index);}} style={styles.eachButton}>
                          <Icon name={item.icon} size={moderateScale(20)} style={styles.icons} />
                          <Text style={styles.itemText}>{item.name}</Text>
                      </TouchableOpacity>
                  ))
              }
          </View>
      );
  }

  render() {
      return (
          <>
              <View style={styles.container}>
                  {this.titleBar}
                  {this.balanceCard}
                  {this.buttons}
              </View>
          </>
      );
  }
}

function mapStateToProps(state){
    return{
        balanceObj:state.dashboard.balanceObj,
        exchangeRates : state.dashboard.exchangeRates
    };
}

function mapDispatchToProps(dispatch){
    return{
        updateBalanceObject:balanceObj =>
            dispatch(DashboardActions.updateBalanceObject(balanceObj)),
        updateExchangeRates:rates =>
            dispatch(DashboardActions.updateExchangeRates(rates)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(DashboardWallet);