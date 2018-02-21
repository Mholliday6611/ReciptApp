import React, {Component} from 'react'
import {connect} from "react-redux"
import moment from 'moment'
import {selectRecipt} from "../store/actions/recipt"
import api from '../utils/api'

class Recipt extends Component{
	constructor(){
		super()

		this.state={

		}
		this.markPaid = this.markPaid.bind(this)
	}

	markPaid(){
		var value;
		if(this.props.currentRecipt.paid==false){
			value = true
		}else{
			value= false
		}
		api.markPaid(
			this.props.currentRecipt._id,
			{value:value}
			).then(response=>this.props.selectRecipt(this.props.currentRecipt._id,false))
	}

	render(){
		console.log(this.props)
		var recipt = this.props.currentRecipt
		return(
			<div className="container">
				<div className="receiptContainer">
				<center>
					<div className="columns">
						<div className="column"><h1>Title: {recipt.title}</h1></div>
						<div className="column"><p>Customer: {recipt.customer}</p></div>
					</div>
					<div className="columns">
						<div className="column"><p>{moment(recipt.date).format("MMM Do YY")}</p></div>
						<div className="column"><p>{moment(recipt.createdAt).format("MMM Do YY")}</p></div>
					</div>
					<table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
						<tr><th>Product Name</th><th>Price</th><th>Quantity</th><th>Code</th><th>description</th><th>Total Price</th></tr>
					{recipt.products.map(i=>
						<tr>
						<td>{i.name}</td>
						<td>{i.price}</td>
						<td>{i.quantity}</td>
						<td>{i.code}</td>
						<td>{i.description}</td>
						<td>{i.totalPrice}</td>
						</tr>)}
					</table>
					<p>Tax: {recipt.tax}</p>
					<p>Total Price: {recipt.totalPrice}</p>
				</center>
				</div>
				<label class="checkbox">
				  <input type="checkbox" checked={recipt.paid} onClick={this.markPaid}/>
				  Paid
				</label>
			</div>
			)
	}
}

const mapStateToProps = (state=>{
	return state.recipt
})
function mapDispatchToProps(dispatch){
	return({
		selectRecipt: (id,push) => dispatch(selectRecipt(id,push))
	})
}
export default connect(mapStateToProps, mapDispatchToProps)(Recipt)