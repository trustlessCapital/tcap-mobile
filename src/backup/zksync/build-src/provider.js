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
exports.ETHProxy = exports.Provider = exports.getDefaultProvider = void 0;
const transport_1 = require("./transport");
const ethers_1 = require("ethers");
const utils_1 = require("./utils");
function getDefaultProvider(network, transport = "WS") {
    return __awaiter(this, void 0, void 0, function* () {
        if (network === "localhost") {
            if (transport === "WS") {
                return yield Provider.newWebsocketProvider("ws://127.0.0.1:3031");
            }
            else if (transport === "HTTP") {
                return yield Provider.newHttpProvider("http://127.0.0.1:3030");
            }
        }
        else if (network === "ropsten") {
            if (transport === "WS") {
                return yield Provider.newWebsocketProvider("wss://ropsten-api.zksync.io/jsrpc-ws");
            }
            else if (transport === "HTTP") {
                return yield Provider.newHttpProvider("https://ropsten-api.zksync.io/jsrpc");
            }
        }
        else if (network === "rinkeby") {
            if (transport === "WS") {
                return yield Provider.newWebsocketProvider("wss://rinkeby-api.zksync.io/jsrpc-ws");
            }
            else if (transport === "HTTP") {
                return yield Provider.newHttpProvider("https://rinkeby-api.zksync.io/jsrpc");
            }
        }
        else if (network === "mainnet") {
            if (transport === "WS") {
                return yield Provider.newWebsocketProvider("wss://api.zksync.io/jsrpc-ws");
            }
            else if (transport === "HTTP") {
                return yield Provider.newHttpProvider("https://api.zksync.io/jsrpc");
            }
        }
        else {
            throw new Error(`Ethereum network ${network} is not supported`);
        }
    });
}
exports.getDefaultProvider = getDefaultProvider;
class Provider {
    constructor(transport) {
        this.transport = transport;
        // For HTTP provider
        this.pollIntervalMilliSecs = 500;
    }
    static newWebsocketProvider(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = yield transport_1.WSTransport.connect(address);
            const provider = new Provider(transport);
            provider.contractAddress = yield provider.getContractAddress();
            provider.tokenSet = new utils_1.TokenSet(yield provider.getTokens());
            return provider;
        });
    }
    static newHttpProvider(address = "http://127.0.0.1:3030", pollIntervalMilliSecs) {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = new transport_1.HTTPTransport(address);
            const provider = new Provider(transport);
            if (pollIntervalMilliSecs) {
                provider.pollIntervalMilliSecs = pollIntervalMilliSecs;
            }
            provider.contractAddress = yield provider.getContractAddress();
            provider.tokenSet = new utils_1.TokenSet(yield provider.getTokens());
            return provider;
        });
    }
    // return transaction hash (e.g. sync-tx:dead..beef)
    submitTx(tx, signature, fastProcessing) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request("tx_submit", [tx, signature, fastProcessing]);
        });
    }
    getContractAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request("contract_address", null);
        });
    }
    getTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request("tokens", null);
        });
    }
    getState(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request("account_info", [address]);
        });
    }
    // get transaction status by its hash (e.g. 0xdead..beef)
    getTxReceipt(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request("tx_info", [txHash]);
        });
    }
    getPriorityOpStatus(serialId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request("ethop_info", [serialId]);
        });
    }
    getConfirmationsForEthOpAmount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.request("get_confirmations_for_eth_op_amount", []);
        });
    }
    notifyPriorityOp(serialId, action) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.transport.subscriptionsSupported()) {
                return yield new Promise((resolve) => {
                    const subscribe = this.transport.subscribe("ethop_subscribe", [serialId, action], "ethop_unsubscribe", (resp) => {
                        subscribe.then((sub) => sub.unsubscribe());
                        resolve(resp);
                    });
                });
            }
            else {
                while (true) {
                    const priorOpStatus = yield this.getPriorityOpStatus(serialId);
                    const notifyDone = action === "COMMIT"
                        ? priorOpStatus.block && priorOpStatus.block.committed
                        : priorOpStatus.block && priorOpStatus.block.verified;
                    if (notifyDone) {
                        return priorOpStatus;
                    }
                    else {
                        yield utils_1.sleep(this.pollIntervalMilliSecs);
                    }
                }
            }
        });
    }
    notifyTransaction(hash, action) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.transport.subscriptionsSupported()) {
                return yield new Promise((resolve) => {
                    const subscribe = this.transport.subscribe("tx_subscribe", [hash, action], "tx_unsubscribe", (resp) => {
                        subscribe.then((sub) => sub.unsubscribe());
                        resolve(resp);
                    });
                });
            }
            else {
                while (true) {
                    const transactionStatus = yield this.getTxReceipt(hash);
                    const notifyDone = action == "COMMIT"
                        ? transactionStatus.block && transactionStatus.block.committed
                        : transactionStatus.block && transactionStatus.block.verified;
                    if (notifyDone) {
                        return transactionStatus;
                    }
                    else {
                        yield utils_1.sleep(this.pollIntervalMilliSecs);
                    }
                }
            }
        });
    }
    getTransactionFee(txType, address, tokenLike) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionFee = yield this.transport.request("get_tx_fee", [txType, address.toString(), tokenLike]);
            return {
                feeType: transactionFee.feeType,
                gasTxAmount: ethers_1.BigNumber.from(transactionFee.gasTxAmount),
                gasPriceWei: ethers_1.BigNumber.from(transactionFee.gasPriceWei),
                gasFee: ethers_1.BigNumber.from(transactionFee.gasFee),
                zkpFee: ethers_1.BigNumber.from(transactionFee.zkpFee),
                totalFee: ethers_1.BigNumber.from(transactionFee.totalFee),
            };
        });
    }
    getTokenPrice(tokenLike) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenPrice = yield this.transport.request("get_token_price", [tokenLike]);
            return parseFloat(tokenPrice);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transport.disconnect();
        });
    }
}
exports.Provider = Provider;
class ETHProxy {
    constructor(ethersProvider, contractAddress) {
        this.ethersProvider = ethersProvider;
        this.contractAddress = contractAddress;
        this.governanceContract = new ethers_1.Contract(this.contractAddress.govContract, utils_1.SYNC_GOV_CONTRACT_INTERFACE, this.ethersProvider);
        this.mainContract = new ethers_1.Contract(this.contractAddress.mainContract, utils_1.SYNC_MAIN_CONTRACT_INTERFACE, this.ethersProvider);
    }
    resolveTokenId(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (utils_1.isTokenETH(token)) {
                return 0;
            }
            else {
                const tokenId = yield this.governanceContract.tokenIds(token);
                if (tokenId == 0) {
                    throw new Error(`ERC20 token ${token} is not supported`);
                }
                return tokenId;
            }
        });
    }
}
exports.ETHProxy = ETHProxy;
