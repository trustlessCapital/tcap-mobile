const ethers = require('ethers');
import SecurityServices from './security';
import * as Keychain from 'react-native-keychain';

const createWallet = (pk) => {
  return new ethers.Wallet(pk);
};

const createPrivateKey = () => {
  return ethers.Wallet.createRandom().privateKey;
};

const createAndStorePrivateKey = (pin, email) => {
  const pk = createPrivateKey();
  return SecurityServices.generateKey(pin, 'salt').then(key => {
    return SecurityServices.encryptData(pk, key).then(encryptedData => {
      return Keychain.setGenericPassword(email, JSON.stringify(encryptedData), {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY
      });
    });
  });
};

const getPrivateKey = pin => {
  return SecurityServices.generateKey(pin, 'salt').then(key => {
    return Keychain.getGenericPassword().then(encryptedData => {
      encryptedData = encryptedData.password;
      try {
        encryptedData = JSON.parse(encryptedData);
      } catch (e) {
        throw {error: 'Corrupted Data', status: -1};
      }
      return SecurityServices.decryptData(encryptedData, key)
        .then(data => {
          return data;
        })
        .catch(e => {
          throw {error: 'Invalid PIN', status: -2};
        });
    });
  });
};

export default (WalletServices = {
  createAndStorePrivateKey,
  getPrivateKey,
});

