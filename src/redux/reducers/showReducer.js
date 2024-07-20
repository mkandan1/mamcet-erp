const initialState = {
    show: false,
    element: null
}


export const ShowReducer = (state = initialState, action) => {
    switch (action.type){
        case 'SHOW_ELEMENT':
            return {
                ...state,
                show: true,
                element: action.payload.elementName
            };
        case 'HIDE_ELEMENT':
            return {
                ...state,
                show: false,
                element: action.payload.elementName
            }
        default:
            return state;
    }
}