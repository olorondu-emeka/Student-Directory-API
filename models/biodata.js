var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var biodataSchema = new Schema({
    surname: String,
    firstname: String,
    email: {
        type: String,
        default: ''
    },
    phoneNo: {
        type: String,
        default: ''
    },
    level: Number,
    address: {
        type: String,
        default: ''
    },
    dob: {
        type: String,
        default: ''
    }

});

module.exports = biodataSchema;