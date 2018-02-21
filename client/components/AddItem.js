import React, {Component} from 'react'
import {connect} from "react-redux"
import api from "../utils/api"

class AddItem extends Component{
	constructor(){
		super()

		this.state = {

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		var name = e.target.name
		var value = e.target.value

		this.setState({
			[name] : value
		})
	}
	handleSubmit(e){
		e.preventDefault()

		api.createItem({
			name: this.state.name,
			description: this.state.description,
			price: this.state.price,
			code: this.state.code
		})
		.then(response=> {
			this.props.Inventory(this.props.notify)
			this.props.close()
		})
	}

	render(){
		return(
				<div className="modal-content">
					<h1 className="title">Add Item to Your Inventory</h1>

					<form onSubmit={this.handleSubmit}>
						<input name="name" placeholder="Name" onChange={this.handleChange}/>
						<input name="description" placeholder="Description" onChange={this.handleChange}/>
						<input name="price" placeholder="Price" onChange={this.handleChange}/>
						<input name="code" placeholder="Code" onChange={this.handleChange}/>
						<input type="submit" />
					</form>
				</div>
			)
	}
}

export default AddItem