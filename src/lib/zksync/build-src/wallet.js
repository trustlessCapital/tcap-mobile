"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSignedTransaction = exports.Wallet = void 0;
const ethers_1 = require("ethers");
const provider_1 = require("./provider");
const signer_1 = require("./signer");
const utils_1 = require("./utils");
class ZKSyncTxError extends Error {
    constructor(message, value) {
        super(message);
        this.value = value;
    }
}
class Wallet {
    constructor(ethSigner, cachedAddress, signer, accountId, ethSignerType) {
        this.ethSigner = ethSigner;
        this.cachedAddress = cachedAddress;
        this.signer = signer;
        this.accountId = accountId;
        this.ethSignerType = ethSignerType;
    }
    connect(provider) {
        this.provider = provider;
        return this;
    }
    static fromEthSigner(ethWallet, provider, signer, accountId, ethSignerType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (signer == null) {
                const signerResult = yield signer_1.Signer.fromETHSignature(ethWallet);
                signer = signerResult.signer;
                ethSignerType = ethSignerType || signerResult.ethSignatureType;
            }
            else if (ethSignerType == null) {
                throw new Error("If you passed signer, you must also pass ethSignerType.");
            }
            const wallet = new Wallet(ethWallet, yield ethWallet.getAddress(), signer, accountId, ethSignerType);
            wallet.connect(provider);
            return wallet;
        });
    }
    static fromEthSignerNoKeys(ethWallet, provider, accountId, ethSignerType) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = new Wallet(ethWallet, yield ethWallet.getAddress(), undefined, accountId, ethSignerType);
            wallet.connect(provider);
            return wallet;
        });
    }
    getEthMessageSignature(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ethSignerType == null) {
                throw new Error("ethSignerType is unknown");
            }
            const signedBytes = utils_1.getSignedBytesFromMessage(message, !this.ethSignerType.isSignedMsgPrefixed);
            const signature = yield utils_1.signMessagePersonalAPI(this.ethSigner, signedBytes);
            return {
                type: this.ethSignerType.verificationMethod === "ECDSA" ? "EthereumSignature" : "EIP1271Signature",
                signature,
            };
        });
    }
    signSyncTransfer(transfer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.signer) {
                throw new Error("ZKSync signer is required for sending zksync transactions.");
            }
            yield this.setRequiredAccountIdFromServer("Transfer funds");
            const tokenId = yield this.provider.tokenSet.resolveTokenId(transfer.token);
            const transactionData = {
                accountId: this.accountId,
                from: this.address(),
                to: transfer.to,
                tokenId,
                amount: transfer.amount,
                fee: transfer.fee,
                nonce: transfer.nonce,
            };
            const stringAmount = this.provider.tokenSet.formatToken(transfer.token, transfer.amount);
            const stringFee = this.provider.tokenSet.formatToken(transfer.token, transfer.fee);
            const stringToken = yield this.provider.tokenSet.resolveTokenSymbol(transfer.token);
            const humanReadableTxInfo = `Transfer ${stringAmount} ${stringToken}\n` +
                `To: ${transfer.to.toLowerCase()}\n` +
                `Nonce: ${transfer.nonce}\n` +
                `Fee: ${stringFee} ${stringToken}\n` +
                `Account Id: ${this.accountId}`;
            const txMessageEthSignature = yield this.getEthMessageSignature(humanReadableTxInfo);
            const signedTransferTransaction = this.signer.signSyncTransfer(transactionData);
            return {
                tx: signedTransferTransaction,
                ethereumSignature: txMessageEthSignature,
            };
        });
    }
    syncTransfer(transfer) {
        return __awaiter(this, void 0, void 0, function* () {
            transfer.nonce = transfer.nonce != null ? yield this.getNonce(transfer.nonce) : yield this.getNonce();
            if (transfer.fee == null) {
                const fullFee = yield this.provider.getTransactionFee("Transfer", transfer.to, transfer.token);
                transfer.fee = fullFee.totalFee;
            }
            const signedTransferTransaction = yield this.signSyncTransfer(transfer);
            return submitSignedTransaction(signedTransferTransaction, this.provider);
        });
    }
    signWithdrawFromSyncToEthereum(withdraw) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.signer) {
                throw new Error("ZKSync signer is required for sending zksync transactions.");
            }
            yield this.setRequiredAccountIdFromServer("Withdraw funds");
            const tokenId = yield this.provider.tokenSet.resolveTokenId(withdraw.token);
            const transactionData = {
                accountId: this.accountId,
                from: this.address(),
                ethAddress: withdraw.ethAddress,
                tokenId,
                amount: withdraw.amount,
                fee: withdraw.fee,
                nonce: withdraw.nonce,
            };
            const stringAmount = this.provider.tokenSet.formatToken(withdraw.token, withdraw.amount);
            const stringFee = this.provider.tokenSet.formatToken(withdraw.token, withdraw.fee);
            const stringToken = yield this.provider.tokenSet.resolveTokenSymbol(withdraw.token);
            const humanReadableTxInfo = `Withdraw ${stringAmount} ${stringToken}\n` +
                `To: ${withdraw.ethAddress.toLowerCase()}\n` +
                `Nonce: ${withdraw.nonce}\n` +
                `Fee: ${stringFee} ${stringToken}\n` +
                `Account Id: ${this.accountId}`;
            const txMessageEthSignature = yield this.getEthMessageSignature(humanReadableTxInfo);
            const signedWithdrawTransaction = this.signer.signSyncWithdraw(transactionData);
            return {
                tx: signedWithdrawTransaction,
                ethereumSignature: txMessageEthSignature,
            };
        });
    }
    withdrawFromSyncToEthereum(withdraw) {
        return __awaiter(this, void 0, void 0, function* () {
            withdraw.nonce = withdraw.nonce != null ? yield this.getNonce(withdraw.nonce) : yield this.getNonce();
            if (withdraw.fee == null) {
                const feeType = withdraw.fastProcessing === true ? "FastWithdraw" : "Withdraw";
                const fullFee = yield this.provider.getTransactionFee(feeType, withdraw.ethAddress, withdraw.token);
                withdraw.fee = fullFee.totalFee;
            }
            const signedWithdrawTransaction = yield this.signWithdrawFromSyncToEthereum(withdraw);
            return submitSignedTransaction(signedWithdrawTransaction, this.provider, withdraw.fastProcessing);
        });
    }
    isSigningKeySet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.signer) {
                throw new Error("ZKSync signer is required for current pubkey calculation.");
            }
            const currentPubKeyHash = yield this.getCurrentPubKeyHash();
            const signerPubKeyHash = this.signer.pubKeyHash();
            return currentPubKeyHash === signerPubKeyHash;
        });
    }
    signSetSigningKey(nonce, onchainAuth = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.signer) {
                throw new Error("ZKSync signer is required for current pubkey calculation.");
            }
            const newPubKeyHash = this.signer.pubKeyHash();
            yield this.setRequiredAccountIdFromServer("Set Signing Key");
            const changePubKeyMessage = utils_1.getChangePubkeyMessage(newPubKeyHash, nonce, this.accountId);
            const ethSignature = onchainAuth ? null : (yield this.getEthMessageSignature(changePubKeyMessage)).signature;
            const changePubKeyTx = {
                type: "ChangePubKey",
                accountId: this.accountId,
                account: this.address(),
                newPkHash: this.signer.pubKeyHash(),
                nonce,
                ethSignature,
            };
            return {
                tx: changePubKeyTx,
            };
        });
    }
    setSigningKey(nonce = "committed", onchainAuth = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const numNonce = yield this.getNonce(nonce);
            const txData = yield this.signSetSigningKey(numNonce, onchainAuth);
            const currentPubKeyHash = yield this.getCurrentPubKeyHash();
            if (currentPubKeyHash === txData.tx.newPkHash) {
                throw new Error("Current signing key is already set");
            }
            return submitSignedTransaction(txData, this.provider);
        });
    }
    isOnchainAuthSigningKeySet(nonce = "committed") {
        return __awaiter(this, void 0, void 0, function* () {
            const mainZkSyncContract = new ethers_1.Contract(this.provider.contractAddress.mainContract, utils_1.SYNC_MAIN_CONTRACT_INTERFACE, this.ethSigner);
            const numNonce = yield this.getNonce(nonce);
            const onchainAuthFact = yield mainZkSyncContract.authFacts(this.address(), numNonce);
            return onchainAuthFact !== "0x0000000000000000000000000000000000000000000000000000000000000000";
        });
    }
    onchainAuthSigningKey(nonce = "committed", ethTxOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.signer) {
                throw new Error("ZKSync signer is required for current pubkey calculation.");
            }
            const currentPubKeyHash = yield this.getCurrentPubKeyHash();
            const newPubKeyHash = this.signer.pubKeyHash();
            if (currentPubKeyHash === newPubKeyHash) {
                throw new Error("Current PubKeyHash is the same as new");
            }
            const numNonce = yield this.getNonce(nonce);
            const mainZkSyncContract = new ethers_1.Contract(this.provider.contractAddress.mainContract, utils_1.SYNC_MAIN_CONTRACT_INTERFACE, this.ethSigner);
            return mainZkSyncContract.setAuthPubkeyHash(newPubKeyHash.replace("sync:", "0x"), numNonce, Object.assign({ gasLimit: ethers_1.BigNumber.from("200000") }, ethTxOptions));
        });
    }
    getCurrentPubKeyHash() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.provider.getState(this.address())).committed.pubKeyHash;
        });
    }
    getNonce(nonce = "committed") {
        return __awaiter(this, void 0, void 0, function* () {
            if (nonce === "committed") {
                return (yield this.provider.getState(this.address())).committed.nonce;
            }
            else if (typeof nonce === "number") {
                return nonce;
            }
        });
    }
    getAccountId() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.provider.getState(this.address())).id;
        });
    }
    address() {
        return this.cachedAddress;
    }
    getAccountState() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.provider.getState(this.address());
        });
    }
    getBalance(token, type = "committed") {
        return __awaiter(this, void 0, void 0, function* () {
            const accountState = yield this.getAccountState();
            const tokenSymbol = this.provider.tokenSet.resolveTokenSymbol(token);
            let balance;
            if (type === "committed") {
                balance = accountState.committed.balances[tokenSymbol] || "0";
            }
            else {
                balance = accountState.verified.balances[tokenSymbol] || "0";
            }
            return ethers_1.BigNumber.from(balance);
        });
    }
    getEthereumBalance(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let balance;
            if (utils_1.isTokenETH(token)) {
                balance = yield this.ethSigner.provider.getBalance(this.cachedAddress);
            }
            else {
                const erc20contract = new ethers_1.Contract(this.provider.tokenSet.resolveTokenAddress(token), utils_1.IERC20_INTERFACE, this.ethSigner);
                balance = yield erc20contract.balanceOf(this.cachedAddress);
            }
            return balance;
        });
    }
    isERC20DepositsApproved(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (utils_1.isTokenETH(token)) {
                throw Error("ETH token does not need approval.");
            }
            const tokenAddress = this.provider.tokenSet.resolveTokenAddress(token);
            const erc20contract = new ethers_1.Contract(tokenAddress, utils_1.IERC20_INTERFACE, this.ethSigner);
            const currentAllowance = yield erc20contract.allowance(this.address(), this.provider.contractAddress.mainContract);
            return ethers_1.BigNumber.from(currentAllowance).gte(utils_1.ERC20_APPROVE_TRESHOLD);
        });
    }
    approveERC20TokenDeposits(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (utils_1.isTokenETH(token)) {
                throw Error("ETH token does not need approval.");
            }
            const tokenAddress = this.provider.tokenSet.resolveTokenAddress(token);
            const erc20contract = new ethers_1.Contract(tokenAddress, utils_1.IERC20_INTERFACE, this.ethSigner);
            return erc20contract.approve(this.provider.contractAddress.mainContract, utils_1.MAX_ERC20_APPROVE_AMOUNT);
        });
    }
    depositToSyncFromEthereum(deposit) {
        return __awaiter(this, void 0, void 0, function* () {
            const gasPrice = yield this.ethSigner.provider.getGasPrice();
            const mainZkSyncContract = new ethers_1.Contract(this.provider.contractAddress.mainContract, utils_1.SYNC_MAIN_CONTRACT_INTERFACE, this.ethSigner);
            let ethTransaction;
            if (utils_1.isTokenETH(deposit.token)) {
                ethTransaction = yield mainZkSyncContract.depositETH(deposit.depositTo, Object.assign({ value: ethers_1.BigNumber.from(deposit.amount), gasLimit: ethers_1.BigNumber.from("200000"), gasPrice }, deposit.ethTxOptions));
            }
            else {
                const tokenAddress = this.provider.tokenSet.resolveTokenAddress(deposit.token);
                // ERC20 token deposit
                const erc20contract = new ethers_1.Contract(tokenAddress, utils_1.IERC20_INTERFACE, this.ethSigner);
                let nonce;
                if (deposit.approveDepositAmountForERC20) {
                    const approveTx = yield erc20contract.approve(this.provider.contractAddress.mainContract, deposit.amount);
                    nonce = approveTx.nonce + 1;
                }
                const args = [
                    tokenAddress,
                    deposit.amount,
                    deposit.depositTo,
                    Object.assign({ nonce,
                        gasPrice }, deposit.ethTxOptions),
                ];
                // We set gas limit only if user does not set it using ethTxOptions.
                const txRequest = args[args.length - 1];
                if (txRequest.gasLimit == null) {
                    const gasEstimate = yield mainZkSyncContract.estimateGas
                        .depositERC20(...args)
                        .then((estimate) => estimate, (_err) => ethers_1.BigNumber.from("0"));
                    txRequest.gasLimit = gasEstimate.gte(utils_1.ERC20_DEPOSIT_GAS_LIMIT) ? gasEstimate : utils_1.ERC20_DEPOSIT_GAS_LIMIT;
                    args[args.length - 1] = txRequest;
                }
                ethTransaction = yield mainZkSyncContract.depositERC20(...args);
            }
            return new ETHOperation(ethTransaction, this.provider);
        });
    }
    emergencyWithdraw(withdraw) {
        return __awaiter(this, void 0, void 0, function* () {
            const gasPrice = yield this.ethSigner.provider.getGasPrice();
            const ethProxy = new provider_1.ETHProxy(this.ethSigner.provider, this.provider.contractAddress);
            let accountId;
            if (withdraw.accountId != null) {
                accountId = withdraw.accountId;
            }
            else if (this.accountId !== undefined) {
                accountId = this.accountId;
            }
            else {
                const accountState = yield this.getAccountState();
                if (!accountState.id) {
                    throw new Error("Can't resolve account id from the zkSync node");
                }
                accountId = accountState.id;
            }
            const mainZkSyncContract = new ethers_1.Contract(ethProxy.contractAddress.mainContract, utils_1.SYNC_MAIN_CONTRACT_INTERFACE, this.ethSigner);
            const tokenAddress = this.provider.tokenSet.resolveTokenAddress(withdraw.token);
            const ethTransaction = yield mainZkSyncContract.fullExit(accountId, tokenAddress, Object.assign({ gasLimit: ethers_1.BigNumber.from("500000"), gasPrice }, withdraw.ethTxOptions));
            return new ETHOperation(ethTransaction, this.provider);
        });
    }
    setRequiredAccountIdFromServer(actionName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.accountId === undefined) {
                const accountIdFromServer = yield this.getAccountId();
                if (accountIdFromServer == null) {
                    throw new Error(`Failed to ${actionName}: Account does not exist in the zkSync network`);
                }
                else {
                    this.accountId = accountIdFromServer;
                }
            }
        });
    }
}
exports.Wallet = Wallet;
class ETHOperation {
    constructor(ethTx, zkSyncProvider) {
        this.ethTx = ethTx;
        this.zkSyncProvider = zkSyncProvider;
        this.state = "Sent";
    }
    awaitEthereumTxCommit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state !== "Sent")
                return;
            const txReceipt = yield this.ethTx.wait();
            for (const log of txReceipt.logs) {
                try {
                    const priorityQueueLog = utils_1.SYNC_MAIN_CONTRACT_INTERFACE.parseLog(log);
                    if (priorityQueueLog && priorityQueueLog.args.serialId != null) {
                        this.priorityOpId = priorityQueueLog.args.serialId;
                    }
                    // tslint:disable-next-line:no-empty
                }
                catch (_a) { }
            }
            if (!this.priorityOpId) {
                throw new Error("Failed to parse tx logs");
            }
            this.state = "Mined";
            return txReceipt;
        });
    }
    awaitReceipt() {
        return __awaiter(this, void 0, void 0, function* () {
            this.throwErrorIfFailedState();
            yield this.awaitEthereumTxCommit();
            if (this.state !== "Mined")
                return;
            const receipt = yield this.zkSyncProvider.notifyPriorityOp(this.priorityOpId.toNumber(), "COMMIT");
            if (!receipt.executed) {
                this.setErrorState(new ZKSyncTxError("Priority operation failed", receipt));
                this.throwErrorIfFailedState();
            }
            this.state = "Committed";
            return receipt;
        });
    }
    awaitVerifyReceipt() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.awaitReceipt();
            if (this.state !== "Committed")
                return;
            const receipt = yield this.zkSyncProvider.notifyPriorityOp(this.priorityOpId.toNumber(), "VERIFY");
            this.state = "Verified";
            return receipt;
        });
    }
    setErrorState(error) {
        this.state = "Failed";
        this.error = error;
    }
    throwErrorIfFailedState() {
        if (this.state === "Failed")
            throw this.error;
    }
}
class Transaction {
    constructor(txData, txHash, sidechainProvider) {
        this.txData = txData;
        this.txHash = txHash;
        this.sidechainProvider = sidechainProvider;
        this.state = "Sent";
    }
    awaitReceipt() {
        return __awaiter(this, void 0, void 0, function* () {
            this.throwErrorIfFailedState();
            if (this.state !== "Sent")
                return;
            const receipt = yield this.sidechainProvider.notifyTransaction(this.txHash, "COMMIT");
            if (!receipt.success) {
                this.setErrorState(new ZKSyncTxError(`zkSync transaction failed: ${receipt.failReason}`, receipt));
                this.throwErrorIfFailedState();
            }
            this.state = "Committed";
            return receipt;
        });
    }
    awaitVerifyReceipt() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.awaitReceipt();
            const receipt = yield this.sidechainProvider.notifyTransaction(this.txHash, "VERIFY");
            this.state = "Verified";
            return receipt;
        });
    }
    setErrorState(error) {
        this.state = "Failed";
        this.error = error;
    }
    throwErrorIfFailedState() {
        if (this.state === "Failed")
            throw this.error;
    }
}
function submitSignedTransaction(signedTx, provider, fastProcessing) {
    return __awaiter(this, void 0, void 0, function* () {
        const transactionHash = yield provider.submitTx(signedTx.tx, signedTx.ethereumSignature, fastProcessing);
        return new Transaction(signedTx, transactionHash, provider);
    });
}
exports.submitSignedTransaction = submitSignedTransaction;
