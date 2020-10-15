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
exports.Signer = void 0;
const crypto_1 = require('./crypto');
const ethers_1 = require('ethers');
const utils_1 = require('./utils');
class Signer {
    constructor(privKey) {
        this.privateKey = privKey;
    }
    pubKeyHash() {
        return crypto_1.privateKeyToPubKeyHash(this.privateKey);
    }
    signSyncTransfer(transfer) {
        const type = new Uint8Array([5]); // tx type
        const accountId = utils_1.serializeAccountId(transfer.accountId);
        const from = utils_1.serializeAddress(transfer.from);
        const to = utils_1.serializeAddress(transfer.to);
        const token = utils_1.serializeTokenId(transfer.tokenId);
        const amount = utils_1.serializeAmountPacked(transfer.amount);
        const fee = utils_1.serializeFeePacked(transfer.fee);
        const nonce = utils_1.serializeNonce(transfer.nonce);
        const msgBytes = ethers_1.ethers.utils.concat([type, accountId, from, to, token, amount, fee, nonce]);
        const signature = crypto_1.signTransactionBytes(this.privateKey, msgBytes);
        return {
            type: 'Transfer',
            accountId: transfer.accountId,
            from: transfer.from,
            to: transfer.to,
            token: transfer.tokenId,
            amount: ethers_1.BigNumber.from(transfer.amount).toString(),
            fee: ethers_1.BigNumber.from(transfer.fee).toString(),
            nonce: transfer.nonce,
            signature,
        };
    }
    signSyncWithdraw(withdraw) {
        const typeBytes = new Uint8Array([3]);
        const accountId = utils_1.serializeAccountId(withdraw.accountId);
        const accountBytes = utils_1.serializeAddress(withdraw.from);
        const ethAddressBytes = utils_1.serializeAddress(withdraw.ethAddress);
        const tokenIdBytes = utils_1.serializeTokenId(withdraw.tokenId);
        const amountBytes = utils_1.serializeAmountFull(withdraw.amount);
        const feeBytes = utils_1.serializeFeePacked(withdraw.fee);
        const nonceBytes = utils_1.serializeNonce(withdraw.nonce);
        const msgBytes = ethers_1.ethers.utils.concat([
            typeBytes,
            accountId,
            accountBytes,
            ethAddressBytes,
            tokenIdBytes,
            amountBytes,
            feeBytes,
            nonceBytes,
        ]);
        const signature = crypto_1.signTransactionBytes(this.privateKey, msgBytes);
        return {
            type: 'Withdraw',
            accountId: withdraw.accountId,
            from: withdraw.from,
            to: withdraw.ethAddress,
            token: withdraw.tokenId,
            amount: ethers_1.BigNumber.from(withdraw.amount).toString(),
            fee: ethers_1.BigNumber.from(withdraw.fee).toString(),
            nonce: withdraw.nonce,
            signature,
        };
    }
    signSyncForcedExit(forcedExit) {
        const typeBytes = new Uint8Array([8]);
        const initiatorAccountIdBytes = utils_1.serializeAccountId(forcedExit.initiatorAccountId);
        const targetBytes = utils_1.serializeAddress(forcedExit.target);
        const tokenIdBytes = utils_1.serializeTokenId(forcedExit.tokenId);
        const feeBytes = utils_1.serializeFeePacked(forcedExit.fee);
        const nonceBytes = utils_1.serializeNonce(forcedExit.nonce);
        const msgBytes = ethers_1.ethers.utils.concat([
            typeBytes,
            initiatorAccountIdBytes,
            targetBytes,
            tokenIdBytes,
            feeBytes,
            nonceBytes,
        ]);
        const signature = crypto_1.signTransactionBytes(this.privateKey, msgBytes);
        return {
            type: 'ForcedExit',
            initiatorAccountId: forcedExit.initiatorAccountId,
            target: forcedExit.target,
            token: forcedExit.tokenId,
            fee: ethers_1.BigNumber.from(forcedExit.fee).toString(),
            nonce: forcedExit.nonce,
            signature,
        };
    }
    signSyncChangePubKey(changePubKey) {
        const typeBytes = new Uint8Array([7]); // Tx type (1 byte)
        const accountIdBytes = utils_1.serializeAccountId(changePubKey.accountId);
        const accountBytes = utils_1.serializeAddress(changePubKey.account);
        const pubKeyHashBytes = utils_1.serializeAddress(changePubKey.newPkHash);
        const tokenIdBytes = utils_1.serializeTokenId(changePubKey.feeTokenId);
        const feeBytes = utils_1.serializeFeePacked(changePubKey.fee);
        const nonceBytes = utils_1.serializeNonce(changePubKey.nonce);
        const msgBytes = ethers_1.ethers.utils.concat([
            typeBytes,
            accountIdBytes,
            accountBytes,
            pubKeyHashBytes,
            tokenIdBytes,
            feeBytes,
            nonceBytes,
        ]);
        const signature = crypto_1.signTransactionBytes(this.privateKey, msgBytes);
        return {
            type: 'ChangePubKey',
            accountId: changePubKey.accountId,
            account: changePubKey.account,
            newPkHash: changePubKey.newPkHash,
            feeToken: changePubKey.feeTokenId,
            fee: ethers_1.BigNumber.from(changePubKey.fee).toString(),
            nonce: changePubKey.nonce,
            signature,
            ethSignature: null,
        };
    }
    static fromPrivateKey(pk) {
        return new Signer(pk);
    }
    static fromSeed(seed) {
        return new Signer(crypto_1.privateKeyFromSeed(seed));
    }
    static fromETHSignature(ethSigner) {
        return __awaiter(this, void 0, void 0, function* () {
            let chainID = 1;
            if (ethSigner.provider) {
                const network = yield ethSigner.provider.getNetwork();
                chainID = network.chainId;
            }
            let message = 'Access zkSync account.\n\nOnly sign this message for a trusted client!';
            if (chainID !== 1) {
                message += `\nChain ID: ${chainID}.`;
            }
            const signedBytes = utils_1.getSignedBytesFromMessage(message, false);
            const signature = yield utils_1.signMessagePersonalAPI(ethSigner, signedBytes);
            const address = yield ethSigner.getAddress();
            const ethSignatureType = yield utils_1.getEthSignatureType(ethSigner.provider, message, signature, address);
            const seed = ethers_1.ethers.utils.arrayify(signature);
            const signer = Signer.fromSeed(seed);
            return { signer, ethSignatureType };
        });
    }
}
exports.Signer = Signer;
