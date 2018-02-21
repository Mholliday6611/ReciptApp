import React, {Component} from 'react'
import {connect} from "react-redux"
import api from "../utils/api"
import {Inventory} from "../store/actions/recipt"
import { ToastContainer, toast } from 'react-toastify';

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
		this.AddToInventory = this.AddToInventory.bind(this)
		this.AddFromInventory = this.AddFromInventory.bind(this)
		this.notify = this.notify
	}

	notify(msg) {
		return toast(msg,{position: toast.POSITION.BOTTOM_RIGHT});
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
			totalPrice: this.state.total
		}
		console.log(recipt)
		api.createRecipt(recipt)
			.then(response => this.props.history.push("/profile"))
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

	AddFromInventory(e, item){
		var i = e.target.name
		this.setState({
			["productName"+i] : item.name,
			["description"+i] : item.description,
			["price"+i] : item.price,
			["code"+i] : item.code,
		})
	}
	AddToInventory(e){
		var i = e.target.name
		api.createItem({
			name: this.state["productName"+i],
			description: this.state["description"+i],
			price: this.state["price"+i],
			code: this.state["code"+i]
		})
		.then(response=> 
			this.props.Inventory(this.notify)
		)
	}

	itemRender(){
		var arr = []

		for(var i=0; i< this.state.items; i++){
			arr.push(
					<div>
						<input name={"productName"+i} value={this.state["productName"+i]} onChange={this.handleChange} placeholder="Product Name"/>
						<input name={"quantity"+i} onChange={this.handleChange} placeholder="Quantity" type="number" />
						<input name={"code"+i} value={this.state["code"+i]} onChange={this.handleChange} placeholder="Product Code"/>
						<input name={"description"+i} value={this.state["description"+i]} onChange={this.handleChange} placeholder="Description"/>
						<input name={"price"+i} value={this.state["price"+i]} onChange={this.handleChange} placeholder="Price" type="number" />
						<input name={"totalPrice"+i} value={this.state["totalPrice"+i]} disabled type="number" />
						<div className="dropdown is-hoverable">
						  <div className="dropdown-trigger">
						    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
						      <span>AddFromInventory</span>
						      <span className="icon is-small">
						        <i className="fas fa-angle-down" aria-hidden="true"></i>
						      </span>
						    </button>
						  </div>
						  <div className="dropdown-menu" id="dropdown-menu4" role="menu">
						    <div className="dropdown-content">
						      <div className="dropdown-item">
						      	<ul>
						        {this.props.inventory && this.props.inventory.map(j=> <a className="button" name={i} onClick={(e)=>this.AddFromInventory(e,j)}>{j.name}</a>)}
						       	</ul>
						      </div>
						    </div>
						  </div>
						</div>
						<a className="button" name={i} onClick={this.AddToInventory}>Add To Inventory</a>
					</div>
				)
		}

		return arr
	}

	render(){
		console.log(this.state)
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
					<ToastContainer autoClose={5000} />
				</div>
			)
	}
}

const mapStateToProps = (state=>{
	return state.recipt
})

function mapDispatchToProps(dispatch){
	return({
		Inventory: () => dispatch(Inventory())
	})
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateRecipt)