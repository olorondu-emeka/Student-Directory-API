var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var studentModel = require('../models/student');

exports.getStudent = async(req, res) => {
    try{
        const theStudent = await studentModel.findById(req.decoded._id);
        console.log('logged in,', req.decoded);
        res.status(200).json({
            student: theStudent     
        });
    
    } catch(error){
        console.log(error);
    }
    
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

     var theUser = await studentModel.findOne({ 'credentials.matricNo': req.body.matricNo});

    //generate a json web token
    const theToken = jwt.sign({
        matricNo: theUser.credentials.matricNo,
        _id: theUser._id 
    }, 
        process.env.JWT_KEY,
    {
        expiresIn: "1h"
    });

    //send back a response
    res.status(200).json({
        message: 'User saved successfully',
        user: savedUser,
        token: theToken
    });

};

exports.loginStudent = async(req, res) => {
    const userMatric = req.body.matricNo;
    const userPassword = req.body.password;

    const theUser =  await studentModel.findOne({ 'credentials.matricNo': userMatric});
    if (theUser !== null){
        const match = await bcrypt.compare(userPassword, theUser.credentials.password);
        if (match) {
            //generate a json web token
            const theToken = jwt.sign({
                matricNo: theUser.credentials.matricNo,
                _id: theUser._id 
            }, 
                process.env.JWT_KEY,
            {
                expiresIn: "1h"
            });

        
            //send back a response
            res.status(200).json({
                message: 'Login successful',
                authorized: true,
                user: theUser,
                token: theToken 
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

};


exports.deleteAccount = async(req, res) => {
    await studentModel.findByIdAndRemove(req.params.id);

    res.status(200).json({
        message: 'Account deleted successfully'
    });
}