const express = require('express');
const teacherModel = require('../models/teacherModel.js')
const router = express.Router();
const verify = require('./verifyToken')
//Post Method
router.post('/teacher/post',verify, async (req, res) => {
    const teacher = new teacherModel({
        name: req.body.name,
        dob: req.body.dob,
        subject: req.body.subject
    });
    try{
        
        const teacherData=await teacher.save();
       
        
        res.status(200).json(teacherData);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

//Get all Method
router.get('/teacher/getAll',verify, async (req, res) => {
    try{
        const data = await teacherModel.find();
        res.json(data);
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
})

//Get by ID Method
router.get('/teacher/getOne/:id',verify, async(req, res) => {
    try{
        const data= await teacherModel.findById(req.params.id);
        res.json(data);
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
})

//Update by ID Method
router.patch('/teacher/update/:id',verify, async(req, res) => {
   try{
    const id = req.params.id;
    const updatedData= req.body;
    const options ={new:true};
    const result = await teacherModel.findByIdAndUpdate(id,updatedData,options);
    res.send(result);
   }
   catch(error)
   {
    res.status(400).json({message:error.message});
   }
})

//Delete by ID Method
router.delete('/teacher/delete/:id',verify,async (req, res) => {
    try{
        const id = req.params.id;
        const data= await teacherModel.findByIdAndDelete(id);
        res.send(`teacher with ${data.name} has been deleted`);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

module.exports = router;