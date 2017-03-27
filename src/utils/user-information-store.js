import Store from "store";

export const createUserStore = (_id, name, email, photo, token, settings) => {
    const data = {
        _id: _id,
        name: name,
        email: email,
        photo: photo,
        token: token,
        settings: settings
    };

    Store.set('user', data);
};

export const getLoggedUserId = () => {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user._id : -1;
};

export const getLoggedUserAvatar = () => {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.photo : null;
};

export const getLoggedUserName = () => {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.name : "";
};

export const getLoggedUserEmail = () => {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.email : "";
};

export const getLoggedUserToken = () => {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.token : "";
};

export const getLoggedUser = () => {
    const user = Store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user : null;
};

export const isLoggedIn = () => {
    const user = Store.get('user');
    return (user && user !== undefined);
};

export const clearUserStore = () => {
    Store.clear();
};

function verifyIfExistUserInformationSaved(user) {
    return (user && user !== undefined);
}