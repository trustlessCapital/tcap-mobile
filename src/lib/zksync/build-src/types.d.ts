import { BigNumber, BigNumberish } from "ethers";
export declare type Address = string;
export declare type PubKeyHash = string;
export declare type TokenLike = TokenSymbol | TokenAddress;
export declare type TokenSymbol = string;
export declare type TokenAddress = string;
export declare type Nonce = number | "committed";
export interface AccountState {
    address: Address;
    id?: number;
    depositing: {
        balances: {
            [token: string]: {
                amount: BigNumberish;
                expectedAcceptBlock: number;
            };
        };
    };
    committed: {
        balances: {
            [token: string]: BigNumberish;
        };
        nonce: number;
        pubKeyHash: PubKeyHash;
    };
    verified: {
        balances: {
            [token: string]: BigNumberish;
        };
        nonce: number;
        pubKeyHash: PubKeyHash;
    };
}
export declare type EthSignerType = {
    verificationMethod: "ECDSA" | "ERC-1271";
    isSignedMsgPrefixed: boolean;
};
export interface TxEthSignature {
    type: "EthereumSignature" | "EIP1271Signature";
    signature: string;
}
export interface Signature {
    pubKey: string;
    signature: string;
}
export interface Transfer {
    type: "Transfer";
    accountId: number;
    from: Address;
    to: Address;
    token: number;
    amount: BigNumberish;
    fee: BigNumberish;
    nonce: number;
    signature: Signature;
}
export interface Withdraw {
    type: "Withdraw";
    accountId: number;
    from: Address;
    to: Address;
    token: number;
    amount: BigNumberish;
    fee: BigNumberish;
    nonce: number;
    signature: Signature;
}
export interface ChangePubKey {
    type: "ChangePubKey";
    accountId: number;
    account: Address;
    newPkHash: PubKeyHash;
    nonce: number;
    ethSignature: string;
}
export interface CloseAccount {
    type: "Close";
    account: Address;
    nonce: number;
    signature: Signature;
}
export interface SignedTransaction {
    tx: Transfer | Withdraw | ChangePubKey | CloseAccount;
    ethereumSignature?: TxEthSignature;
}
export interface BlockInfo {
    blockNumber: number;
    committed: boolean;
    verified: boolean;
}
export interface TransactionReceipt {
    executed: boolean;
    success?: boolean;
    failReason?: string;
    block?: BlockInfo;
}
export interface PriorityOperationReceipt {
    executed: boolean;
    block?: BlockInfo;
}
export interface ContractAddress {
    mainContract: string;
    govContract: string;
}
export interface Tokens {
    [token: string]: {
        address: string;
        id: number;
        symbol: string;
        decimals: number;
    };
}
export interface Fee {
    feeType: "Withdraw" | "Transfer" | "TransferToNew" | "FastWithdraw";
    gasTxAmount: BigNumber;
    gasPriceWei: BigNumber;
    gasFee: BigNumber;
    zkpFee: BigNumber;
    totalFee: BigNumber;
}
