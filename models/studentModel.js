const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
        name:{
            type:String
       },
       dob:{
        type:String
       }
});
module.exports = mongoose.model('StudentSchema',studentSchema);