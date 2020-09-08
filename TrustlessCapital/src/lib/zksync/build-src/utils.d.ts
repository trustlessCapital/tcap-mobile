import { utils, ethers, BigNumber, BigNumberish } from "ethers";
import { PubKeyHash, TokenAddress, TokenLike, Tokens, TokenSymbol, EthSignerType, Address } from "./types";
export declare const IERC20_INTERFACE: utils.Interface;
export declare const SYNC_MAIN_CONTRACT_INTERFACE: utils.Interface;
export declare const SYNC_GOV_CONTRACT_INTERFACE: utils.Interface;
export declare const IEIP1271_INTERFACE: utils.Interface;
export declare const MAX_ERC20_APPROVE_AMOUNT = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
export declare const ERC20_APPROVE_TRESHOLD = "57896044618658097711785492504343953926634992332820282019728792003956564819968";
export declare const ERC20_DEPOSIT_GAS_LIMIT: ethers.BigNumber;
export declare function floatToInteger(floatBytes: Uint8Array, expBits: number, mantissaBits: number, expBaseNumber: number): BigNumber;
export declare function bitsIntoBytesInBEOrder(bits: number[]): Uint8Array;
export declare function integerToFloat(integer: BigNumber, exp_bits: number, mantissa_bits: number, exp_base: number): Uint8Array;
export declare function reverseBits(buffer: Uint8Array): Uint8Array;
export declare function packAmountChecked(amount: BigNumber): Uint8Array;
export declare function packFeeChecked(amount: BigNumber): Uint8Array;
/**
 * packs and unpacks the amount, returning the closest packed value.
 * e.g 1000000003 => 1000000000
 * @param amount
 */
export declare function closestPackableTransactionAmount(amount: BigNumberish): BigNumber;
export declare function isTransactionAmountPackable(amount: BigNumberish): boolean;
/**
 * packs and unpacks the amount, returning the closest packed value.
 * e.g 1000000003 => 1000000000
 * @param fee
 */
export declare function closestPackableTransactionFee(fee: BigNumberish): BigNumber;
export declare function isTransactionFeePackable(amount: BigNumberish): boolean;
export declare function buffer2bitsBE(buff: any): any[];
export declare function sleep(ms: any): Promise<unknown>;
export declare function isTokenETH(token: TokenLike): boolean;
export declare class TokenSet {
    private tokensBySymbol;
    constructor(tokensBySymbol: Tokens);
    private resolveTokenObject;
    isTokenTransferAmountPackable(tokenLike: TokenLike, amount: string): boolean;
    isTokenTransactionFeePackable(tokenLike: TokenLike, amount: string): boolean;
    formatToken(tokenLike: TokenLike, amount: BigNumberish): string;
    parseToken(tokenLike: TokenLike, amount: string): BigNumber;
    resolveTokenDecimals(tokenLike: TokenLike): number;
    resolveTokenId(tokenLike: TokenLike): number;
    resolveTokenAddress(tokenLike: TokenLike): TokenAddress;
    resolveTokenSymbol(tokenLike: TokenLike): TokenSymbol;
}
export declare function getChangePubkeyMessage(pubKeyHash: PubKeyHash, nonce: number, accountId: number): string;
export declare function getSignedBytesFromMessage(message: utils.BytesLike | string, addPrefix: boolean): Uint8Array;
export declare function signMessagePersonalAPI(signer: ethers.Signer, message: Uint8Array): Promise<string>;
export declare function verifyERC1271Signature(address: string, message: Uint8Array, signature: string, signerOrProvider: ethers.Signer | ethers.providers.Provider): Promise<boolean>;
export declare function getEthSignatureType(provider: ethers.providers.Provider, message: string, signature: string, address: string): Promise<EthSignerType>;
export declare function serializeAddress(address: Address | PubKeyHash): Uint8Array;
export declare function serializeAccountId(accountId: number): Uint8Array;
export declare function serializeTokenId(tokenId: number): Uint8Array;
export declare function serializeAmountPacked(amount: BigNumberish): Uint8Array;
export declare function serializeAmountFull(amount: BigNumberish): Uint8Array;
export declare function serializeFeePacked(fee: BigNumberish): Uint8Array;
export declare function serializeNonce(nonce: number): Uint8Array;
