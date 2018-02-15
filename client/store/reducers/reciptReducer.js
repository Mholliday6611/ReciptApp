const initialState = {
};

export default function (state = initialState, action){
  switch(action.type){
    case 'SELECT_RECIPT':
      return {
        ...state,
        currentRecipt: action.response.data.info
      };
    default:
      return state;
  }
};
