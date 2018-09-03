var express = require('express');
var router = express.Router();
var biodataController = require('../controllers/biodataController');
var accessController = require('../controllers/accessController');
var coursesController = require('../controllers/coursesController');
var checkAuth = require('../check-auth');

// GET Requests
//router.get('/biodata/:id', biodataController)
router.get('/dashboard', checkAuth.checkLocal, checkAuth.verifyToken, accessController.getStudent);
// router.get('/dashboard/view-biodata', accessController.getStudent);
// router.get('/dashboard/update-biodata', accessController.getStudent);
// router.get('/dashboard/manage-courses', accessController.getStudent);

//POST Requests
router.post('/register', accessController.regStudent);
router.post('/login', accessController.loginStudent);
router.post('/dashboard/manage-courses/add-courses/:id', coursesController.addCourses);


//PATCH Requests
router.patch('/dashboard/update-biodata/:id', biodataController.updateBiodata);
// router.patch('/courses/:id', coursesController.editCourse);

//DELETE Requests
router.delete('/dashboard/manage-courses/:id', coursesController.deleteCourse);

















module.exports = router;

