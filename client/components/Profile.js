import React, {Component} from 'react'
import {connect} from "react-redux"
import api from '../utils/api'
import {Link} from "react-router-dom"
import {selectRecipt} from "../store/actions/recipt"

class Profile extends Component{
	constructor(){
		super()

		this.state={
			recipts:[]
		}
		this.selectRecipt = this.selectRecipt.bind(this)
	}

	selectRecipt(id){
		this.props.selectRecipt(id,this.props.history.push)
	}

	componentDidMount(){
		api.viewAllRecipts()
			.then(response =>{
				this.setState({
					recipts: response.data
				})
			})
	}

	render(){
		console.log(this.props)
		var recipts = this.state.recipts.map(i => 
			<div className="box" style={{maxWidth:"25%",margin:"5px", display:"inline-block"}} onClick={()=>this.selectRecipt(i._id)}> 
				<h1 className="title">{i.title}</h1>
				<h2 className="subtitle">{i.customer}</h2>
				{/*<h3>{i.date}</h3>*/}
			</div>)
		return(
				<div className="container">
					<div id="Current Recipts">
						<div>
							{recipts}
						</div>
					</div>
					<div id="CreateMenu" className="columns">
						<div className="column">
							<h1>Create a Recipt</h1>
								<Link to="/create"className="button">CREATE RECIPT</Link>
						</div>

						<div className="column">
							<h1>Add to Inventory</h1>
						</div>
					</div>
				</div>
			)
	}
}

function mapDispatchToProps(dispatch){
	return({
		selectRecipt: (id,push) => dispatch(selectRecipt(id,push))
	})
}

export default connect(null,mapDispatchToProps)(Profile)