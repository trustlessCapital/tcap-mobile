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
exports.WSTransport = exports.HTTPTransport = exports.JRPCError = exports.AbstractJSONRPCTransport = void 0;
const axios_1 = require("axios");
const WebSocketAsPromised = require("websocket-as-promised");
const websocket = require("websocket");
const W3CWebSocket = websocket.w3cwebsocket;
class AbstractJSONRPCTransport {
    subscriptionsSupported() {
        return false;
    }
    subscribe(subMethod, subParams, unsubMethod, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("subscription are not supported for this transport");
        });
    }
}
exports.AbstractJSONRPCTransport = AbstractJSONRPCTransport;
// Has jrpcError field which is JRPC error object.
// https://www.jsonrpc.org/specification#error_object
class JRPCError extends Error {
    constructor(message, jrpcError) {
        super(message);
        this.jrpcError = jrpcError;
    }
}
exports.JRPCError = JRPCError;
class Subscription {
    constructor(unsubscribe) {
        this.unsubscribe = unsubscribe;
    }
}
class HTTPTransport extends AbstractJSONRPCTransport {
    constructor(address) {
        super();
        this.address = address;
    }
    // JSON RPC request
    request(method, params = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                id: 1,
                jsonrpc: "2.0",
                method,
                params
            };
            const response = yield axios_1.default.post(this.address, request).then(resp => {
                return resp.data;
            });
            if ("result" in response) {
                return response.result;
            }
            else if ("error" in response) {
                throw new JRPCError("JRPC response error", response.error);
            }
            else {
                throw new Error("Unknown JRPC Error");
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.HTTPTransport = HTTPTransport;
class WSTransport extends AbstractJSONRPCTransport {
    constructor(address) {
        super();
        this.address = address;
        this.ws = new WebSocketAsPromised(address, {
            createWebSocket: url => new W3CWebSocket(url),
            packMessage: data => JSON.stringify(data),
            unpackMessage: data => JSON.parse(data),
            attachRequestId: (data, requestId) => Object.assign({ id: requestId }, data),
            extractRequestId: data => data && data.id
        });
        this.subscriptionCallback = new Map();
        // Call all subscription callbacks
        this.ws.onUnpackedMessage.addListener(data => {
            if (data.params && data.params.subscription) {
                const params = data.params;
                if (this.subscriptionCallback.has(params.subscription)) {
                    this.subscriptionCallback.get(params.subscription)(params.result);
                }
            }
        });
    }
    static connect(address = "ws://127.0.0.1:3031") {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = new WSTransport(address);
            yield transport.ws.open();
            return transport;
        });
    }
    subscriptionsSupported() {
        return true;
    }
    subscribe(subMethod, subParams, unsubMethod, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = { jsonrpc: "2.0", method: subMethod, params: subParams };
            const sub = yield this.ws.sendRequest(req);
            if (sub.error) {
                throw new JRPCError("Subscription failed", sub.error);
            }
            const subId = sub.result;
            this.subscriptionCallback.set(subId, cb);
            const unsubscribe = () => __awaiter(this, void 0, void 0, function* () {
                const unsubRep = yield this.ws.sendRequest({
                    jsonrpc: "2.0",
                    method: unsubMethod,
                    params: [subId]
                });
                if (unsubRep.error) {
                    throw new JRPCError(`Unsubscribe failed: ${subId}, ${JSON.stringify(unsubRep.error)}`, unsubRep.error);
                }
                if (unsubRep.result !== true) {
                    throw new Error(`Unsubscription failed, returned false: ${subId}`);
                }
                this.subscriptionCallback.delete(subId);
            });
            return new Subscription(unsubscribe);
        });
    }
    // JSON RPC request
    request(method, params = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                jsonrpc: "2.0",
                method,
                params
            };
            const response = yield this.ws.sendRequest(request);
            if ("result" in response) {
                return response.result;
            }
            else if ("error" in response) {
                throw new JRPCError("JRPC response error", response.error);
            }
            else {
                throw new Error("Unknown JRPC Error");
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ws.close();
        });
    }
}
exports.WSTransport = WSTransport;
