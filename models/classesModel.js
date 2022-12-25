const mongoose = require('mongoose');
const studentModel = require('./studentModel');

const classSchema = new mongoose.Schema({
 
   className:{type:String},
   classYear:{type:String},
   classTeacher:{type:String},
   classSubjects:{type:[]},
   students:[]


});
module.exports = mongoose.model('classSchema',classSchema);