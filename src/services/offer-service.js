import axios from 'axios';

/**
 * Get offers
 */

export function getOffers(limit, offset) {
    return axios.get('offer/' + limit + '/' + offset);
}

/**
 * Get offer by id
 */
export function getOfferById(offerId) {
    return axios.get('offer/' + offerId);
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
    return axios.post('offer', data);
}

/**
 * Get offer comments
 */

export function getOfferComments(_id) {
    return axios.get('offer_comment/' + _id);
}

/**
 * Post offer comment
 */

export function postOfferComment(data) {
    return axios.post('offer_comment', data);
}

/**
 * Post offer report
 */

export function postOfferReport(data) {
    return axios.post('offer/report', data);
}

/**
 * Post offer evaluation
 */

export function postOfferEvaluation(data) {
    return axios.post('offer_evaluation', data);
}

/**
 * Get offer categories
 */

export function getOfferCategories() {
    return axios.get('offer_category');
}