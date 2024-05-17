import { configureStore } from '@reduxjs/toolkit'
import { authReducers } from './reducers/authReducer';
import { LoadingFullScreenReducer } from './reducers/loadingReducer';
import { ToastReducer } from './reducers/toastReducer';

const store = configureStore({
    reducer: {
        auth: authReducers,
        loadingFullScreen: LoadingFullScreenReducer,
        toast: ToastReducer
    }
});

export default store;