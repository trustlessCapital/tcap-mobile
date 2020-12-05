
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
    UPDATE_APP_BACKGROUND_DATE
} from '../constants/localAuthorization-constants';


const initialState = {
    appBackgroundDate : new Date() 
};

const  localAuthorizationReducer = (state = initialState,action) =>{
    const {type,backgroundDate} = action;
    switch(type)
    {
    case  UPDATE_APP_BACKGROUND_DATE:
        return { ...state,appBackgroundDate:backgroundDate};
        
    default :   
        return state;
    }
};

export default localAuthorizationReducer;