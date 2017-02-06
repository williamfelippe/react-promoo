import axios from 'axios';

const baseUrl = 'http://private-88d50-promoo.apiary-mock.com/';

export function getStores(limit, offset) {
    return axios.get(baseUrl + 'store/' + limit + '/' + offset);
}

export function getStoresByUser(user, limit, offset) {
    return axios.get(baseUrl + 'store/by_user/' + user + '/' + limit + '/' + offset);
}

export function getStoresByCity(city, limit, offset) {
    return axios.get(baseUrl + 'store/by_city/' + city + '/' + limit + '/' + offset);
}

export function postStore(data) {
    return axios.post(baseUrl + 'store', data, {headers: {'Authorization': ''}});
}

export function getStoreCategories() {
    return axios.get(baseUrl + 'store_category');
}