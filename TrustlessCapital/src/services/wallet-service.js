import WalletUtils from './wallet-utils';
import * as zksync from '../lib/zksync/build-src/index';

export default class WalletService {

  constructor() {
    
  }

  init = async () => {
    this.syncProvider = await zksync.getDefaultProvider("rinkeby");
  }


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

  getSyncWallet = async (pk) => {
    try{
      const ethWallet = WalletUtils.createWallet(pk);
      this.syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, this.syncProvider);
    } catch(e){
        console.log("Failed to get syncWallet:: ", e, e.stack)
    }
    return this.syncWallet; 
  }

  getAccountState = async (pk) => {
    const ethWallet = WalletUtils.createWallet(pk);
    this.syncWallet = await zksync.Wallet.fromEthSigner(
      ethWallet,
      this.syncProvider,
    );
    return this.syncWallet.getAccountState();
  }
}
