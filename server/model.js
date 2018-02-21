var mongoose = require("mongoose")

var user = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	categories: [],
	inventory: []
});

var recipt = new mongoose.Schema({
	title: String,
	client: String,
	customer: String,
	date: String,
	products:[{
		name: String,
		quantity: Number,
		code: String,
		description: String,
		price: Number,
		totalPrice: Number
	}],
	subTotal: Number,
	tax: Number,
	totalPrice: Number,
	paid: {type:Boolean, default:false},
	user: String,
	createdAt: String
})

var item = new mongoose.Schema({
	name: {type:String, required:true},
	price: {type:Number, required:true},
	code: String,
	description: String,
	user: String
})

module.exports = {
	User : mongoose.model("user", user),
	Recipt: mongoose.model("recipt", recipt),
	Item: mongoose.model("item", item)
}