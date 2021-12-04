var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReviewSchema = new Schema(
    {
        title: {type: String, required: [true, 'Title cannot be left blank.']},
        author: {type: String, required: [true, 'Author cannot be left blank.']},
        summary: {type: String, required: [true, 'Summary cannot be left blank.']},
        product: {type: String, required: true},
        date: {type: Date, required: [true, 'Date cannot be left blank.']}
    }
);

// Virtual for book's URL
ReviewSchema
    .virtual('url')
    .get(function () {
        return '/catalog/review/' + this._id;
    });

//Export model
module.exports = mongoose.model('Review', ReviewSchema);