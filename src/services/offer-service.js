/**
 * Get offers
 */
import axios from "axios";
import {getLoggedUserToken} from "../utils/user-information-store";

export const getOffers = (limit, offset) => {
    return axios.get(`offer/${limit}/${offset}`);
};

/**
 * Get offer by id
 */
export const getOfferById = (offerId) => {
    return axios.get(`offer/${offerId}`);
};


/**
 * Get offers by city
 */

export const getOffersByCity = (city, limit, offset) => {
    return axios.get(`offer/by_city/${city}/${limit}/${offset}`);
};

/**
 * Get offers by user
 */

export const getOffersByUser = (user, limit, offset) => {
    axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
    return axios.get(`offer/by_user/${user}/${limit}/${offset}`);
};

/**
 * Get offers by user
 */
export const getOffersByStore = (store, limit, offset) => {
    return axios.get(`offer/by_store/${store}/${limit}/${offset}`);
};

/**
 * Post offer
 */

export const postOffer = (data) => {
    axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
    return axios.post('offer', data);
};

/**
 * Get offer comments
 */

export const getOfferComments = (_id) => {
    return axios.get(`offer_comment/${_id}`);
};

/**
 * Post offer comment
 */

export const postOfferComment = (data) => {
    return axios.post('offer_comment', data);
};

/**
 * Post offer report
 */

export const postOfferReport = (data) => {
    axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
    return axios.post('offer/report', data);
};

/**
 * Post offer evaluation
 */

export const postOfferEvaluation = (data) => {
    axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
    return axios.post('offer_evaluation', data);
};

/**
 * Get offer categories
 */

export const getOfferCategories = () => {
    return axios.get('offer_category');
};