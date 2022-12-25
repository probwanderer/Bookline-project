const express = require('express');
const classesModel = require('../models/classesModel.js')
const router = express.Router();
const verify = require('./verifyToken');
//Post Method
router.post('/classes/post',verify, async (req, res) => {
    const classes = new classesModel({
    className:req.body.class,
    classYear:req.body.year,
    classSubjects:req.body.subjects,
    classTeacher:req.body.classTeacher,
    });
    try{
        const classesData=await classes.save();
        res.status(200).json(classesData);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

//Get all Method
router.get('/classes/getAll',verify, async (req, res) => {
    try{
        const data = await classesModel.find();
        res.json(data);
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
})

//Get by ID Method
router.get('/classes/getOne/:className',verify, async(req, res) => {
    try{
        const data= await classesModel.findOne({className:req.params.className});
        var students= data.students;
        var object = students.reduce((obj,item)=>({...obj,[`Roll${item.rollno}`]:{
            Student_id:item.student_id,
            Marks: item.Marks
        }}),{});
        var classData={};
        classData[req.params.className]={
            Year:data.classYear,
            Class_teacher:data.classTeacher,
            Subject_list:data.classSubjects,
            Students:object

        }
        res.json(classData);
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
})
router.get('/classes/showStudents/:class/:subject',verify,async(req,res)=>{
    try{
        const dataClass= (await classesModel.findOne({className:req.params.class}));
        const subject = req.params.subject;
        console.log(dataClass);
        console.log()
        classStudents= dataClass.students;
        const result = classStudents.filter(item=>item.Marks.hasOwnProperty(subject));
        console.log(result);
        res.send(result);

    } catch(error)
    {
     res.status(400).json({message:error.message});
    }
})
//Update by ID Method
router.patch('/classes/addStudent/:class',verify, async(req, res) => {
   try{
    let classData;
    const dataClass= (await classesModel.findOne({className:req.params.class}));
    classData=dataClass;
    const nextRoll = classData.students.length?classData.students.length+1:1;
    let allstudents = classData.students;
    const newStudent ={...req.body,rollno:nextRoll};
    allstudents.push(newStudent);
    const newClass = {...classData,students:allstudents};
    const options ={new:true};
    const id= classData.id;
    const result = await classesModel.findByIdAndUpdate(id,newClass,options);
    res.send(result);
   }
   catch(error)
   {
    res.status(400).json({message:error.message});
   }
})

//Delete by ID Method
router.delete('/classes/delete/:className',verify,async (req, res) => {
    try{
        const id = req.params.id;
        const data= await classesModel.findOneAndDelete({className:req.params.className});
        res.send(`classes with ${req.params.className} has been deleted`);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

module.exports = router;