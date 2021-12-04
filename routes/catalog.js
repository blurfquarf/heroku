var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator())
// Require controller modules.
var review_controller = require('../controllers/reviewController');
var author_controller = require('../controllers/authorController');
var global_controller = require('../controllers/globalController');

var mongoose  = require('mongoose');
var crypto = require('crypto'), hmac, signature;
const {validationResult} = require("express-validator");
//const {matchedData, sanitize}   = require('express-validator/filter');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var User = require('../models/User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const {check} = require('express-validator/check');
const {laptop_create_get} = require("../controllers/laptopController");
const laptopController = require("../controllers/laptopController");

/// Review ROUTES ///

// GET catalog home page.
router.get('/', review_controller.index);

// GET request for creating a review. NOTE This must come before routes that display review (uses id).
router.get('/review/create', review_controller.review_create_get);

// POST request for creating review.
router.post('/review/create', review_controller.review_create_post);

// GET request for one review.
router.get('/review/:id', review_controller.review_detail);

// GET request for list of all review items.
router.get('/reviews', review_controller.review_list);


// USERRRRRRRR
router.get('/register', author_controller.register);

router.get('/login', function(req, res, next) {
    res.render('login',{title:'Login'});
});

//login user
router.post('/login',
    passport.authenticate('local', {failureRedirect:'/catalog/login',failureFlash: 'Invalid Username/Password'}),
    function(req, res) {
        res.redirect('/');
    });

//get user name
router.get('/login',function(req,res){
    res.render('index',{username: req.user.username});
});

//register user
router.post('/register', upload.single('profileimage'), function(req,res,next){ //profileimage for future use in profiles

    //Form Validator
    req.checkBody('name','Name field is required').notEmpty();
    req.checkBody('email','Email field is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail().withMessage('Fill in a valid email.');//ZELFDE MAIL HANDLEN!!!!!
    check('email').custom(value => findUserByEmail(value)).withMessage('email already exists')
    req.checkBody('username','Username field is required').notEmpty();
    req.checkBody('password','Password field is required').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long.')


    //Check Error
    var errors = req.validationErrors();
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    if(errors){
        res.render('register',{
            errors: errors
        });

    }

    else{
        var newUser = new User({
            name : name,
            email: email,
            username: username,
            password: password
        });


        User.createUser(newUser,function(err,user){
            if(err) throw err;
            console.log(user);
        });

        res.location('/');
        res.redirect('/catalog/login');
    }
});


function findUserByEmail(email){
    if(email){
        return new Promise((resolve, reject) => {
            User.findOne({email: email})
                .exec((err, doc) => {
                    if (err) return reject(err)
                    if (doc) return reject(new Error('This email already exists. Please enter another email.'))
                    else return resolve(email)
                })
        })
    }
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function(username,password,done){
    User.getUserByUsername(username, function(err,user){
        if(err) throw err;
        if(!user){//if user does not exist
            return done(null,false,{message: 'User Does Not Exist'});
        }

        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) return done(err);
            if(isMatch){//match user password return done
                return done(null,user);
            }else{
                return done(null, false, {message:'Wrong Password'});
            }
        });
    });
}));

router.get('/logout',function(req,res){
    req.logout();
    req.flash('/success','You have logged out.');
    res.redirect('/catalog/');
})
module.exports = router;

/// GLOBAL ROUTES ///

// GET About & Contact page
router.get("/about&contact", global_controller.About);




router.get('/add_laptop', laptopController.laptop_create_get);


router.post('/add_laptop', laptopController.laptop_create_post);


//router.get('/authors', laptopController.laptop_list);









module.exports = router;




