import ajax from 'superagent';

const baseUrl = 'http://private-88d50-promoo.apiary-mock.com/';

/**
 * Get offers
 */

export function getOffers(limit, offset) {
    return ajax
        .get(baseUrl + 'offer/' + limit + '/' + offset)
        .set('Accept', 'application/json');
}

/**
 * Get offers by city
 */

export function getOffersByCity(city, limit, offset) {
    return ajax
        .get(baseUrl + 'offer/by_city/' + city + '/' + limit + '/' + offset)
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}

/**
 * Get offers by user
 */

export function getOffersByUser(user, limit, offset) {
    return ajax
        .get(baseUrl + 'offer/by_user/' + user + '/' + limit + '/' + offset)
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}

/**
 * Post offer
 */

export function postOffer(data) {
    return ajax
        .post('offer')
        .send(data)
        .set('Accept', 'application/json')
        //.set('Authorization', this.userStore.getToken());
}

/**
 * Ger offer comments
 */

export function getOfferComments(_id) {
    return ajax
        .get(baseUrl + 'offer_comment/' + _id)
        .set('Accept', 'application/json');
    //.set('Authorization', this.userStore.getToken());
}

/**
 * Post offer comment
 */

export function postOfferComment(data) {
    return ajax
        .post('offer_comment')
        .send(data)
        .set('Accept', 'application/json')
        //.set('Authorization', this.userStore.getToken());
}

/**
 * Post offer report
 */

export function postOfferReport(data) {
    return ajax
        .post('offer/report')
        .send(data)
        .set('Accept', 'application/json')
        //.set('Authorization', this.userStore.getToken());
}

/**
 * Post offer evaluation
 */

export function postOfferEvaluation(data) {
    return ajax
        .post('offer_evaluation')
        .send(data)
        .set('Accept', 'application/json')
        //.set('Authorization', this.userStore.getToken());
}