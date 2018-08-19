var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var studentModel = require('../models/student');

exports.getStudent = async(req, res) => {
    const theStudent = await studentModel.findById(req.params.id);
    res.status(200).json({
        student: theStudent
    });
};

exports.regStudent = async(req, res) => {
    const thePassword = req.body.password;
    const saltRounds = 10;

    //hash the password
    const hashedPassword = await bcrypt.hash(thePassword, saltRounds);

    const student = {
        credentials: {
            matricNo: req.body.matricNo,
            password: hashedPassword,
            course: req.body.course
        },
        biodata: {
            surname: req.body.surname,
            firstname: req.body.firstname,
            level: req.body.level
        }
    };

    const newUser = new studentModel(student);
     const savedUser = await newUser.save();

    //send back a response
    res.status(200).json({
        message: 'User saved successfully',
        user: savedUser
    });

};

exports.loginStudent = async(req, res) => {
    const userMatric = req.body.matricNo;
    const userPassword = req.body.password;

    const theUser =  await studentModel.findOne({ 'credentials.matricNo': userMatric});
    if (theUser !== null){
        const match = await bcrypt.compare(userPassword, theUser.credentials.password);
        if (match) {
            res.status(200).json({
                message: 'Login successful',
                authorized: true,
                user: theUser
            });
        }

        else{
            res.status(201).json({
                message: 'Login unsucessful, username or password not found',
                authorized: false
            });
        }
    }
    else{
        res.status(201).json({
            message: 'Login unsucessful, username or password not found',
            authorized: false
        });
    }

    console.log(theUser);
};