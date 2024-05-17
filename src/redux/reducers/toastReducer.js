const initialState = {
    show: false,
    text: null,
    icon: null,
    type: null
}

export const ToastReducer = (state = initialState, action) => {
    switch (action.type){
        case 'SHOW_TOAST':
            return {
                ...state,
                show: true,
                text: action.payload.text,
                icon: action.payload.icon,
                type: action.payload.type
            };
        case 'HIDE_TOAST':
            return {
                ...state,
                show: false
            }
        default:
            return state;
    }
}
