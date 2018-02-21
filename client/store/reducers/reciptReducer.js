const initialState = {
  inventory: []
};

export default function (state = initialState, action){
  switch(action.type){
    case 'SELECT_RECIPT':
      return {
        ...state,
        currentRecipt: action.response.data.info
      };
    case 'GET_INVENTORY':
    console.log(action)
      return {
        ...state,
        inventory: action.response.data.inventory
      };
    default:
      return state;
  }
};
