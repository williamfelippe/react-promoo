import axios from 'axios';

export function signin(data) {
    return axios.post('authentication/signin', data);
}

export function signup(data) {
    return axios.post('authentication/signup', data);
}

export function forgotPassword(data) {
    return axios.post('authentication/forgot_password', data);
}