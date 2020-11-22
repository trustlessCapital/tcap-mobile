
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
    UPDATE_SELECTED_CURRECNCY,UPDATE_CURRENCY_LIST
} from '../constants/currency-constants';

import * as CURRENCY from '../../@Constants/Jsons/currencyList.json';

const initialState = {
    selectedCurrency:{base: 'USD', exchange: 'USD', value: 1,symbol: '$'},
    currencyList : CURRENCY.currencyList
};

const  currencyReducer = (state = initialState,action) =>{
    const {type,currency,list} = action;
    switch(type)
    {
    case  UPDATE_SELECTED_CURRECNCY:
        return { ...state,selectedCurrency:currency};
    
    case UPDATE_CURRENCY_LIST:
        return {...state,currencyList:list};
        
    default :   
        return state;
    }
};

export default currencyReducer;