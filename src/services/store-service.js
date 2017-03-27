import axios from "axios";

export const getStores = (limit, offset) => {
    return axios.get('store/' + limit + '/' + offset);
};

export const getStoresByUser = (user, limit, offset) => {
    return axios.get('store/by_user/' + user + '/' + limit + '/' + offset);
};

export const getStoresByCity = (city) => {
    return axios.get('store/by_city/' + city);
};

export const getStoreById = (storeId) => {
    return axios.get('store/' + storeId);
};

export const postStore = (data) => {
    return axios.post('store', data);
};

export const getStoreCategories = () => {
    return axios.get('store_category');
};

export const postStoreReport = (data) => {
    return axios.post('store/report', data);
};