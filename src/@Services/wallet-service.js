import '@ethersproject/shims';
import {ethers} from 'ethers';
import WalletUtils from './wallet-utils';
import * as zksync from '../lib/zksync/build-src/index';

const NETWORK = 'rinkeby';
//const NETWORK = 'mainnet';
export default class WalletService {

    constructor() {}

  static myInstance = null;
  /**
   * @returns {WalletService}
   */
  static getInstance() {
      if (WalletService.myInstance == null) {
          WalletService.myInstance = new WalletService();
      }

      return this.myInstance;
  }

  setPk(pk) {
      // Wallet service is singleton, so private key will be set after login or singup.
      this.pk = pk;
  }

  getProvider = async () => {
      this.syncProvider = await zksync.getDefaultProvider(NETWORK);
  }

  getEthersProvider = async () => {
      return ethers.getDefaultProvider(NETWORK);
  }

  getSyncWallet = async () => {
      await this.getProvider();
      const ethersProvider = await this.getEthersProvider();
      const ethWallet = WalletUtils.createWallet(this.pk, ethersProvider);
      this.syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, this.syncProvider);
  
      return this.syncWallet;
  }

  getAccountState = async () => {
      await this.getSyncWallet();
      return this.syncWallet.getAccountState();
  }

  unlockZksyncWallet = async () => {
      await this.getSyncWallet();
      if (!(await this.syncWallet.isSigningKeySet())) {
          if ((await this.syncWallet.getAccountId()) == undefined) {
              return;
          }

          const changePubkey = await this.syncWallet.setSigningKey();

          return await changePubkey.awaitReceipt();
      }
  }

  depositFundsToZkSync = async (token, amount) => {
      amount = amount.toString();
      console.log('receivedAmt',amount);
      console.log('typeOf amount',typeof amount);
      await this.getSyncWallet();
      const decimalForToken = WalletUtils.getDecimalValueForAsset(token);
      console.log('decimalForToken',decimalForToken);
      let weiUnit = Math.pow(10,decimalForToken);
      let Wei = (amount * weiUnit).toString();
      console.log('Wei',Wei);
      console.log('typeOf Wei',typeof Wei);
      const deposit = await this.syncWallet.depositToSyncFromEthereum({
          depositTo: this.syncWallet.address(),
          token: token.toUpperCase(),
          amount: ethers.BigNumber.from(Wei),
      });
      const transactionDetails = Promise.all([
          deposit.awaitReceipt(),
          deposit.awaitEthereumTxCommit() 
      ]);
      return transactionDetails;
  }

  getZkSyncBalance = async () => {
      const accountState = await this.getAccountState();
      const verifiedBalances = accountState.verified.balances;
      // Verified balances object will be having balances of each ZkSyncTokens, for dashboard total must be calculated and shown
      return verifiedBalances;
  }

  getEtheriumAddress = async () => {
      await this.getSyncWallet();
      return this.syncWallet.address();
  }

  getTxStatusUrl(txId) {
      return `https://${NETWORK}.etherscan.io/tx/${txId}`;
  }
}
