import ajax from 'superagent';

const baseUrl = 'http://private-88d50-promoo.apiary-mock.com/';

export function getStores(limit, offset) {
    return ajax
        .get(baseUrl + 'store/' + limit + '/' + offset)
        .set('Accept', 'application/json');
}

export function getStoresByUser(user, limit, offset) {
    return ajax
        .get(baseUrl + 'store/by_user/' + user + '/' +  limit + '/' + offset)
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}

export function getStoresByCity(city) {
    return ajax
        .get(baseUrl + 'store/by_city/' + city)
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}

export function postStore(data) {
    return ajax
        .post(baseUrl + 'store')
        .send(data)
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}

export function getStoreCategories() {
    return ajax
        .get(baseUrl + 'store_category')
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}