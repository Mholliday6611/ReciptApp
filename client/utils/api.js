import axios from 'axios';

const baseURL = ""
var token = localStorage.getItem("token")
var header = {headers: {'Authorization': "bearer " + token}}

let api = {
	register : function(data){
		let url = baseURL + "api/register"
		return axios.post(url,data)
	},
	login : function(data){
		let url = baseURL + "api/login"
		return axios.post(url,data)
	},
	logout : function(){
		let url = baseURL + "api/logout"
		return axios.post(url,{},header)
	},
	refresh : function(){
		let url = baseURL + "api/refresh"
		return axios.get(url, header)
	},
	profile : function(){
		let url = baseURL + "api/profile"
		return axios.get(url,header)
	},
	createRecipt : function(data){
		let url = baseURL + "api/createRecipt"
		return axios.post(url,data,header)
	},
	viewAllRecipts : function(){
		let url = baseURL + "api/viewAllRecipts"
		return axios.get(url,header)
	},
	viewRecipt : function(id){
		let url = baseURL + "api/viewRecipt/" + id
		return axios.get(url,header)
	},

}

export default api