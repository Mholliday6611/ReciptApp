import api from "../../utils/api";

function setCurrentRecipt(dispatch, response) {
  if(response.data.success){
    dispatch({type: 'SELECT_RECIPT', response});
  }
  
}

export function selectRecipt(id,push) {
  return dispatch => api.viewRecipt(id)
    .then((response)=>{
      setCurrentRecipt(dispatch, response);
      if(push){
        push("/recipt");
      }
    });
}

export function Inventory(notify){
  return dispatch => api.getInventory()
    .then((response)=>{
      dispatch({type: 'GET_INVENTORY', response});
      notify("Item Added to Inventory")
    });
}