import WalletUtils from './wallet-utils';
import * as zksync from '../lib/zksync/build-src/index';
import walletUtils from './wallet-utils';
import Web3 from 'web3';
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
    this.pk = pk;
  }

  getProvider = async () => {
    this.syncProvider = await zksync.getDefaultProvider("rinkeby");
  }

  getSyncWallet = async (pk) => {
    try {
      await this.getProvider();
      const ethWallet = WalletUtils.createWallet(pk);
      this.syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, this.syncProvider);
    } catch(e){
        console.log("Failed to get syncWallet:: ", e, e.stack)
    }
    return this.syncWallet; 
  }

  getAccountState = async (pk) => {
    await this.getSyncWallet(pk);
    return this.syncWallet.getAccountState();
  }

  getEtheriumBalance = async (pk) => {
    let ethAddress = walletUtils.createAddressFromPrivateKey(pk);

    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/v3/${PROJECT_ID}`,
      ),
    );

    web3.eth.getBalance(
      ethAddress,
      function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(web3.utils.fromWei(result, 'ether') + ' ETH');
        }
      },
    );
  }
}
