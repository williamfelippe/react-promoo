import Store from 'store';

export function createUserStore(_id, name, email, photo, token, settings) {
    const data = {
        _id: _id,
        name: name,
        email: email,
        photo: photo,
        token: token,
        settings: settings
    };

    Store.set('user', data);
    console.log(Store.get('user'));
}

export function getLoggedUserId() {
    const user = Store.get('user');
    verifyIfExistUserInformationSaved(user);
    return user._id;
}

export function getLoggedUserAvatar() {
    const user = Store.get('user');
    verifyIfExistUserInformationSaved(user);
    return user.photo;
}

export function getLoggedUserName() {
    const user = Store.get('user');
    verifyIfExistUserInformationSaved(user);
    return user.name;
}

export function getLoggedUserEmail() {
    const user = Store.get('user');
    verifyIfExistUserInformationSaved(user);
    return user.email;
}

export function getLoggedUserToken() {
    const user = Store.get('user');
    verifyIfExistUserInformationSaved(user);
    return user.token;
}

export function isLoggedIn() {
    const user = Store.get('user');
    return (user && user !== undefined);
}

export function clear() {
    Store.clear();
}

function verifyIfExistUserInformationSaved(user) {
    if (user === null && user === undefined) {
        return '';
    }
}
