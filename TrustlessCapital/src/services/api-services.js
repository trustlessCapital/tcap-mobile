//const SERVICE_HOST = "http://10.0.2.2:7001";
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


export default APIService = {
  signUp,
  signIn,
  resendOTP,
  verifyOTP
};