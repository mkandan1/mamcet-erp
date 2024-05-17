import { configureStore } from '@reduxjs/toolkit'
import { authReducers } from './reducers/authReducer';
import { LoadingFullScreenReducer } from './reducers/loadingReducer';

const store = configureStore({
    reducer: {
        auth: authReducers,
        loadingFullScreen: LoadingFullScreenReducer
    }
});

export default store;