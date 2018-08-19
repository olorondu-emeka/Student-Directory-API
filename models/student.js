var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var theBiodata = require('./biodata');
var theCourses = require('./courses');
var theCredentials = require('./credentials');

var studentSchema = new Schema({
    credentials: theCredentials,
    biodata: theBiodata,
    courses: [theCourses]
});

module.exports = mongoose.model('students', studentSchema);



