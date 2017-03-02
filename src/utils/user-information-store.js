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
}

export function getLoggedUserId() {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user._id : -1;
}

export function getLoggedUserAvatar() {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.photo : null;
}

export function getLoggedUserName() {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.name : "";
}

export function getLoggedUserEmail() {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.email : "";
}

export function getLoggedUserToken() {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.token : "";
}

export function getLoggedUser() {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user : null;
}

export function isLoggedIn() {
    const user = Store.get('user');
    return (user && user !== undefined);
}

export function clear() {
    Store.clear();
}

function verifyIfExistUserInformationSaved(user) {
    return (user && user !== undefined);
}
