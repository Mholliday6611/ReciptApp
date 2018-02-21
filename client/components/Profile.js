import React, {Component} from 'react'
import {connect} from "react-redux"
import api from '../utils/api'
import {Link} from "react-router-dom"
import {selectRecipt, Inventory} from "../store/actions/recipt"
import AddItem from "./AddItem"
import Modal from "react-modal"
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'

class Profile extends Component{
	constructor(){
		super()

		this.state={
			recipts:[],
			open: false
		}
		this.selectRecipt = this.selectRecipt.bind(this)
		this.close = this.close.bind(this)
		this.notify = this.notify.bind(this)
	}

	notify(msg) {
		return toast(msg,{position: toast.POSITION.BOTTOM_RIGHT});
	}

	selectRecipt(id){
		this.props.selectRecipt(id,this.props.history.push)
	}

	close(){
		if(this.state.open){
			this.setState({
				open: false
			})
		}else{
			this.setState({
				open: true
			})
		}
	}

	componentDidMount(){
		api.viewAllRecipts()
			.then(response =>{
				this.setState({
					recipts: response.data
				})
			})
		this.props.Inventory()
	}

	render(){
		console.log(this.state)
		var yourInventory = this.props.inventory.map(i => 
			<section className="box profilebox" style={{width:"20%"}}> 
				<h1 style={{marginBottom: "0"}} className="title">{i.name}</h1>
				<p className="is-size-5">${i.price}</p> <p className="is-size-5"><strong>Desc: </strong>{i.description}</p> <p className="is-size-5"><strong>Code: </strong>{i.code}</p>
			</section>)


		var recipts = this.state.recipts.map(i => 
			<section className="box profilebox" style={i.paid?{width:"20%"}:{width:"20%",backgroundColor:"red"}} onClick={()=>this.selectRecipt(i._id)}> 
				<h1 className="title" style={{marginBottom: "0"}}>{i.title}</h1>
				<h1 className="is-size-5">Customer:{i.customer}</h1>
				<p className="is-size-5">{moment(i.createdAt).format("MMM Do YY")}</p>
				<p className="is-size-5"> {moment(i.date).format("MMM Do YY")}</p>
				{/*<h3>{i.date}</h3>*/}
			</section>)
		return(
				<div id="profile" className="container-fluid">

					<div id="CurrentRecipts">
						<section className="box profilebox" style={{width:"20%"}}> 
							<h1 className="title">Create Receipt</h1>
							<Link to="/create"className="button">CREATE RECIPT</Link>
						</section>
						{recipts}{recipts}{recipts}{recipts}{recipts}{recipts}{recipts}{recipts}{recipts}
					</div>

						{this.props.inventory.length==0 ? 
						<div id="Inventory">
							<section  className="box profilebox" style={{width:"20%"}}> 
								<h1 className="title">Add to Inventory</h1>
								<center><img onClick={this.close} style={{height:"65px"}} src="https://image.flaticon.com/icons/svg/14/14980.svg" /></center>
							</section>
							<h1 className="title" style={{display:"inline"}}>No Items Yet!</h1> 
						</div>
						:
						<div id="Inventory">
							<section className="box profilebox" style={{width:"20%"}}> 
								<h1 className="title">Add to Inventory</h1>
								<center><img onClick={this.close} style={{height:"65px"}} src="https://image.flaticon.com/icons/svg/14/14980.svg" /></center>
							</section>
							{yourInventory}
						</div>}
					

					<div id="Something">
						<ToastContainer autoClose={5000} />
					</div>

					<Modal isOpen={this.state.open}
					onRequestClose={this.close}
					style={{content:{height:"25%"}}}
					>
						<AddItem close={this.close} Inventory={this.props.Inventory} notify={this.notify}/>
					</Modal>
				</div>
			)
	}
}

const mapStateToProps = (state=>{
	return state.recipt
})

function mapDispatchToProps(dispatch){
	return({
		selectRecipt: (id,push) => dispatch(selectRecipt(id,push)),
		Inventory: (notify) => dispatch(Inventory(notify))
	})
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)