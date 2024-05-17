export const authRequest = () => ({
    type: 'AUTH_REQUEST',
});

export const authFailure = () => ({
    type: 'AUTH_FAILURE',
});

export const authSucess = ({user}) => ({
    type: 'AUTH_SUCCESS',
    payload: {user}
});

export const logOut = () => ({
    type: 'LOG_OUT',
});