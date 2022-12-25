const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name:{
        type:String
    },
    dob : {
        type:String
    },
    subject : {
        type:String
    }
});
module.exports = mongoose.model('TeacherSchema',teacherSchema);