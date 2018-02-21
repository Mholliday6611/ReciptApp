import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {logout} from "../store/actions/user"

class Nav extends Component {
	render(){
		return(
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
				    <Link className="navbar-item" to="/">
				      <img src="http://icons.iconarchive.com/icons/iconsmind/outline/512/Receipt-3-icon.png" alt="Bulma: a modern CSS framework based on Flexbox" height="28" />
				    </Link>
		  		</div>
		  		{this.props.isAuthenticated &&
		  			<div className="navbar-end">
			  			<div className="navbar-item">
			  				<Link to="/profile"><p>{this.props.currentUser}</p></Link>
			  				<button onClick={this.props.logout} className="button">Logout</button>
			  			</div>
			  		</div>
		  		}
			</nav>
			)
	}
}

const mapStateToProps = (state=>{
	return state.user
})
function mapDispatchToProps(dispatch){
	return({
		logout: () => dispatch(logout())
	})
}
export default connect(mapStateToProps,mapDispatchToProps)(Nav)