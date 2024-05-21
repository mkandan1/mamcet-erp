const initialState = {
    show: false,
}

export const SubjectImportDialogReducer = (state = initialState, action) => {
    switch (action.type){
        case 'SHOW':
            return {
                ...state,
                show: true
            };
        case 'HIDE':
            return {
                ...state,
                show: false
            }
        default:
            return state;
    }
}