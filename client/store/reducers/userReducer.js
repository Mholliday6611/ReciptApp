const initialState = {
  isAuthenticated: false,
  willAuthenticate: true,
  currentUser:{},
};

export default function (state = initialState, action){
  switch(action.type){
    case 'AUTHENTICATION_REQUEST':
      return {
        ...state,
        willAuthenticate: true,
      };
    case "AUTHENTICATION_SUCCESS":
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: true,
        currentUser: action.response.data.username,
      };
    case "AUTHENTICATION_UNSUCCESS":
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: false,
        message: action.response.data.msg,
      };
    case "AUTHENTICATION_FAILURE":
      return {
        ...state,
        willAuthenticate: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: false,
        currentUser: {},
      };
    default:
      return state;
  }
};
