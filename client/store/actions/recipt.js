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
      push("/recipt");
    });
}