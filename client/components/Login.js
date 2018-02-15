import React, {Component} from 'react'
import {connect} from "react-redux"
import {login, signup} from "../store/actions/user"

class Login extends Component {
	constructor(){
		super()

		this.state ={
			
		}
		this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this)
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleLoginSubmit(e){
		e.preventDefault();
		this.props.login({
			pass: this.state.logPassword,
			email: this.state.logEmail
		}, this.props.history.push)
		
	}
	handleSignUpSubmit(e){
		e.preventDefault();
		this.props.signup({
			name: this.state.regUsername,
			email: this.state.regEmail,
			pass: this.state.regPassword
		})
	}
	handleChange(e){
		var name = e.target.name;
		var value = e.target.value;

		this.setState({
			[name]: value
		})
	}

	render(){
		console.log(this.props)
		return(
			<div className="container">
				<div className="columns logreg">
					<div className="column">
						<form className="" onSubmit={this.handleSignUpSubmit}>
							<h1 className="title">New User!</h1>
							<div className="field">
								<label className="label">Username</label>
								<div className="control">
								    <input className="input" name="regUsername" onChange={this.handleChange} type="text" placeholder="Enter Username here!" />
								</div>
							</div>
							<div className="field">
								<label className="label">Email</label>
								<div className="control">
								    <input className="input" name="regEmail" onChange={this.handleChange} type="email" placeholder="Enter Email here!" />
								</div>
							</div>
							<div className="field">
								<label className="label">Password</label>
								<div className="control">
								    <input className="input" name="regPassword" onChange={this.handleChange} type="password" placeholder="Enter Password here!" />
								</div>
							</div>
							<input className="button" type="submit" />
						</form>
					</div>
					<div className="column" >
						<p>{this.props.message}</p>
						<form className="" onSubmit={this.handleLoginSubmit}>
							<h1 className="title">Login Here!</h1>
							<div className="field">
								<label className="label">Email</label>
								<div className="control">
								    <input className="input" type="email" onChange={this.handleChange} name="logEmail" placeholder="Enter Email here!" />
								</div>
							</div>
							<div className="field">
								<label className="label">Password</label>
								<div className="control">
								    <input className="input" type="password" onChange={this.handleChange} name="logPassword" placeholder="Enter Password here!" />
								</div>
							</div>
							<input className="button" type="submit" />
						</form>
					</div>
				</div>
			</div>
			)
	}
}

const mapStateToProps = (state=>{
	return state.user
})

function mapDispatchToProps(dispatch){
	return({
		login: (data,push) => dispatch(login(data,push)),
		signup: data => dispatch(signup(data))
	})
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)