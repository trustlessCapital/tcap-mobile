# Setting up zksync library for react-native


## STEP 1: Fetch zksync node modules

Create a empty directory and run below commands

```bash
$ cd <empty-direcotry>
$ npm install --save zksync 
# or 
$ npm install --save zksync@<version>
```

## STEP 2: Setup binaryen 

Setup the wasm tools from [binaryen]([https://github.com/WebAssembly/binaryen]) using below commands

```bash
$ git clone https://github.com/WebAssembly/binaryen.git
$ cmake . && make
$ cd ..
```
 If this step throws any errors, install missing dependencies. Once it is successful you must find 'wasmjs' executable in bin directory


## STEP 3: Fetch zksync repo which contain zksync-crypto rust project

Create a empty directory and run below commands

```bash
$ git clone https://github.com/matter-labs/zksync.git
$ cd zksync/sdk/zksync-crypto
```


## STEP 3: Generate JS file from WASM file

React-native uses **zksync-crypto-bundler.js** file, so we need to convert **zksync-crypto-node_bg.wasm** file to JS.

```bash
$ cd dist/
$ <path-to-binaryen-repo>/bin/wasm2js zksync-crypto-bundler_bg.wasm -o zksync_crypto_wasm.js
```

This will create **zksync_crypto_wasm.js** file in our directory 

## STEP 4: Resolving dependencies

Place the zksync library in lib folder of the react-native project as per existing directory structure.

Remove the following lines in zksync_crypto_wasm.js

```javascript
import { __wbg_new_59cb74e423758ede } from './zksync-crypto-bundler.js';
import { __wbg_stack_558ba5917b466edd } from './zksync-crypto-bundler.js';
import { __wbg_error_4bb6c2a97407129a } from './zksync-crypto-bundler.js';
import { __wbindgen_object_drop_ref } from './zksync-crypto-bundler.js';
```

In the bottom, Replace the lines 

```javascript
var zksync_crypto_init = retasmFunc.zksync_crypto_init;
var privateKeyFromSeed = retasmFunc.privateKeyFromSeed;
var private_key_to_pubkey_hash = retasmFunc.private_key_to_pubkey_hash;
var sign_musig = retasmFunc.sign_musig;
var __wbindgen_malloc = retasmFunc.__wbindgen_malloc;
var __wbindgen_free = retasmFunc.__wbindgen_free;
var __wbindgen_realloc = retasmFunc.__wbindgen_realloc;
```

With 

```javascript
wasm = {
  zksync_crypto_init: retasmFunc.zksync_crypto_init,
  memory: retasmFunc.memory,
  privateKeyFromSeed: retasmFunc.privateKeyFromSeed,
  private_key_to_pubkey_hash: retasmFunc.private_key_to_pubkey_hash,
  sign_musig: retasmFunc.sign_musig,
  __wbindgen_malloc: retasmFunc.__wbindgen_malloc,
  __wbindgen_free: retasmFunc.__wbindgen_free,
  __wbindgen_realloc: retasmFunc.__wbindgen_realloc
};
```

Copy the contents of zksync/sdk/zksync-crypto/dist/zksync-crypto-bundler.js file and place it in zksync_crypto_wasm.js file in the beginning and repalce the line 

```javascript
import * as wasm from './zksync-crypto-bundler_bg.wasm';
```

with 

```javascript
let wasm;
const TextEncoder = require('text-encoding-polyfill').TextEncoder;
const TextDecoder = require('text-encoding-polyfill').TextDecoder;
```

Also replace the  ```require("zksync-crypto");``` with ```require("<path-to-zksync_crypto_wasm.js-file>");``` in zksync libraries wherever it is used.
