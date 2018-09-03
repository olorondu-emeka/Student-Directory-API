var StudentModel = require('../models/student');

exports.addCourses = async(req, res) => {
   
    var user = await StudentModel.findById(req.params.id);
    var newCourse = {
        courseTitle: req.body.courseTitle,
        courseUnit: req.body.courseUnit,
        courseCode: req.body.courseCode
    };

    var oldCourses = [...user.courses];
    oldCourses.push(newCourse);

    //add course to the database
    await StudentModel.findByIdAndUpdate(req.params.id, { courses: oldCourses });

    //retrieve the newly added course
    var updatedUser = await StudentModel.findById(req.params.id);
    var theCourse = updatedUser.courses[updatedUser.courses.length - 1];

    //send response
    res.status(200).json({
        message: 'New course added successfully',
        addedCourse: theCourse
        
    });

};


exports.deleteCourse = async(req, res) => {
    var course_id = req.query.course_id;
    var user = await StudentModel.findById(req.params.id);
    var courseArray = [...user.courses];

    //loop through the course array and delete the matched course
    courseArray.forEach(function(course, index){
        if (course._id == course_id){
            courseArray.splice(index, 1);

        }
    });

    //replace former course array with the edited course array
    await StudentModel.findByIdAndUpdate(req.params.id, { courses: courseArray});

    //send back the updated user
    var updatedUser = await StudentModel.findById(req.params.id);

    //send back the edited array
    res.status(200).json({
        message: 'Course deleted successfully',
        updatedCourses: updatedUser.courses
    });

};

// exports.editCourse = (req, res) => {
//
// };