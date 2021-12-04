const express = require('express')
const router = express.Router();



var Author = require('../models/User');
var Review = require('../models/review');
var async = require('async');

const { body,validationResult } = require('express-validator');


// Handle Author create on POST.
exports.author_create_post = function(req, res) {
    res.render('index');
};

exports.register = function (req, res){
    res.render('register', {title:'Register'});
}