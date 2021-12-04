var Review = require('../models/review');
var Author = require('../models/User');


const {body,validationResult} = require('express-validator');



exports.About = function(req, res) {
    res.render("About", { title: "LR-Point"});
}
