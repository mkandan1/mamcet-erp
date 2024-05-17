const initialState = {
  loggedin: false,
  user: null,
  loading: true,
};

export const authReducers = (state = initialState, action) => {
  switch (action.type) {
    // case '':
    //     return {
    //         ...state,
    //         loading: ,
    //     };
    case "AUTH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        loading: true,
        loggedin: false,
        user: null
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        loggedin: true,
        user: action.payload,
        loading: false
      };
    case "LOG_OUT":
      return {
        ...state,
        loggedin: false,
        user: null,
        loading: false
      };
    default:
      return state;
  }
};
