import axios from "axios";
import {getLoggedUserToken} from "../utils/user-information-store";

export const getStores = (limit, offset, query = null) => {
    return axios.get((query)
        ? `store/${limit}/${offset}${query}`
        : `store/${limit}/${offset}`);
};

export const getStoresByCity = (city) => {
    return axios.get(`store/by_city/${city}`);
};

export const getStoreById = (storeId) => {
    return axios.get('store/' + storeId);
};

export const postStore = (data) => {
    axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
    return axios.post('store', data);
};

export const getStoreCategories = () => {
    return axios.get('store_category');
};

export const postStoreReport = (data) => {
    axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
    return axios.post('store/report', data);
};