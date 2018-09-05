var mongoose = require('mongoose');

 var startDatabase = () => {
     mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds245772.mlab.com:45772/student_directory`, { useNewUrlParser: true });

    //give confirmation message on connection to the database
     mongoose.connection.once('open', function(){
         console.log('Database Connection successful');
     }).on('error', function(error){
         console.log('Connection unsuccessful', error);
     });


 };

 module.exports = startDatabase;
