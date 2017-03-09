import axios from 'axios';

/**
 * Get offers
 */

export function getOffers(limit, offset) {
    return axios.get('offer/' + limit + '/' + offset);
}

export function getOfferById(_id) {
    return axios.get('offer/' + _id);
}


/**
 * Get offers by city
 */

export function getOffersByCity(city, limit, offset) {
    return axios.get('offer/by_city/' + city + '/' + limit + '/' + offset);
}

/**
 * Get offers by user
 */

export function getOffersByUser(user, limit, offset) {
    return axios.get('offer/by_user/' + user + '/' + limit + '/' + offset);
}

/**
 * Get offers by user
 */
export function getOffersByStore(store, limit, offset) {
    return axios.get('offer/by_store/' + store + '/' + limit + '/' + offset);
}

/**
 * Post offer
 */

export function postOffer(data) {
    axios.post('offer', data, {headers: {'Authorization': ''}});
}

/**
 * Get offer comments
 */

export function getOfferComments(_id) {
    axios.get('offer_comment/' + _id, {headers: {'Authorization': ''}});
}

/**
 * Post offer comment
 */

export function postOfferComment(data) {
    axios.post('offer_comment', data, {headers: {'Authorization': ''}});
}

/**
 * Post offer report
 */

export function postOfferReport(data) {
    axios.post('offer/report', data, {headers: {'Authorization': ''}});
}

/**
 * Post offer evaluation
 */

export function postOfferEvaluation(data) {
    axios.post('offer_evaluation', data, {headers: {'Authorization': ''}});
}

/**
 * Get offer categories
 */

export function getOfferCategories() {
    return axios.get('offer_category');
}