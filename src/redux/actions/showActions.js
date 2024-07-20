export const showElement = ({elementName}) => ({
    type: 'SHOW_ELEMENT',
    payload: {elementName}
});

export const hideElement = ({elementName}) => ({
    type: 'HIDE_ELEMENT',
    payload: {elementName}
});