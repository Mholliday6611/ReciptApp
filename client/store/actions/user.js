import api from "../../utils/api";

function setCurrentUser(dispatch, response) {
  if(response.data.success){
    localStorage.setItem('token', response.data.token);
    dispatch({type: 'AUTHENTICATION_SUCCESS', response});
  }
  if(!response.data.success){
    dispatch({type: "AUTHENTICATION_UNSUCCESS", response})
  }
  
}

export function login(data,push) {
  return dispatch => api.login(data)
    .then((response)=>{
      console.log(push)
      setCurrentUser(dispatch, response);
      push("/profile");
    });
}

export function signup(data) {
  return dispatch => api.register(data)
    .then((response)=>{
      console.log(response)
      setCurrentUser(dispatch, response);
    });
}

export function logout() {
  return dispatch => api.logout("/api/logout")
    .then(()=> {
      localStorage.removeItem('token');
      dispatch({type: "LOGOUT"});
    });
}

export function authenticate(){
  return (dispatch) => new Promise(function(resolve, reject) {
    dispatch({type: "AUTHENTICATION_REQUEST"});
    return api.refresh()
      .then((response)=>{
        setCurrentUser(dispatch, response);
      })
      .catch(()=>{
        localStorage.removeItem('token');
        window.location ="/login";
      });
  });
}

export const unauthenticate = () => ({type: "AUTHENTICATION_FAILURE"})
