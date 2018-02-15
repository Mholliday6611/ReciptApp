import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import {authenticate, unauthenticate} from "../store/actions/user"
import {connect} from "react-redux"

import Nav from "./Nav"
import Home from "./Home"
import Profile from "./Profile"
import Login from "./Login"
import CreateRecipt from "./CreateRecipt"
import Recipt from "./Recipt"

class App extends Component {


	componentDidMount(){
		const token = localStorage.getItem('token');

	    if(token){
	      this.props.authenticate();
	    }else{
	      this.props.unauthenticate();
	    }
	}
	  render() {
		return (
			<div>
				<Router>
					<div>
						<Nav/>
						<Switch>
							<Route exact path="/" component={Home} />
							<AuthRoute exact path="/profile"  component={Profile} authenticated={this.props.isAuthenticated} />
							<AuthRoute exact path="/create"  component={CreateRecipt} authenticated={this.props.isAuthenticated} />
							<AuthRoute exact path="/recipt"  component={Recipt} authenticated={this.props.isAuthenticated} />
							<Route exact path="/login" component={Login} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	  }
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      {console.log(rest); return rest.authenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )}
    }
  />
);

const mapStateToProps = (state=>{
	return state.user
})

export default connect(mapStateToProps,{authenticate, unauthenticate})(App)