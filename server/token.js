var passportJWT = require("passport-jwt")
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var User = require("./model").User;

module.exports= function(passport){
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
jwtOptions.secretOrKey = process.env.reciptToken

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done){
	console.log("payload received", jwt_payload);
		User.findOne({_id: jwt_payload.id}, function(err,user) {
			if(err){
				return done(err, false);
			}
			if(user){
				return done(null, user);
			}else{
				return done(null, false)
			}
		});
	}))	
}