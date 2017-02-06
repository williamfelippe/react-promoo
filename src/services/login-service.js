import axios from 'axios';

const baseUrl = 'http://private-88d50-promoo.apiary-mock.com/';

export function signin(data) {
    return axios.post(baseUrl + 'authentication/signin', data);
}

export function signup(data) {
    return axios.post(baseUrl + 'authentication/signup', data);
}

export function forgotPassword(data) {
    return axios.post(baseUrl + 'authentication/forgot_password', data);
}