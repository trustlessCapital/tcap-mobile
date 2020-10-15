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
exports.serializeNonce = exports.serializeFeePacked = exports.serializeAmountFull = exports.serializeAmountPacked = exports.serializeTokenId = exports.serializeAccountId = exports.serializeAddress = exports.getEthSignatureType = exports.verifyERC1271Signature = exports.signMessagePersonalAPI = exports.getSignedBytesFromMessage = exports.getChangePubkeyMessage = exports.TokenSet = exports.isTokenETH = exports.sleep = exports.buffer2bitsBE = exports.isTransactionFeePackable = exports.closestPackableTransactionFee = exports.isTransactionAmountPackable = exports.closestPackableTransactionAmount = exports.packFeeChecked = exports.packAmountChecked = exports.reverseBits = exports.integerToFloat = exports.bitsIntoBytesInBEOrder = exports.floatToInteger = exports.ERC20_DEPOSIT_GAS_LIMIT = exports.ERC20_APPROVE_TRESHOLD = exports.MAX_ERC20_APPROVE_AMOUNT = exports.IEIP1271_INTERFACE = exports.SYNC_GOV_CONTRACT_INTERFACE = exports.SYNC_MAIN_CONTRACT_INTERFACE = exports.IERC20_INTERFACE = void 0;
const ethers_1 = require('ethers');
// Max number of tokens for the current version, it is determined by the zkSync circuit implementation.
const MAX_NUMBER_OF_TOKENS = 128;
// Max number of accounts for the current version, it is determined by the zkSync circuit implementation.
const MAX_NUMBER_OF_ACCOUNTS = Math.pow(2, 24);
exports.IERC20_INTERFACE = new ethers_1.utils.Interface(require('../abi/IERC20.json').abi);
exports.SYNC_MAIN_CONTRACT_INTERFACE = new ethers_1.utils.Interface(require('../abi/SyncMain.json').abi);
exports.SYNC_GOV_CONTRACT_INTERFACE = new ethers_1.utils.Interface(require('../abi/SyncGov.json').abi);
exports.IEIP1271_INTERFACE = new ethers_1.utils.Interface(require('../abi/IEIP1271.json').abi);
exports.MAX_ERC20_APPROVE_AMOUNT = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // 2^256 - 1
exports.ERC20_APPROVE_TRESHOLD = '57896044618658097711785492504343953926634992332820282019728792003956564819968'; // 2^255
exports.ERC20_DEPOSIT_GAS_LIMIT = ethers_1.BigNumber.from('300000'); // 300k
const AMOUNT_EXPONENT_BIT_WIDTH = 5;
const AMOUNT_MANTISSA_BIT_WIDTH = 35;
const FEE_EXPONENT_BIT_WIDTH = 5;
const FEE_MANTISSA_BIT_WIDTH = 11;
function floatToInteger(floatBytes, expBits, mantissaBits, expBaseNumber) {
    if (floatBytes.length * 8 !== mantissaBits + expBits) {
        throw new Error('Float unpacking, incorrect input length');
    }
    const bits = buffer2bitsBE(floatBytes).reverse();
    let exponent = ethers_1.BigNumber.from(0);
    let expPow2 = ethers_1.BigNumber.from(1);
    for (let i = 0; i < expBits; i++) {
        if (bits[i] === 1) {
            exponent = exponent.add(expPow2);
        }
        expPow2 = expPow2.mul(2);
    }
    exponent = ethers_1.BigNumber.from(expBaseNumber).pow(exponent);
    let mantissa = ethers_1.BigNumber.from(0);
    let mantissaPow2 = ethers_1.BigNumber.from(1);
    for (let i = expBits; i < expBits + mantissaBits; i++) {
        if (bits[i] === 1) {
            mantissa = mantissa.add(mantissaPow2);
        }
        mantissaPow2 = mantissaPow2.mul(2);
    }
    return exponent.mul(mantissa);
}
exports.floatToInteger = floatToInteger;
function bitsIntoBytesInBEOrder(bits) {
    if (bits.length % 8 !== 0) {
        throw new Error('wrong number of bits to pack');
    }
    const nBytes = bits.length / 8;
    const resultBytes = new Uint8Array(nBytes);
    for (let byte = 0; byte < nBytes; ++byte) {
        let value = 0;
        if (bits[byte * 8] === 1) {
            value |= 0x80;
        }
        if (bits[byte * 8 + 1] === 1) {
            value |= 0x40;
        }
        if (bits[byte * 8 + 2] === 1) {
            value |= 0x20;
        }
        if (bits[byte * 8 + 3] === 1) {
            value |= 0x10;
        }
        if (bits[byte * 8 + 4] === 1) {
            value |= 0x08;
        }
        if (bits[byte * 8 + 5] === 1) {
            value |= 0x04;
        }
        if (bits[byte * 8 + 6] === 1) {
            value |= 0x02;
        }
        if (bits[byte * 8 + 7] === 1) {
            value |= 0x01;
        }
        resultBytes[byte] = value;
    }
    return resultBytes;
}
exports.bitsIntoBytesInBEOrder = bitsIntoBytesInBEOrder;
function numberToBits(integer, bits) {
    const result = [];
    for (let i = 0; i < bits; i++) {
        result.push(integer & 1);
        integer /= 2;
    }
    return result;
}
function integerToFloat(integer, exp_bits, mantissa_bits, exp_base) {
    const max_exponent = ethers_1.BigNumber.from(10).pow(Math.pow(2, exp_bits) - 1);
    const max_mantissa = ethers_1.BigNumber.from(2)
        .pow(mantissa_bits)
        .sub(1);
    if (integer.gt(max_mantissa.mul(max_exponent))) {
        throw new Error('Integer is too big');
    }
    let exponent = 0;
    let mantissa = integer;
    while (mantissa.gt(max_mantissa)) {
        mantissa = mantissa.div(exp_base);
        exponent += 1;
    }
    // encode into bits. First bits of mantissa in LE order
    const encoding = [];
    encoding.push(...numberToBits(exponent, exp_bits));
    const mantissaNumber = mantissa.toNumber();
    encoding.push(...numberToBits(mantissaNumber, mantissa_bits));
    return bitsIntoBytesInBEOrder(encoding.reverse()).reverse();
}
exports.integerToFloat = integerToFloat;
function reverseBits(buffer) {
    const reversed = buffer.reverse();
    reversed.map(b => {
        // reverse bits in byte
        b = ((b & 0xf0) >> 4) | ((b & 0x0f) << 4);
        b = ((b & 0xcc) >> 2) | ((b & 0x33) << 2);
        b = ((b & 0xaa) >> 1) | ((b & 0x55) << 1);
        return b;
    });
    return reversed;
}
exports.reverseBits = reverseBits;
function packAmount(amount) {
    return reverseBits(integerToFloat(amount, AMOUNT_EXPONENT_BIT_WIDTH, AMOUNT_MANTISSA_BIT_WIDTH, 10));
}
function packFee(amount) {
    return reverseBits(integerToFloat(amount, FEE_EXPONENT_BIT_WIDTH, FEE_MANTISSA_BIT_WIDTH, 10));
}
function packAmountChecked(amount) {
    if (closestPackableTransactionAmount(amount.toString()).toString() !== amount.toString()) {
        throw new Error('Transaction Amount is not packable');
    }
    return packAmount(amount);
}
exports.packAmountChecked = packAmountChecked;
function packFeeChecked(amount) {
    if (closestPackableTransactionFee(amount.toString()).toString() !== amount.toString()) {
        throw new Error('Fee Amount is not packable');
    }
    return packFee(amount);
}
exports.packFeeChecked = packFeeChecked;
/**
 * packs and unpacks the amount, returning the closest packed value.
 * e.g 1000000003 => 1000000000
 * @param amount
 */
function closestPackableTransactionAmount(amount) {
    const packedAmount = packAmount(ethers_1.BigNumber.from(amount));
    return floatToInteger(packedAmount, AMOUNT_EXPONENT_BIT_WIDTH, AMOUNT_MANTISSA_BIT_WIDTH, 10);
}
exports.closestPackableTransactionAmount = closestPackableTransactionAmount;
function isTransactionAmountPackable(amount) {
    return closestPackableTransactionAmount(amount).eq(amount);
}
exports.isTransactionAmountPackable = isTransactionAmountPackable;
/**
 * packs and unpacks the amount, returning the closest packed value.
 * e.g 1000000003 => 1000000000
 * @param fee
 */
function closestPackableTransactionFee(fee) {
    const packedFee = packFee(ethers_1.BigNumber.from(fee));
    return floatToInteger(packedFee, FEE_EXPONENT_BIT_WIDTH, FEE_MANTISSA_BIT_WIDTH, 10);
}
exports.closestPackableTransactionFee = closestPackableTransactionFee;
function isTransactionFeePackable(amount) {
    return closestPackableTransactionFee(amount).eq(amount);
}
exports.isTransactionFeePackable = isTransactionFeePackable;
function buffer2bitsBE(buff) {
    const res = new Array(buff.length * 8);
    for (let i = 0; i < buff.length; i++) {
        const b = buff[i];
        res[i * 8] = (b & 0x80) !== 0 ? 1 : 0;
        res[i * 8 + 1] = (b & 0x40) !== 0 ? 1 : 0;
        res[i * 8 + 2] = (b & 0x20) !== 0 ? 1 : 0;
        res[i * 8 + 3] = (b & 0x10) !== 0 ? 1 : 0;
        res[i * 8 + 4] = (b & 0x08) !== 0 ? 1 : 0;
        res[i * 8 + 5] = (b & 0x04) !== 0 ? 1 : 0;
        res[i * 8 + 6] = (b & 0x02) !== 0 ? 1 : 0;
        res[i * 8 + 7] = (b & 0x01) !== 0 ? 1 : 0;
    }
    return res;
}
exports.buffer2bitsBE = buffer2bitsBE;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function isTokenETH(token) {
    return token === 'ETH' || token === ethers_1.constants.AddressZero;
}
exports.isTokenETH = isTokenETH;
class TokenSet {
    // TODO: Replace with hardcoded list of tokens for final version this is temporary solution
    //  so that we can get list of the supported from zksync node,
    constructor(tokensBySymbol) {
        this.tokensBySymbol = tokensBySymbol;
    }
    resolveTokenObject(tokenLike) {
        if (this.tokensBySymbol[tokenLike]) {
            return this.tokensBySymbol[tokenLike];
        }
        for (const token of Object.values(this.tokensBySymbol)) {
            if (token.address.toLocaleLowerCase() == tokenLike.toLocaleLowerCase()) {
                return token;
            }
        }
        throw new Error(`Token ${tokenLike} is not supported`);
    }
    isTokenTransferAmountPackable(tokenLike, amount) {
        const parsedAmount = this.parseToken(tokenLike, amount);
        return isTransactionAmountPackable(parsedAmount);
    }
    isTokenTransactionFeePackable(tokenLike, amount) {
        const parsedAmount = this.parseToken(tokenLike, amount);
        return isTransactionFeePackable(parsedAmount);
    }
    formatToken(tokenLike, amount) {
        const decimals = this.resolveTokenDecimals(tokenLike);
        return ethers_1.utils.formatUnits(amount, decimals);
    }
    parseToken(tokenLike, amount) {
        const decimals = this.resolveTokenDecimals(tokenLike);
        return ethers_1.utils.parseUnits(amount, decimals);
    }
    resolveTokenDecimals(tokenLike) {
        return this.resolveTokenObject(tokenLike).decimals;
    }
    resolveTokenId(tokenLike) {
        return this.resolveTokenObject(tokenLike).id;
    }
    resolveTokenAddress(tokenLike) {
        return this.resolveTokenObject(tokenLike).address;
    }
    resolveTokenSymbol(tokenLike) {
        return this.resolveTokenObject(tokenLike).symbol;
    }
}
exports.TokenSet = TokenSet;
function getChangePubkeyMessage(pubKeyHash, nonce, accountId) {
    const msgNonce = ethers_1.utils.hexlify(serializeNonce(nonce));
    const msgAccId = ethers_1.utils.hexlify(serializeAccountId(accountId));
    const pubKeyHashHex = pubKeyHash.replace('sync:', '').toLowerCase();
    const message = 'Register zkSync pubkey:\n\n' +
        `${pubKeyHashHex}\n` +
        `nonce: ${msgNonce}\n` +
        `account id: ${msgAccId}\n\n` +
        'Only sign this message for a trusted client!';
    return message;
}
exports.getChangePubkeyMessage = getChangePubkeyMessage;
function getSignedBytesFromMessage(message, addPrefix) {
    let messageBytes = typeof message === 'string' ? ethers_1.utils.toUtf8Bytes(message) : ethers_1.utils.arrayify(message);
    if (addPrefix) {
        messageBytes = ethers_1.utils.concat([
            ethers_1.utils.toUtf8Bytes(`\x19Ethereum Signed Message:\n${messageBytes.length}`),
            messageBytes
        ]);
    }
    return messageBytes;
}
exports.getSignedBytesFromMessage = getSignedBytesFromMessage;
function signMessagePersonalAPI(signer, message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (signer instanceof ethers_1.ethers.providers.JsonRpcSigner) {
            return signer.provider.send('personal_sign', [ethers_1.utils.hexlify(message), yield signer.getAddress()]).then(sign => sign, err => {
                // We check for method name in the error string because error messages about invalid method name
                // often contain method name.
                if (err.message.includes('personal_sign')) {
                    // If no "personal_sign", use "eth_sign"
                    return signer.signMessage(message);
                }
                throw err;
            });
        }
        else {
            return signer.signMessage(message);
        }
    });
}
exports.signMessagePersonalAPI = signMessagePersonalAPI;
function verifyERC1271Signature(address, message, signature, signerOrProvider) {
    return __awaiter(this, void 0, void 0, function* () {
        const EIP1271_SUCCESS_VALUE = '0x20c13b0b';
        const eip1271 = new ethers_1.ethers.Contract(address, exports.IEIP1271_INTERFACE, signerOrProvider);
        const eipRetVal = yield eip1271.isValidSignature(ethers_1.utils.hexlify(message), signature);
        return eipRetVal === EIP1271_SUCCESS_VALUE;
    });
}
exports.verifyERC1271Signature = verifyERC1271Signature;
function getEthSignatureType(provider, message, signature, address) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageNoPrefix = getSignedBytesFromMessage(message, false);
        const messageWithPrefix = getSignedBytesFromMessage(message, true);
        const prefixedECDSASigner = ethers_1.utils.recoverAddress(ethers_1.utils.keccak256(messageWithPrefix), signature);
        if (prefixedECDSASigner.toLowerCase() === address.toLowerCase()) {
            return {
                verificationMethod: 'ECDSA',
                isSignedMsgPrefixed: true
            };
        }
        const notPrefixedMsgECDSASigner = ethers_1.utils.recoverAddress(ethers_1.utils.keccak256(messageNoPrefix), signature);
        if (notPrefixedMsgECDSASigner.toLowerCase() === address.toLowerCase()) {
            return {
                verificationMethod: 'ECDSA',
                isSignedMsgPrefixed: false
            };
        }
        return {
            verificationMethod: 'ERC-1271',
            isSignedMsgPrefixed: true
        };
    });
}
exports.getEthSignatureType = getEthSignatureType;
function removeAddressPrefix(address) {
    if (address.startsWith('0x'))
        return address.substr(2);
    if (address.startsWith('sync:'))
        return address.substr(5);
    throw new Error('ETH address must start with \'0x\' and PubKeyHash must start with \'sync:\'');
}
// PubKeyHash or eth address
function serializeAddress(address) {
    const prefixlessAddress = removeAddressPrefix(address);
    const addressBytes = ethers_1.utils.arrayify(`0x${prefixlessAddress}`);
    if (addressBytes.length !== 20) {
        throw new Error('Address must be 20 bytes long');
    }
    return addressBytes;
}
exports.serializeAddress = serializeAddress;
function serializeAccountId(accountId) {
    if (accountId < 0) {
        throw new Error('Negative account id');
    }
    if (accountId >= MAX_NUMBER_OF_ACCOUNTS) {
        throw new Error('AccountId is too big');
    }
    return numberToBytesBE(accountId, 4);
}
exports.serializeAccountId = serializeAccountId;
function serializeTokenId(tokenId) {
    if (tokenId < 0) {
        throw new Error('Negative tokenId');
    }
    if (tokenId >= MAX_NUMBER_OF_TOKENS) {
        throw new Error('TokenId is too big');
    }
    return numberToBytesBE(tokenId, 2);
}
exports.serializeTokenId = serializeTokenId;
function serializeAmountPacked(amount) {
    return packAmountChecked(ethers_1.BigNumber.from(amount));
}
exports.serializeAmountPacked = serializeAmountPacked;
function serializeAmountFull(amount) {
    const bnAmount = ethers_1.BigNumber.from(amount);
    return ethers_1.utils.zeroPad(ethers_1.utils.arrayify(bnAmount), 16);
}
exports.serializeAmountFull = serializeAmountFull;
function serializeFeePacked(fee) {
    return packFeeChecked(ethers_1.BigNumber.from(fee));
}
exports.serializeFeePacked = serializeFeePacked;
function serializeNonce(nonce) {
    if (nonce < 0) {
        throw new Error('Negative nonce');
    }
    return numberToBytesBE(nonce, 4);
}
exports.serializeNonce = serializeNonce;
function numberToBytesBE(number, bytes) {
    const result = new Uint8Array(bytes);
    for (let i = bytes - 1; i >= 0; i--) {
        result[i] = number & 0xff;
        number >>= 8;
    }
    return result;
}
