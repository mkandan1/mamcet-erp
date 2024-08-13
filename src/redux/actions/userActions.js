// actions/authActions.js

export const storeUserInfo = (userData) => ({
    type: 'STORE_USER_INFO',
    payload: userData,
});
