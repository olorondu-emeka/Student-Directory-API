var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var credSchema = new Schema({
    matricNo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true, 
        trim: true
    }
});

module.exports = credSchema;