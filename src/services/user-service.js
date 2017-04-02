import axios from "axios";
import {getLoggedUserToken} from "../utils/user-information-store";

export const getUser = (_id) => {
    return axios.get(`user/${_id}`);
};

export const putEmail = (data) => {
    axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
    return axios.put('user/change_email', data);
};

export const putPassword = (data) => {
    axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
    return axios.put('user/change_password', data);
};

export const putUserPhoto = (data) => {
    axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
    return axios.put('user/upload_photo', data);
};

export const postUserReport = (data) => {
    axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
    return axios.post('user/report', data);
};