import axios from 'axios';

export const getUser = (_id) => {
    return axios.get('user/' + _id, {headers: {'Authorization': ''}});
}

export const putEmail = (data) => {
    return axios.put('user/change_email', data, {headers: {'Authorization': ''}});
}

export const putPassword = (data) => {
    return axios.put('user/change_password', data, {headers: {'Authorization': ''}});
}

export const putUserPhoto = (data) => {
    return axios.put('user/upload_photo', data, {headers: {'Authorization': ''}});
}

export const postUserReport = (data) => {
    return axios.post('user/report', data, {headers: {'Authorization': ''}});
}