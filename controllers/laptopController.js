var Laptop = require('../models/laptop');


const {body, validationResult} = require("express-validator");
const req = require("express");

exports.laptop_create_get = function(req, res, next) {
    res.render('laptop_form', { title: 'Add laptop to site'});
};

exports.laptop_create_post = (req, res, next) => {

    // Validate and sanitize fields.
    req.checkBody('name').notEmpty().withMessage('Product name must be specified.')
    req.checkBody('price').notEmpty().withMessage('add price'),
        // Process request after validation and sanitization.

        req.getValidationResult().then((result) => {

            // Extract the validation errors from a request.
            const errors = result;

            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/errors messages.
                res.render('laptop_form', {title: 'Add laptop to site', laptop: req.body, errors: errors.array()});
                return;
            }
            else {
                // Data from form is valid.

                var laptop = new Laptop(
                    {
                        name: req.body.name,
                        price: req.body.price
                    });

                laptop.save(function (err) {
                    if (err) {
                        return next(err);
                    }

                    res.redirect('/catalog/review/create');
                });
            }
        })
};
