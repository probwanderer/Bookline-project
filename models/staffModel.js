const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name:{
        
        type:String
    },
    dob : {
      
        type:String
    },
    work : {
        type:String
    }
});
module.exports = mongoose.model('StaffSchema',staffSchema);