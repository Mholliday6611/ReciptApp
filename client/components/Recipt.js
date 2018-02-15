import React, {Component} from 'react'
import {connect} from "react-redux"


class Recipt extends Component{

	render(){
		console.log(this.props)
		return(
				<div className="container-fluid">
					Recipt
				</div>
			)
	}
}

const mapStateToProps = (state=>{
	return state.recipt
})

export default connect(mapStateToProps)(Recipt)