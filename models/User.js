var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var mongoDB = 'mongodb+srv://koekje:geefons20op20@tir-point.spdkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//User Model
var UserSchema = mongoose.Schema({
    username : {
        type : String,
        index : true
    },
    password : {
        type : String
    },
    email : {
        type : String
    },
    name: {
        type : String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(username,callback){
    var query = {username: username};
    User.findOne(query,callback);
}

module.exports.comparePassword = function(userPassword,hash,callback){
    bcrypt.compare(userPassword,hash,function(err,isMatch){
        callback(null,isMatch);
    });
}
module.exports.createUser = function(newUser,callback){
    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(newUser.password,salt,function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    newUser.save(callback);
}