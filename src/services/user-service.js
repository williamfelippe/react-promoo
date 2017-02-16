import axios from 'axios';

export function getUser(_id) {
    return axios.get('user/' + _id, {headers: {'Authorization': ''}});
}

export function putEmail(data) {
    return axios.put('user/change_email', data, {headers: {'Authorization': ''}});
}

export function putPassword(data) {
    return axios.put('user/change_password', data, {headers: {'Authorization': ''}});
}

export function putUserPhoto(data) {
    return axios.put('user/upload_photo', data, {headers: {'Authorization': ''}});
}

export function postUserReport(data) {
    return axios.post('user/report', data, {headers: {'Authorization': ''}});
}