var mogoose = require('mongoose');
var StudentModel = require('../models/student');


//PATCH requests
exports.updateBiodata = async(req, res) => {
   await StudentModel.findByIdAndUpdate(req.params.id, { 
       'biodata.email': req.body.email,
       'biodata.phoneNo': req.body.phoneNo,
       'biodata.address': req.body.address,
       'biodata.dob': req.body.dob
    });
   var user = await StudentModel.findById(req.params.id);

    res.status(200).json({
        message: 'Biodata updated successfully'
    });

};