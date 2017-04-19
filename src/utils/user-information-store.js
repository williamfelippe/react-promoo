import store from "store";
import updatePlugin from "store/plugins/update";

store.addPlugin(updatePlugin);

export const createUserstore = (_id, name, email, photo, token, settings) => {
    const data = {
        _id: _id,
        name: name,
        email: email,
        photo: photo,
        token: token,
        settings: settings
    };
    
    store.set('user', data);
};

export const getLoggedUserId = () => {
    const user = store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user._id : -1;
};

export const setLoggedUserAvatar = (photo) => {
    store.update('user', (user) => {
        user.photo = photo
    });
};

export const getLoggedUserAvatar = () => {
    const user = store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.photo : null;
};

export const getLoggedUserName = () => {
    const user = store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.name : "";
};


export const setLoggedUserEmail = (email) => {
    store.update('user', (user) => {
        user.email = email
    });
};

export const getLoggedUserEmail = () => {
    const user = store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.email : "";
};

export const getLoggedUserToken = () => {
    const user = store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user.token : "";
};

export const getLoggedUser = () => {
    const user = store.get('user');
    return (verifyIfExistUserInformationSaved(user)) ? user : null;
};

export const isLoggedIn = () => {
    const user = store.get('user');
    return (user && user !== undefined);
};

export const clearUserStore = () => {
    store.remove('user');
};

function verifyIfExistUserInformationSaved(user) {
    return (user && user !== undefined);
}