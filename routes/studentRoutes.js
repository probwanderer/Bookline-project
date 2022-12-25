const express = require('express');
const studentModel = require('../models/studentModel.js')
const router = express.Router();
const verify = require('./verifyToken')
//Post Method
router.post('/students/post',verify, async (req, res) => {
    const student = new studentModel({
        name: req.body.name,
        dob: req.body.dob
    });
    try{
        console.log(req.body);
        const studentData=await student.save();
        console.log(studentData);
        console.log(student.name);
        
        res.status(200).json(studentData);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

//Get all Method
router.get('/students/getAll', verify,async (req, res) => {
    try{
        const data = await studentModel.find();
        res.json(data);
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
})

//Get by ID Method
router.get('/students/getOne/:id',verify, async(req, res) => {
    try{
        const data= await studentModel.findById(req.params.id);
        res.json(data);
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
})

//Update by ID Method
router.patch('/students/update/:id',verify, async(req, res) => {
   try{
    const id = req.params.id;
    const updatedData= req.body;
    const options ={new:true};
    const result = await studentModel.findByIdAndUpdate(id,updatedData,options);
    res.send(result);
   }
   catch(error)
   {
    res.status(400).json({message:error.message});
   }
})

//Delete by ID Method
router.delete('/students/delete/:id',verify,async (req, res) => {
    try{
        const id = req.params.id;
        const data= await studentModel.findByIdAndDelete(id);
        res.send(`Student with ${data.name} has been deleted`);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

module.exports = router;