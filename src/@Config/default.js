
// Copyright (C) 2020  Trustless Pvt Ltd. <https://trustless.capital>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Create By @name Sukumar_Abhijeet,
 */

//MAIN ENVIRONMENT
const env = process.env.NODE_ENV;
const devServerIp = 'https://dev.api.trustless.capital';
const prodServerIp = 'https://api.trustless.capital';

//SET ENVIRONMENT
const setEnv = env === 'development';

export default {

    AsyncStorageKey:'Tcap',

    NETWORK : 'rinkeby',

    SUBNET : 'WS',

    BASE_PATH:  setEnv ? devServerIp : prodServerIp,

    API_PREFIX : '/api',

    SECURE_KEY : setEnv ? 'esKWwHMMuo2hspzLzWKvbj7dV7ycPWy4ZXo5uNYj' : 'esKWwHMMuo2hspzLzWKvbj7dV7ycPWy4ZXo5uNYj',

    ACCOUNT_UNLOCK_GAS : 15000,

};
