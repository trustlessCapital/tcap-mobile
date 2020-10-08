/**
 * Modified By @name Sukumar_Abhijeet,
 */

import Config from '../@Config/default';
const { BASE_PATH,API_PREFIX } = Config;

function processResponse(response) {
    if (!response.ok) {
        throw response;
    }
    response = response.json();
    return response;
}

function signUp(email, phone) {
    const url = BASE_PATH + API_PREFIX + '/user/signup';
    console.log('URL',url);
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: phone,
            email,
        }),
    }).then(processResponse);
}

function recoverAccount(email, phone) {
    return fetch(BASE_PATH + API_PREFIX + '/user/recoveraccount', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: phone,
            email,
        }),
    }).then(processResponse);
}

function signIn(email, phone) {
    return fetch(BASE_PATH + API_PREFIX + '/user/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: phone,
            email
        }),
    }).then(processResponse);
}

function verifyOTP(email, phone, otp) {
    return fetch(BASE_PATH + API_PREFIX + '/user/verifyOTP', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: phone,
            email,
            otp
        }),
    }).then(processResponse);
}

function resendOTP(email, phone) {
    return fetch(BASE_PATH + API_PREFIX + '/user/resendOTP', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: phone,
            email
        }),
    }).then(processResponse);
}

function mnemonicGenerated(email, phone) {
    return fetch(BASE_PATH + API_PREFIX + '/user/mnemonicgenerated', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phoneNumber: phone,
            email,
        }),
    }).then(processResponse);
}

function getExchangePrice() {
    const url =  `${BASE_PATH}/v1/price/all`;
    console.log('Address url',url);
    return fetch(url, {
        method: 'GET',
    }).then(processResponse);
}

function getEtheriumBalance(address) {
    const url = `${BASE_PATH}/v1/l1/balance/all/${address}`;
    console.log('URL FOR BALANCE',url);
    return fetch(url, {
        method: 'GET',
    }).then(processResponse);
}


export default (APIService = {
    signUp,
    recoverAccount,
    signIn,
    resendOTP,
    verifyOTP,
    mnemonicGenerated,
    getExchangePrice,
    getEtheriumBalance,
});