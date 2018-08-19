var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    courseTitle:{
        type: String,
        default: ''
    },
    courseUnit: {
        type: Number,
        default: 0
    },
    courseCode: {
        type: String,
        default: ''
    }
});

module.exports = courseSchema;