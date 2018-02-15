import React, {Component} from 'react'
import {connect} from "react-redux"
import api from "../utils/api"


class CreateRecipt extends Component{
	constructor(){
		super()

		this.state={
			items:1,
			subtotal:0
		}
		this.addProduct = this.addProduct.bind(this)
		this.totalAdds = this.totalAdds.bind(this)
		this.itemRender = this.itemRender.bind(this)
		this.saveRecipt = this.saveRecipt.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		var name = e.target.name;
		var value = e.target.value;

		this.setState({
			[name] : value
		}, function(){
			if(name.slice(0,8) == "quantity" || name.slice(0,5) == "price"){
		 		this.totalAdds()
		 	}
		 	if(name == "tax"){
		 		var x = this.state.subtotal + (this.state.subtotal * this.state.tax)
		 		this.setState({
		 			total: x
		 		})
		 	}
		})
	}

	saveRecipt(){
		var products =[]
		for(var i=0; i<this.state.items; i++){
			products.push(
					{
						name: this.state["productName"+i],
						quantity: this.state["quantity"+i],
						code: this.state["code"+i],
						description: this.state["description"+i],
						price: this.state["price"+i],
						totalPrice: this.state["totalPrice"+i]
					}
				)
		}

		var recipt = {
			title: this.state.title,
			client: this.state.client,
			customer: this.state.customer,
			products: products,
			date: this.state.date,
			subtotal: this.state.subtotal,
			tax: this.state.tax,
			total: this.state.total
		}
		console.log(recipt)
		api.createRecipt(recipt)
			.then(response => console.log(response))
	}

	addProduct(){
		var i = this.state.items +1
		this.setState({
			items: i
		})
	}
	totalAdds(){
		var total =0
		for(var i=0; i<this.state.items;i++){
			var x = this.state["quantity"+i] * this.state["price"+i] 

			if(Number.isNaN(x)){
				x=0
			}
			this.setState({
				["totalPrice"+i] : x
			})

			total += x
		}

		this.setState({
			subtotal: total
		})
	}

	itemRender(){
		console.log(this.state)
		var arr = []

		for(var i=0; i< this.state.items; i++){
			arr.push(
					<div>
						<input name={"productName"+i} onChange={this.handleChange} placeholder="Product Name"/>
						<input name={"quantity"+i} onChange={this.handleChange} placeholder="Quantity" type="number" />
						<input name={"code"+i} onChange={this.handleChange} placeholder="Product Code"/>
						<input name={"description"+i} onChange={this.handleChange} placeholder="Description"/>
						<input name={"price"+i} onChange={this.handleChange} placeholder="Price" type="number" />
						<input name={"totalPrice"+i} value={this.state["totalPrice"+i]} disabled type="number" />
					</div>
				)
		}

		return arr
	}

	render(){
		var items = this.itemRender()

		return(
				<div className="container">
					<form>
						<input name="title" onChange={this.handleChange} placeholder="title"/>
						<input name="client" onChange={this.handleChange}  placeholder="client"/>
						<input name="customer" onChange={this.handleChange}  placeholder="customer"/>
						<input name="date" onChange={this.handleChange} placeholder="date" />
						<div id="PRODUCTS">
							{items}
						</div>
						<input name="subtotal" value={this.state.subtotal} disabled placeholder="subtotal" type="number" />
						<input name="tax" onChange={this.handleChange} placeholder="tax" type="number" />
						<input name="total" value={this.state.total} disabled placeholder="total" type="number" />
					</form>
					<button onClick={this.saveRecipt}>Save Recipt</button>
					<button onClick={this.addProduct}>Add a row</button>
				</div>
			)
	}
}

export default CreateRecipt