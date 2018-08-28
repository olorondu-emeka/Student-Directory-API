var express = require('express');
var router = express.Router();
var biodataController = require('../controllers/biodataController');
var accessController = require('../controllers/accessController');
var coursesController = require('../controllers/coursesController');
var checkAuth = require('../check-auth');

// GET Requests
//router.get('/biodata/:id', biodataController)
router.get('/dashboard/:id', checkAuth.checkLocal, checkAuth.verifyToken, accessController.getStudent);
router.get('/dashboard/:id/view-biodata', accessController.getStudent);
router.get('/dashboard/:id/update-biodata', accessController.getStudent);
router.get('/dashboard/:id/manage-courses', accessController.getStudent);

//POST Requests
router.post('/register', accessController.regStudent);
router.post('/login', accessController.loginStudent);
router.post('/dashboard/:id/manage-courses/add-courses', coursesController.addCourses);


//PATCH Requests
router.patch('/dashboard/:id/update-biodata', biodataController.updateBiodata);
// router.patch('/courses/:id', coursesController.editCourse);

//DELETE Requests
router.delete('/dashboard/:id/manage-courses', coursesController.deleteCourse);

















module.exports = router;

