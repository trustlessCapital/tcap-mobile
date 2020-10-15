'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.loadZkSyncCrypto = exports.privateKeyToPubKeyHash = exports.signTransactionBytes = void 0;
const zksync_crypto_1 = require('../../zksync-crypto/zksync_crypto_wasm.js');
const zks = require('../../zksync-crypto/zksync_crypto_wasm.js');
const ethers_1 = require('ethers');
var zksync_crypto_2 = require('../../zksync-crypto/zksync_crypto_wasm.js');
Object.defineProperty(exports, 'privateKeyFromSeed', { enumerable: true, get: function () { return zksync_crypto_2.privateKeyFromSeed; } });
function signTransactionBytes(privKey, bytes) {
    const signaturePacked = zksync_crypto_1.sign_musig(privKey, bytes);
    const pubKey = ethers_1.utils.hexlify(signaturePacked.slice(0, 32)).substr(2);
    const signature = ethers_1.utils.hexlify(signaturePacked.slice(32)).substr(2);
    return {
        pubKey,
        signature
    };
}
exports.signTransactionBytes = signTransactionBytes;
function privateKeyToPubKeyHash(privateKey) {
    return `sync:${ethers_1.utils.hexlify(zksync_crypto_1.private_key_to_pubkey_hash(privateKey)).substr(2)}`;
}
exports.privateKeyToPubKeyHash = privateKeyToPubKeyHash;
let zksyncCryptoLoaded = false;
function loadZkSyncCrypto(wasmFileUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        // Only runs in the browser
        if (zks.default) {
            // @ts-ignore
            const url = wasmFileUrl ? wasmFileUrl : zks.DefaultZksyncCryptoWasmURL;
            if (!zksyncCryptoLoaded) {
                yield zks.default(url);
                zksyncCryptoLoaded = true;
            }
        }
    });
}
exports.loadZkSyncCrypto = loadZkSyncCrypto;
