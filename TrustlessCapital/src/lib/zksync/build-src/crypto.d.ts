import { Signature } from "./types";
export { privateKeyFromSeed } from "../../zksync-crypto/zksync_crypto_wasm";
export declare function signTransactionBytes(privKey: Uint8Array, bytes: Uint8Array): Signature;
export declare function privateKeyToPubKeyHash(privateKey: Uint8Array): string;
export declare function loadZkSyncCrypto(wasmFileUrl?: string): Promise<void>;
