const {Router} = require('express');
const userRouter= Router();

const  {z}= require('zod')
const bcrypte= require('bcrypt');


const {JWT_SECRET}=require('../config') 


userRouter.post('/signup', (req, res)=>{

    const {username, password} = req.body

})


module.exports={
    userRouter
}