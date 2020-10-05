const SERVICE_HOST = 'http://192.168.43.59:7001';
const ACCOUNTX_HOST = 'http://192.168.43.59:7001';
const API_PREFIX = "/api";

function processResponse(response) {
  if (!response.ok) {
    throw response;
  }
  response = response.json();
  return response;
}

function signUp(email, phone) {
  const url = SERVICE_HOST + API_PREFIX + '/user/signup';
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
  return fetch(SERVICE_HOST + API_PREFIX + '/user/recoveraccount', {
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
  return fetch(SERVICE_HOST + API_PREFIX + '/user/login', {
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
  return fetch(SERVICE_HOST + API_PREFIX + '/user/verifyOTP', {
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
  return fetch(SERVICE_HOST + API_PREFIX + '/user/resendOTP', {
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
  return fetch(SERVICE_HOST + API_PREFIX + '/user/mnemonicgenerated', {
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
  const url =  `${ACCOUNTX_HOST}/v1/price/all`;
  console.log('Address url',url);
  return fetch(url, {
    method: 'GET',
  }).then(processResponse);
}

function getEtheriumBalance(address) {
  const url = `${ACCOUNTX_HOST}/v1/l1/balance/all/${address}`;
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