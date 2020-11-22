/**
 * Modified By @name Sukumar_Abhijeet,
 */

const ethers = require('ethers');
import * as Random from 'expo-random';
import * as _ from 'lodash';
import SecurityServices from './security';
import * as Keychain from 'react-native-keychain';
import ECEncryption from 'react-native-ec-encryption';
import base64 from 'react-native-base64';
import reduxStore from '../@Redux/store';

const createWallet = (pk, network) => {
    return new ethers.Wallet(pk, network);
};

const createMnemonic = async () => {
    const randomBytes = await Random.getRandomBytesAsync(16);
    return ethers.utils.entropyToMnemonic(randomBytes);
};

const createAddressFromPrivateKey = (pk) => {
    return new ethers.Wallet(pk).address;
};

const _createPrivateKeyFromMnemonic = (mnemonic, index) => {
    return ethers.Wallet.fromMnemonic(mnemonic, 'm/44\'/60\'/0\'/0/' + index).privateKey;
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
};

const createAndStorePrivateKey = (seedPhrase, pin, email) => {
    const pk = _createPrivateKeyFromMnemonic(seedPhrase, '1');
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
            if (!cipherText) {
                return null;
            }
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

const getAssetDisplayText = (symbol, value) => {
    const decimal = getDecimalValueForAsset(symbol);
    const unitConvertor = Math.pow(10, decimal);
    const displayText = (parseFloat(value) / unitConvertor).toFixed(4);
    return displayText;
};

const getDecimalValueForAsset = (assetSymbol,getAddress=false) =>{
    const reduxState = reduxStore.getState();
    const { TOKENS } = reduxState.zkSyncTokens;
    let decimal = 18;
    let result = TOKENS.find(x => x.symbol === assetSymbol.toUpperCase());
    
    if(result) decimal = result.decimals;

    if(getAddress) return result.address || '';
    else return decimal;
};

const getWeiToEth = (weiAmount) =>{
    const ethUnit = Math.pow(10, 18);
    return weiAmount/ethUnit;
};

const getAssetDisplayTextInSelectedCurrency = (symbol, value, exchangeRates) => {
    const reduxState = reduxStore.getState();
    const { selectedCurrency } = reduxState.currency;
    if (!value) {
        return 0;
    }
    value = parseFloat(value);
    let exchangeRate = _.find(exchangeRates, { symbol });
    if (!exchangeRate) return 0;
    const displayPrice =  (value * selectedCurrency.value * parseFloat(exchangeRate.value) * 1e-8).toFixed(4);
    return displayPrice;
};

export default (WalletUtils = {
    createAndStorePrivateKey,
    getPrivateKey,
    createMnemonic,
    createWallet,
    createAddressFromPrivateKey,
    _createPrivateKeyFromMnemonic,
    clearPrivateKey,
    getDecimalValueForAsset,
    getAssetDisplayText,
    getAssetDisplayTextInSelectedCurrency,
    getWeiToEth,
});

