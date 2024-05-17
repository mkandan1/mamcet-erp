export const showToast = ({type, text, icon}) => ({
    type: 'SHOW_TOAST',
    payload: {type, text, icon}
});

export const hideToast = () => ({
    type: 'HIDE_TOAST',
});