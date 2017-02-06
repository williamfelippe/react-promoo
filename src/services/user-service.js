import axios from 'axios';

const baseUrl = 'http://private-88d50-promoo.apiary-mock.com/';

export function getUser(_id) {
    return axios.get(baseUrl + 'user/' + _id, {headers: {'Authorization': ''}});
}

export function putEmail(data) {
    return axios.put(baseUrl + 'user/change_email', data, {headers: {'Authorization': ''}});
}

export function putPassword(data) {
    return axios.put(baseUrl + 'user/change_password', data, {headers: {'Authorization': ''}});
}

export function putUserPhoto(data) {
    return axios.put(baseUrl + 'user/upload_photo', data, {headers: {'Authorization': ''}});
}

export function postUserReport(data) {
    return axios.post(baseUrl + 'user/report', data, {headers: {'Authorization': ''}});
}