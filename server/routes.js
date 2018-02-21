var db = require("./model")
var auth = require("./auth")
var bcrypt = require("bcrypt-nodejs")
var jwt = require("jsonwebtoken");
var path = require("path")
var User = db.User
var Recipt = db.Recipt
var Item = db.Item

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
					success: true,
					message: "Awesome You're Signed Up!"
				})
			}else {
				res.json({
					Success:false,
					message: "Try again :("
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
			user: req.user._id,
			createdAt: new Date()
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
		Recipt.find({user:req.user._id}, 'title customer createdAt date paid', function(err,recipts){
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
	app.put("/api/markPaid/:id", passport.authenticate('jwt', { session: false }), function(req,res){
		Recipt.findByIdAndUpdate(req.params.id, {$set:{paid:req.body.value}}, function(err,doc){
			res.json({msg:"update success",info:req.body.value})
		})
	}),
	app.post("/api/addInventory", passport.authenticate('jwt', { session: false }), function(req,res){
		new Item({
			name: req.body.name,
			code: req.body.code,
			description: req.body.description,
			price: req.body.price,
			user: req.user._id
		}).save(function(err,item){
			if(err){
				res.send("error")
			}
			else{
				req.user.update({$addToSet: {"inventory": item}}).exec()
				res.send("success")
			}
		})
	}),
	app.get("/api/getInventory", passport.authenticate('jwt', { session: false }), function(req,res){
		res.json({inventory: req.user.inventory})
	}),
	app.put("/api/removeItem/:id", passport.authenticate('jwt', {session: false}),function(req,res){
		var updatedInventory = req.user.inventory.filter(i=> i._id != req.params.id)
		req.user.update({$set: {"inventory": updatedInventory}}).exec()
		Item.findOneAndRemove({_id: req.params.id}, function(err,doc){
			res.send("delete success")
		})
	}),
	app.get("*", function(req,res){
		res.sendFile(path.join(__dirname, "../index.html"))
	})
}