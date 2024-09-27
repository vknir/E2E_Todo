const {Router} = require('express');
const userRouter= Router();
const  {z}= require('zod')
const bcrypt= require('bcrypt');
const bodyParser = require('body-parser')


const {JWT_SECRET}=require('../config') 
const {userModel} =require('../db')

userRouter.use(bodyParser.urlencoded({extended : false}))

userRouter.post('/signup', async (req, res)=>{

    const {username, password} = req.body

    const  userCredValidator= z.object({
        username :z.string(),
        password : z.string()
    })

    try{
        userCredValidator.parse({username, password})

        bcrypt.hash(password,3, async (err, result)=>{
            if(err)
            {
                res.json({message:"Error while hashing password"})
            }
            if( result)
            {
                await userModel.create({
                    username: username, 
                    password:result
                });
                res.json({message:"User added successfully!"})
            }
        })

    }catch(e)
    {
        console.log(e)
        res.json({
            message: "Invalid credentails"
        })
    }
})


module.exports={
    userRouter
}