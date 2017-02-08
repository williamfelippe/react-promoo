import Store from 'store';

export function createUserStore(data) {
    Store.set('user', data);
    console.log(Store.get('user'));
}

export function isLoggedIn() {
    const user = Store.get('user');
    return (user && user !== undefined);
}
