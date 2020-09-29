const ethers = require('ethers');
import WalletUtils from './wallet-utils';
import * as zksync from '../lib/zksync/build-src/index';
import walletUtils from './wallet-utils';
import Web3 from 'web3';
import ZkSyncTokens from '../constants/ZkSyncTokens';


const PROJECT_ID = '70a3313a4c414b5da283fa9bcaf0ed0a';
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
    this.syncProvider = await zksync.getDefaultProvider("rinkeby");
  }

  getSyncWallet = async () => {
    await this.getProvider();
    const ethWallet = WalletUtils.createWallet(this.pk);
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
    await this.getSyncWallet();
    const deposit = await this.syncWallet.depositToSyncFromEthereum({
      depositTo: this.syncWallet.address(),
      token,
      amount: ethers.utils.parseEther(amount),
    });

    return await deposit.awaitVerifyReceipt();
  }

  getZkSyncBalance = async () => {
    const accountState = await this.getAccountState();
    const verifiedBalances = accountState.verified.balances;
    // Verified balances object will be having balances of each ZkSyncTokens, for dashboard total must be calculated and shown
    return verifiedBalances;
  }

  getEtheriumBalance = async () => {
    let ethAddress = walletUtils.createAddressFromPrivateKey(this.pk);

    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/v3/${PROJECT_ID}`,
      ),
    );

    await new Promise((resolve, reject) => {
      web3.eth.getBalance(ethAddress, function(err, result) {
        if (err) {
          reject(err);
        } else {
          const ethBalance = web3.utils.fromWei(result, 'ether');
          // For each ZkSyncTokens get balance in eth network
          resolve(ethBalance);
        }
      });
    });
  }

  getTxStatusUrl(txId) {
    return `https://rinkeby.etherscan.io/tx/${txId}`;
  }
}
