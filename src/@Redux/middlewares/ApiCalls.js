
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

const promiseMiddleware = () => {
    return next => action => {

        const { promise, type, ...rest } = action;
    
        if (!promise) return next(action);
    
        const SUCCESS = type + '_SUCCESS';
        const REQUEST = type + '_REQUEST';
        const FAILURE = type + '_FAILURE';
        next({ ...rest, type: REQUEST });
        return promise
            // .then(response => response.json())
            .then(response => {
                next({ ...rest, response: response, type: SUCCESS });
                return true;
            })
            .catch(error => {
                next({ ...rest, error, type: FAILURE });
                return false;
            });
    };
};
export default promiseMiddleware;
