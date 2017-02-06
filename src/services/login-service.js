import ajax from 'superagent';

const baseUrl = 'http://private-88d50-promoo.apiary-mock.com/';

export function signin(data) {
  return ajax
    .post(baseUrl + 'authentication/signin')
    .send(data)
    .set('Accept', 'application/json');
}

export function signup(data) {
  return ajax
    .post(baseUrl + 'authentication/signup')
    .send(data)
    .set('Accept', 'application/json');
}

export function forgotPassword(data) {
  return ajax
    .post(baseUrl + 'authentication/forgot_password')
    .send(data)
    .set('Accept', 'application/json');
}