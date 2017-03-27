import axios from "axios";

export const getUser = (_id) => {
    return axios.get('user/' + _id);
};

export const putEmail = (data) => {
    return axios.put('user/change_email', data);
};

export const putPassword = (data) => {
    return axios.put('user/change_password', data);
};

export const putUserPhoto = (data) => {
    return axios.put('user/upload_photo', data);
};

export const postUserReport = (data) => {
    return axios.post('user/report', data);
};