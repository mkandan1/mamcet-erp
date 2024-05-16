import { configureStore } from '@reduxjs/toolkit'
import { authReducers } from './reducers/authReducer';

const store = configureStore({
    reducer: {
        auth: authReducers
    }
});

export default store;