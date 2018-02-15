var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var mongoose = require("mongoose")

var passportJWT = require("passport-jwt");
var routes = require("./routes");
var tokes = require("./token.js")

app.use(express.static(__dirname +'./../'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

tokes(passport)
routes(app, passport)

app.listen(process.env.PORT || 8080)
mongoose.connect("mongodb://localhost/recipts")