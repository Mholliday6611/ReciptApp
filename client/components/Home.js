import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"

class Home extends Component{

	render(){
		return(
				<div id="MainContainer" className="container">
					<center>
					<b><h1 id="MainTitle" className="title">Quick<span>Receipt</span></h1></b>
					<p id="introText">Create, save and print receipts quickly for clients! Maintain an organized inventory and view your profits!</p>
					<Link to="/login"><p className="title" id="link">Login in or Sign up here!</p></Link>

					
					</center>
				</div>
			)
	}
}

export default Home