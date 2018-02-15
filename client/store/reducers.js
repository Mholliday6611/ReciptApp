import{ combineReducers } from 'redux';
import user from './reducers/userReducer';
import recipt from './reducers/reciptReducer'

const appReducer = combineReducers({
  user,
  recipt
});

export default function (state, action){
	if( action.type ==="LOGOUT"){
    	return appReducer(undefined, action);
  	}
  return appReducer(state, action);
}
