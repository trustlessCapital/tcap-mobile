import '@ethersproject/shims';
import {ethers} from 'ethers';
import WalletUtils from './wallet-utils';
import * as zksync from '../lib/zksync/build-src/index';
import Config from '../@Config/default';

const { NETWORK , SUBNET } = Config;

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
      this.syncProvider = await zksync.getDefaultProvider(NETWORK,SUBNET);
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

  unlockZksyncWallet = async (token,iFOnlySigningKeyIsSet = false) => {
      console.log('unlockZksyncWallet',iFOnlySigningKeyIsSet);
      await this.getSyncWallet();
      if(iFOnlySigningKeyIsSet)
          return await this.syncWallet.isSigningKeySet();
      else{
          console.log('unlock account process');
          if ((await this.syncWallet.getAccountId()) == undefined) {
              console.log('Inside First IF');
              return;
          }
          console.log('Else Part');
          const signingKeyTx = await this.syncWallet.setSigningKey({ feeToken: token.toUpperCase(), });
          const receipt = await signingKeyTx.awaitReceipt();
          return receipt;
      }
  }

  //   getUnlockAccountFee = async(accAddress,token) =>{
  //       console.log('zksync.types.ChangePubKeyFee',zksync.types.ChangePubKeyFee);
  //       const txFee = await this.syncProvider.getTransactionFee(zksync.types.ChangePubKeyFee, accAddress, token);
  //       return txFee;
  //   }

  depositFundsToZkSync = async (token, amount) => {
      amount = amount.toString();
      await this.getSyncWallet();
      const decimalForToken = WalletUtils.getDecimalValueForAsset(token);
      const addressForToken = WalletUtils.getDecimalValueForAsset(token,true);
      let weiUnit = Math.pow(10,decimalForToken);
      let Wei = (amount * weiUnit).toString();
      const body = {
          depositTo: this.syncWallet.address(),
          approveDepositAmountForERC20: token=== 'eth' ? false :  true,
          token: addressForToken,
          amount: ethers.BigNumber.from(Wei),
      };
      const deposit = await this.syncWallet.depositToSyncFromEthereum(body);
      const transactionDetails = Promise.all([
          deposit.awaitReceipt(),
          deposit.awaitEthereumTxCommit() 
      ]);
      return transactionDetails;
  }

  transferFundsToZkSync = async (destination,token,amount) =>{
      amount = amount.toString();
      await this.getSyncWallet();
      const decimalForToken = WalletUtils.getDecimalValueForAsset(token);
      let weiUnit = Math.pow(10,decimalForToken);
      let Wei = (amount * weiUnit).toString();
      const txAmount = ethers.BigNumber.from(Wei);
      const body = {
          to: destination, token: token.toUpperCase(), amount: txAmount
      };
      const transfer = await this.syncWallet.syncTransfer(body);
      const transactionDetails = Promise.all([
          transfer.awaitReceipt(),
          transfer.txHash,
      ]);
      return transactionDetails;
  }

  withdrawFundsToEtherium = async (destination,token,amount,fastWithdraw=false,fee) =>{
      amount = amount.toString();
      await this.getSyncWallet();
      const decimalForToken = WalletUtils.getDecimalValueForAsset(token);
      let weiUnit = Math.pow(10,decimalForToken);
      let Wei = (amount * weiUnit).toString();
      const txAmount = ethers.BigNumber.from(Wei);
      let body = {
          ethAddress: destination, 
          token: token.toUpperCase(), 
          amount: txAmount,
          fastProcessing:fastWithdraw
      };
      if(fastWithdraw) body.fee =  ethers.BigNumber.from((fee * weiUnit).toString());
      const withdraw = await this.syncWallet.withdrawFromSyncToEthereum(body);
      const transactionDetails = Promise.all([
          withdraw.awaitReceipt(),
          withdraw.txHash,
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

  getFundTransferStatusUrl(txId) {
      return `https://${NETWORK}.zkscan.io/explorer/transactions/${txId}`;
  }

}
