
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
    FETCH_ZK_SYNC_TOKENS_FAILURE,FETCH_ZK_SYNC_TOKENS_REQUEST,FETCH_ZK_SYNC_TOKENS_SUCCESS 
} from '../constants/zkSyncToken-constants';

import ProductionTokens from '../../@Constants/ZkSyncTokens';

const initialState = {
    TOKENS:[...ProductionTokens],
};

const  zkSyncTokenReducer = (state = initialState,action) =>{
    const {type} = action;
    switch(type)
    {
    case  FETCH_ZK_SYNC_TOKENS_REQUEST:
        return { ...state};
        
    case FETCH_ZK_SYNC_TOKENS_SUCCESS:
    {   const {response} = action;
        return{...state,TOKENS:response};
    }
        
    case FETCH_ZK_SYNC_TOKENS_FAILURE:
        return { ...state};

    default :   
        return state;
    }
};

export default zkSyncTokenReducer;