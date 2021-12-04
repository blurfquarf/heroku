var Review = require('../models/review');
var User = require('../models/User');
var Laptop = require('../models/laptop');
var async = require('async');

const {body,validationResult} = require('express-validator');
const {getUserByUsername} = require("../models/User");


exports.index = function(req, res) {
    async.parallel({
        review_count: function(callback) {
            Review.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    }, function(err, results) {
        res.render('index', { title: 'LR-Point ', error: err, data: results });
    });
};


exports.review_list = function(req, res, next) {

    Review.find({}, 'title author product summary date')
        .sort({title : 1})
        .populate('author')
        .exec(function (err, list_reviews) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('review_list', {title: 'Review List', review_list: list_reviews});
        });

};

exports.review_detail = function(req, res, next) {
    async.parallel({
        review: function(callback) {
            Review.findById(req.params.id)
                .populate('author')
                .exec(callback);
        },
    }, function(err, results) {
        if (err) {return next(err);}
        if (results.review==null) { // No results.
            var err = new Error('Review not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('review_detail', {title: results.review.title, review: results.review});
    });

};


exports.review_create_get = function(req, res, next) {
    async.parallel({
        laptops: function(callback) {
            Laptop.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('review_form', {title: 'Create Review', laptops: results.laptops});
    });
};


exports.review_create_post = (req, res, next) => {
    // Validate and sanitise fields.

    req.checkBody('product', 'Type of product must be filled in.').trim().isLength({ min: 1 }).escape(),
        req.checkBody('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
        req.checkBody('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),


        // Extract the validation errors from a request.
        req.getValidationResult().then((result) => {
            errors = result;
            today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var review = new Review(
                {
                    product: req.body.product,
                    title: req.body.title,
                    author: req.user.username, //USERNAME
                    summary: req.body.summary,
                    date: date+' '+time
                });

            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/error messages.

                async.parallel({
                    laptops: function (callback) {
                        Laptop.find(callback);
                    },
                }, function (err, results) {
                    if (err) {
                        return next(err);
                    }

                    res.render('review_form', {
                        title: 'Create Review',
                        author: req.user.username,
                        product: req.body.product,
                        date: date+' '+time,
                        review: review,
                        errors: errors.array()
                    });
                });
                return;
            } else {
                // Data from form is valid. Save book.
                review.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    //successful - redirect to new book record.
                    res.redirect(review.url);
                });
            }
        });
};

