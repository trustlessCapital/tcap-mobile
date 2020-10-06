import { AbstractJSONRPCTransport } from "./transport";
import { ethers, BigNumber } from "ethers";
import { AccountState, Address, TokenLike, TransactionReceipt, PriorityOperationReceipt, ContractAddress, Tokens, TokenAddress, TxEthSignature, Fee, ChangePubKeyFee } from "./types";
import { TokenSet } from "./utils";
export declare function getDefaultProvider(network: "localhost" | "rinkeby" | "ropsten" | "mainnet", transport?: "WS" | "HTTP"): Promise<Provider>;
export declare class Provider {
    transport: AbstractJSONRPCTransport;
    contractAddress: ContractAddress;
    tokenSet: TokenSet;
    pollIntervalMilliSecs: number;
    private constructor();
    static newWebsocketProvider(address: string): Promise<Provider>;
    static newHttpProvider(address?: string, pollIntervalMilliSecs?: number): Promise<Provider>;
    submitTx(tx: any, signature?: TxEthSignature, fastProcessing?: boolean): Promise<string>;
    submitTxsBatch(transactions: {
        tx: any;
        signature?: TxEthSignature;
    }[]): Promise<string[]>;
    getContractAddress(): Promise<ContractAddress>;
    getTokens(): Promise<Tokens>;
    getState(address: Address): Promise<AccountState>;
    getTxReceipt(txHash: string): Promise<TransactionReceipt>;
    getPriorityOpStatus(serialId: number): Promise<PriorityOperationReceipt>;
    getConfirmationsForEthOpAmount(): Promise<number>;
    getEthTxForWithdrawal(withdrawal_hash: any): Promise<string>;
    notifyPriorityOp(serialId: number, action: "COMMIT" | "VERIFY"): Promise<PriorityOperationReceipt>;
    notifyTransaction(hash: string, action: "COMMIT" | "VERIFY"): Promise<TransactionReceipt>;
    getTransactionFee(txType: "Withdraw" | "Transfer" | "FastWithdraw" | ChangePubKeyFee, address: Address, tokenLike: TokenLike): Promise<Fee>;
    getTransactionsBatchFee(txTypes: ("Withdraw" | "Transfer" | "FastWithdraw")[], addresses: Address[], tokenLike: TokenLike): Promise<BigNumber>;
    getTokenPrice(tokenLike: TokenLike): Promise<number>;
    disconnect(): Promise<any>;
}
export declare class ETHProxy {
    private ethersProvider;
    contractAddress: ContractAddress;
    private governanceContract;
    private mainContract;
    constructor(ethersProvider: ethers.providers.Provider, contractAddress: ContractAddress);
    resolveTokenId(token: TokenAddress): Promise<number>;
}
