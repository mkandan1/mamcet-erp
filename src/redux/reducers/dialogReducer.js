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

const initialState2 = {
    show: false,
}


export const MarkAllocationDialogReducer = (state = initialState2, action) => {
    switch (action.type){
        case 'SHOW_MA':
            return {
                ...state,
                show: true
            };
        case 'HIDE_MA':
            return {
                ...state,
                show: false
            }
        default:
            return state;
    }
}

const initialState3 = {
    show: false,
}


export const ImportStudentsDataReducer = (state = initialState3, action) => {
    switch (action.type){
        case 'SHOW_S':
            return {
                ...state,
                show: true
            };
        case 'HIDE_S':
            return {
                ...state,
                show: false
            }
        default:
            return state;
    }
}