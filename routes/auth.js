const router = require('express').Router();
const User = require('../models/userModel');
const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//validation

router.post('/register', async (req,res)=>{

    // validate the data
    const {error} = registerValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist)return res.status(400).send("Email already exists");
    
    // hash the passwords
    const salt = await bcrypt.genSalt(12);
    const hashedPassord = await bcrypt.hash(req.body.password,salt);
    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassord
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(error){
        res.status(400).send(error);
    }
});
router.post('/login',async(req,res)=>{
    const {error} = loginValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email:req.body.email});
    if(!user)return res.status(400).send("Email doesnt exists");
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send("Invalid Password");
    
    //create and assign a token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET,{expiresIn:'30d'});
    res.header('auth-token',token).send(token);
});
module.exports = router;