import { BigNumberish, ethers } from "ethers";
import { Address, EthSignerType, PubKeyHash, Transfer, Withdraw } from "./types";
export declare class Signer {
    readonly privateKey: Uint8Array;
    private constructor();
    pubKeyHash(): PubKeyHash;
    signSyncTransfer(transfer: {
        accountId: number;
        from: Address;
        to: Address;
        tokenId: number;
        amount: BigNumberish;
        fee: BigNumberish;
        nonce: number;
    }): Transfer;
    signSyncWithdraw(withdraw: {
        accountId: number;
        from: Address;
        ethAddress: string;
        tokenId: number;
        amount: BigNumberish;
        fee: BigNumberish;
        nonce: number;
    }): Withdraw;
    static fromPrivateKey(pk: Uint8Array): Signer;
    static fromSeed(seed: Uint8Array): Signer;
    static fromETHSignature(ethSigner: ethers.Signer): Promise<{
        signer: Signer;
        ethSignatureType: EthSignerType;
    }>;
}
