import axios from 'axios';

export function getStores(limit, offset) {
    return axios.get('store/' + limit + '/' + offset);
}

export function getStoresByUser(user, limit, offset) {
    return axios.get('store/by_user/' + user + '/' + limit + '/' + offset);
}

export function getStoresByCity(city, limit, offset) {
    return axios.get('store/by_city/' + city + '/' + limit + '/' + offset);
}

export function getStoreById(storeId) {
    return axios.get('store/' + storeId);
}

export function postStore(data) {
    return axios.post('store', data);
}

export function getStoreCategories() {
    return axios.get('store_category');
}