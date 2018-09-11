var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var biodataSchema = new Schema({
    surname: String,
    firstname: String,
    email: {
        type: String,
        default: '',
        trim: true
    },
    phoneNo: {
        type: String,
        default: '',
        trim: true
    },
    level: Number,
    address: {
        type: String,
        default: '',
        trim: true
    },
    dob: {
        type: Date,
        default: '',
        trim: true
    }

});

module.exports = biodataSchema;