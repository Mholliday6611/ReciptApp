var db = require("./model")
var auth = require("./auth")
var bcrypt = require("bcrypt-nodejs")
var jwt = require("jsonwebtoken");
var path = require("path")
var User = db.User
var Recipt = db.Recipt

module.exports = function(app, passport){
	app.post("/api/register", function(req,res){
		auth({
			name: req.body.name,
			pass: req.body.pass,
			email: req.body.email
		},
		function(data){
			if(data.success){
				res.json({
					success: "All good"
				})
			}else {
				res.json({
					Success:"not good"
				})
			}
		})
	}),
	app.post("/api/login", function(req,res){
		console.log(req.body)
		User.findOne({email: req.body.email}, function(err,user){
			if(err){
				return res.json({msg:"ERROR"})
			}
			if(!user){
				return res.json({success:false, msg:"user doesn't exist"})
			}
			if(!bcrypt.compareSync(req.body.pass, user.password)){
				return res.json({success:false, msg: "incorrect email/password"})
			}
			if(user && bcrypt.compareSync(req.body.pass, user.password)){
				var payload = {id:user._id}
				var token =jwt.sign(payload, process.env.reciptToken)
				return res.json({success:true, msg:"ok",username: user.username,token:token})
			}
		})
	}),
	app.post("/api/logout", function(req,res){
		res.json({
			msg: "Logged out",
			success: true
		})
	}),
	app.get("/api/refresh", passport.authenticate('jwt', { session: false }), function(req,res){

		var payload = {id:req.user._id}
		var token =jwt.sign(payload, process.env.reciptToken)

		return res.json({
			msg: "Refresh Success",
			success: true,
			username: req.user.username,
			token: token
		})
	}),
	app.post("/api/createRecipt", passport.authenticate('jwt', { session: false }), function(req,res){
		new Recipt({
			title: req.body.title,
			client: req.body.client,
			customer: req.body.customer,
			date: req.body.date,
			products:req.body.products,
			subTotal: req.body.subTotal,
			tax: req.body.tax,
			totalPrice: req.body.totalPrice,
			user: req.user._id
		}).save(function(err){
			if(err){
				res.send("error")
			}
			else{
				res.send("success")
			}
		})
	}),
	app.get("/api/profile",passport.authenticate('jwt', { session: false }), function(req,res){
		res.send(req.user)
	}),
	app.get("/api/viewAllRecipts", passport.authenticate('jwt', { session: false }), function(req,res){
		Recipt.find({user:req.user._id}, 'title customer', function(err,recipts){
			res.send(recipts)
		})
	}),
	app.get("/api/viewRecipt/:id", passport.authenticate('jwt', { session: false }), function(req,res){
		Recipt.findOne({_id:req.params.id}, function(err,recipt){
			if(recipt.user == req.user._id){
				res.json({success:true,info:recipt})
			}else{
				res.send("NOT ALLOWED")
			}
		})
	}),
	app.get("*", function(req,res){
		res.sendFile(path.join(__dirname, "../index.html"))
	})
}