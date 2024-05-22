import { configureStore } from '@reduxjs/toolkit'
import { authReducers } from './reducers/authReducer';
import { LoadingFullScreenReducer } from './reducers/loadingReducer';
import { ToastReducer } from './reducers/toastReducer';
import { ImportStudentsDataReducer, MarkAllocationDialogReducer, SubjectImportDialogReducer } from './reducers/dialogReducer';

const store = configureStore({
    reducer: {
        auth: authReducers,
        loadingFullScreen: LoadingFullScreenReducer,
        toast: ToastReducer,
        subjectImportDialog: SubjectImportDialogReducer,
        markAllocationDialog: MarkAllocationDialogReducer,
        importStudentsDataDialog: ImportStudentsDataReducer,
    }
});

export default store;