const SERVICE_HOST = 'http://localhost:7001';
const API_PREFIX = "/api";

function processResponse(response) {
  if (!response.ok) {
    throw response;
  }
  response = response.json();
  return response;
}

function signUp(email, phone) {
  return fetch(SERVICE_HOST + API_PREFIX + '/user/signup', {
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
  return fetch(SERVICE_HOST + '/v1/price/all', {
    method: 'GET',
  }).then(processResponse);
}

function getEtheriumBalance(address) {
  return fetch(SERVICE_HOST + '/v1/l1/balance/all/' + address, {
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