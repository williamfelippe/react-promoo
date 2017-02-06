import axios from 'axios';

const baseUrl = 'http://private-88d50-promoo.apiary-mock.com/';

/**
 * Get offers
 */

export function getOffers(limit, offset) {
    return axios.get(baseUrl + 'offer/' + limit + '/' + offset);
}

/**
 * Get offers by city
 */

export function getOffersByCity(city, limit, offset) {
    return axios.get(baseUrl + 'offer/by_city/' + city + '/' + limit + '/' + offset);
}

/**
 * Get offers by user
 */

export function getOffersByUser(user, limit, offset) {
    return axios.get(baseUrl + 'offer/by_user/' + user + '/' + limit + '/' + offset);
}

/**
 * Post offer
 */

export function postOffer(data) {
    axios.post(baseUrl + 'offer', data, {headers: {'Authorization': ''}});
}

/**
 * Ger offer comments
 */

export function getOfferComments(_id) {
    axios.get(baseUrl + 'offer_comment/' + _id, {headers: {'Authorization': ''}});
}

/**
 * Post offer comment
 */

export function postOfferComment(data) {
    axios.post(baseUrl + 'offer_comment', data, {headers: {'Authorization': ''}});
}

/**
 * Post offer report
 */

export function postOfferReport(data) {
    axios.post(baseUrl + 'offer/report', data, {headers: {'Authorization': ''}});
}

/**
 * Post offer evaluation
 */

export function postOfferEvaluation(data) {
    axios.post(baseUrl + 'offer_evaluation', data, {headers: {'Authorization': ''}});
}

export function getOfferCategories() {
    return axios.get(baseUrl + 'offer_category');
}