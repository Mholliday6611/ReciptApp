var mongoose = require("mongoose")

var user = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	categories: []
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
	user: String
})

module.exports = {
	User : mongoose.model("user", user),
	Recipt: mongoose.model("recipt", recipt)
}