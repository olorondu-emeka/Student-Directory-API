var mongoose = require('mongoose');

 var startDatabase = () => {
     mongoose.connect('mongodb://localhost:27017/Student_Directory', { useNewUrlParser: true });

    //give confirmation message on connection to the database
     mongoose.connection.once('open', function(){
         console.log('Database Connection successful');
     }).on('error', function(error){
         console.log('Connection unsuccessful', error);
     });


 };

 module.exports = startDatabase;
