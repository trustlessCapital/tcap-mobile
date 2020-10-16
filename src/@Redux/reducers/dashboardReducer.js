
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
 * Created By @name Sukumar_Abhijeet,
 */

import { 
    FETCH_ZK_SYNC_ACCOUNT_ASSETS_FAILURE,FETCH_ZK_SYNC_ACCOUNT_ASSETS_REQUEST,FETCH_ZK_SYNC_ACCOUNT_ASSETS_SUCCESS, 
    UPDATE_EXCHANGE_RATES
} from '../constants/dashboard-constants';

import HelperFunctions from '../../@Services/helper-functions';

const initialState = {
    verifiedBalances:[],
    exchangeRates:[]
};

const  dashboardReducer = (state = initialState,action) =>{
    const {type,rates=[]} = action;
    switch(type)
    {
    case UPDATE_EXCHANGE_RATES :
        return {...state,exchangeRates:rates}; 
    case  FETCH_ZK_SYNC_ACCOUNT_ASSETS_REQUEST:
        return { ...state};   
    case FETCH_ZK_SYNC_ACCOUNT_ASSETS_SUCCESS:
    {   
        const {response:{verified:{balances={}}}} = action;
        const balanceArr = HelperFunctions.objectToArray(balances) || [];
        return{...state,verifiedBalances:balanceArr};
    }   
    case FETCH_ZK_SYNC_ACCOUNT_ASSETS_FAILURE:
        return { ...state};

    default :   
        return state;
    }
};

export default dashboardReducer;