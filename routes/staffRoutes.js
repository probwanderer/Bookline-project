const express = require('express');
const staffModel = require('../models/staffModel.js')
const router = express.Router();
const verify = require('./verifyToken')
//Post Method
router.post('/staff/post',verify, async (req, res) => {
    const staff = new staffModel({
        name: req.body.name,
        dob: req.body.dob,
        work: req.body.work
    });
    try{
        console.log(req.body);
        const staffData=await staff.save();
        console.log(staffData);
        console.log(staff.name);
        
        res.status(200).json(staffData);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

//Get all Method
router.get('/staff/getAll',verify, async (req, res) => {
    try{
        const data = await staffModel.find();
        res.json(data);
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
})

//Get by ID Method
router.get('/staff/getOne/:id',verify, async(req, res) => {
    try{
        const data= await staffModel.findById(req.params.id);
        res.json(data);
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
})

//Update by ID Method
router.patch('/staff/update/:id',verify, async(req, res) => {
   try{
    const id = req.params.id;
    const updatedData= req.body;
    const options ={new:true};
    const result = await staffModel.findByIdAndUpdate(id,updatedData,options);
    res.send(result);
   }
   catch(error)
   {
    res.status(400).json({message:error.message});
   }
})

//Delete by ID Method
router.delete('/staff/delete/:id',verify,async (req, res) => {
    try{
        const id = req.params.id;
        const data= await staffModel.findByIdAndDelete(id);
        res.send(`staff with ${data.name} has been deleted`);
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

module.exports = router;