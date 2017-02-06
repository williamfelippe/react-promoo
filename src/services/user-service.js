import ajax from 'superagent';

const baseUrl = 'http://private-88d50-promoo.apiary-mock.com/';

export function getUser(_id) {
    return ajax
        .get(baseUrl + 'user/' + _id)
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}

export function putEmail(data) {
    return ajax
        .put(baseUrl + 'user/change_email')
        .send(data)
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}

export function putPassword(data) {
    return ajax
        .put(baseUrl + 'user/change_password')
        .send(data)
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}

export function putUserPhoto(data) {
    return ajax
        .put(baseUrl + 'user/upload_photo')
        .send(data)
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}

export function postUserReport(data) {
    return ajax
        .post(baseUrl + 'user/report')
        .send(data)
        .set('Accept', 'application/json');
        //.set('Authorization', this.userStore.getToken());
}