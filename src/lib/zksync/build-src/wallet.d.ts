import { BigNumber, BigNumberish, ContractTransaction, ethers } from "ethers";
import { Provider } from "./provider";
import { Signer } from "./signer";
import { AccountState, Address, TokenLike, Nonce, PriorityOperationReceipt, TransactionReceipt, PubKeyHash, TxEthSignature, EthSignerType, SignedTransaction } from "./types";
declare class ZKSyncTxError extends Error {
    value: PriorityOperationReceipt | TransactionReceipt;
    constructor(message: string, value: PriorityOperationReceipt | TransactionReceipt);
}
export declare class Wallet {
    ethSigner: ethers.Signer;
    cachedAddress: Address;
    signer?: Signer;
    accountId?: number;
    ethSignerType?: EthSignerType;
    provider: Provider;
    private constructor();
    connect(provider: Provider): this;
    static fromEthSigner(ethWallet: ethers.Signer, provider: Provider, signer?: Signer, accountId?: number, ethSignerType?: EthSignerType): Promise<Wallet>;
    static fromEthSignerNoKeys(ethWallet: ethers.Signer, provider: Provider, accountId?: number, ethSignerType?: EthSignerType): Promise<Wallet>;
    getEthMessageSignature(message: string): Promise<TxEthSignature>;
    signSyncTransfer(transfer: {
        to: Address;
        token: TokenLike;
        amount: BigNumberish;
        fee: BigNumberish;
        nonce: number;
    }): Promise<SignedTransaction>;
    syncTransfer(transfer: {
        to: Address;
        token: TokenLike;
        amount: BigNumberish;
        fee?: BigNumberish;
        nonce?: Nonce;
    }): Promise<Transaction>;
    signWithdrawFromSyncToEthereum(withdraw: {
        ethAddress: string;
        token: TokenLike;
        amount: BigNumberish;
        fee: BigNumberish;
        nonce: number;
    }): Promise<SignedTransaction>;
    withdrawFromSyncToEthereum(withdraw: {
        ethAddress: string;
        token: TokenLike;
        amount: BigNumberish;
        fee?: BigNumberish;
        nonce?: Nonce;
        fastProcessing?: boolean;
    }): Promise<Transaction>;
    isSigningKeySet(): Promise<boolean>;
    signSetSigningKey(nonce: number, onchainAuth?: boolean): Promise<SignedTransaction>;
    setSigningKey(nonce?: Nonce, onchainAuth?: boolean): Promise<Transaction>;
    isOnchainAuthSigningKeySet(nonce?: Nonce): Promise<boolean>;
    onchainAuthSigningKey(nonce?: Nonce, ethTxOptions?: ethers.providers.TransactionRequest): Promise<ContractTransaction>;
    getCurrentPubKeyHash(): Promise<PubKeyHash>;
    getNonce(nonce?: Nonce): Promise<number>;
    getAccountId(): Promise<number | undefined>;
    address(): Address;
    getAccountState(): Promise<AccountState>;
    getBalance(token: TokenLike, type?: "committed" | "verified"): Promise<BigNumber>;
    getEthereumBalance(token: TokenLike): Promise<BigNumber>;
    isERC20DepositsApproved(token: TokenLike): Promise<boolean>;
    approveERC20TokenDeposits(token: TokenLike): Promise<ContractTransaction>;
    depositToSyncFromEthereum(deposit: {
        depositTo: Address;
        token: TokenLike;
        amount: BigNumberish;
        ethTxOptions?: ethers.providers.TransactionRequest;
        approveDepositAmountForERC20?: boolean;
    }): Promise<ETHOperation>;
    emergencyWithdraw(withdraw: {
        token: TokenLike;
        accountId?: number;
        ethTxOptions?: ethers.providers.TransactionRequest;
    }): Promise<ETHOperation>;
    private setRequiredAccountIdFromServer;
}
declare class ETHOperation {
    ethTx: ContractTransaction;
    zkSyncProvider: Provider;
    state: "Sent" | "Mined" | "Committed" | "Verified" | "Failed";
    error?: ZKSyncTxError;
    priorityOpId?: BigNumber;
    constructor(ethTx: ContractTransaction, zkSyncProvider: Provider);
    awaitEthereumTxCommit(): Promise<ethers.ContractReceipt>;
    awaitReceipt(): Promise<PriorityOperationReceipt>;
    awaitVerifyReceipt(): Promise<PriorityOperationReceipt>;
    private setErrorState;
    private throwErrorIfFailedState;
}
declare class Transaction {
    txData: any;
    txHash: string;
    sidechainProvider: Provider;
    state: "Sent" | "Committed" | "Verified" | "Failed";
    error?: ZKSyncTxError;
    constructor(txData: any, txHash: string, sidechainProvider: Provider);
    awaitReceipt(): Promise<TransactionReceipt>;
    awaitVerifyReceipt(): Promise<TransactionReceipt>;
    private setErrorState;
    private throwErrorIfFailedState;
}
export declare function submitSignedTransaction(signedTx: SignedTransaction, provider: Provider, fastProcessing?: boolean): Promise<Transaction>;
export {};
