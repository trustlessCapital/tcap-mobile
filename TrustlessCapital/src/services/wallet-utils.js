const ethers = require('ethers');
import * as Random from 'expo-random';
import SecurityServices from './security';
import * as Keychain from 'react-native-keychain';
import ECEncryption from 'react-native-ec-encryption';
import base64 from 'react-native-base64';

const createWallet = (pk) => {
  return new ethers.Wallet(pk);
};

const createMnemonic = async () => {
  const randomBytes = await Random.getRandomBytesAsync(16);
  return ethers.utils.entropyToMnemonic(randomBytes);
}

const createAddressFromPrivateKey = (pk) => {
  return new ethers.Wallet(pk).address;
};

const _createPrivateKeyFromMnemonic = (mnemonic, index) => {
  return ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/" + index).privateKey;
};

const _encryptWithEC = (text, label) => {
  return ECEncryption.encrypt({
    data: text,
    label: base64.encode(label)
  });
};

const _decryptWithEC = (cipherText, label) => {
  return ECEncryption.decrypt({
    data: cipherText,
    label: base64.encode(label)
  });
};

const clearPrivateKey = () => {
  return Keychain.resetGenericPassword();
}

const createAndStorePrivateKey = (seedPhrase, pin, email) => {
  const pk = _createPrivateKeyFromMnemonic(seedPhrase, "1");
  return SecurityServices.generateKey(pin, 'salt').then(key => {
    return SecurityServices.encryptData(pk, key).then(encryptedData => {
      return _encryptWithEC(JSON.stringify(encryptedData), email).then(cipherText => {
        return Keychain.setGenericPassword(email, cipherText, {
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        });
      });
    });
  });
};

const getPrivateKey = (pin, email) => {
  return SecurityServices.generateKey(pin, 'salt').then(key => {
    return Keychain.getGenericPassword().then(cipherText => {
      cipherText = cipherText.password;
      return _decryptWithEC(cipherText, email).then(encryptedData => {
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
  });
};

export default (WalletUtils = {
  createAndStorePrivateKey,
  getPrivateKey,
  createMnemonic,
  createWallet,
  createAddressFromPrivateKey,
  _createPrivateKeyFromMnemonic,
  clearPrivateKey,
});

