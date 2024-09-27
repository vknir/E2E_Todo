const {Router} = require('express');
const userRouter= Router();
const  {z}= require('zod')
const bcrypt= require('bcrypt');
const bodyParser = require('body-parser')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')

const {JWT_SECRET}=require('../config') 
const {userModel} =require('../db')

userRouter.use(bodyParser.urlencoded({extended : false}))

userRouter.post('/signup', async (req, res)=>{

    const {username, password} = req.body

    // craeting user credential validator
    const  userCredValidator= z.object({
        username :z.string(),
        password : z.string()
    })

    try{
        userCredValidator.parse({username, password})

    }catch(e)
    {
        console.log(e)
        res.json({
            message: "Invalid credentails"
        })
    }

    //generating hashed password
        bcrypt.hash(password,3, async (err, result)=>{
        if(err)
        {
            res.json({message:"Error while hashing password"})
        }
        if( result)
        {
            // inserting data in User Collection
            try{
                await userModel.create({
                    username: username, 
                     password:result
                });
                res.json({message:"User added successfully"})
             }
            catch(e)
            {
                res.json({message:e})
            }
            
        }
    })
})

userRouter.post('/login', async (req, res)=>{
    const {username, password}= req.body;
   
    //finding if user exists in DB

   
        const user =await userModel.findOne({username}).exec()

        if( user)
        {
            // comparing passwords
            await bcrypt.compare(password, user.password, (err, response)=>{
                
                if( response )
                {
                    const token = jwt.sign({_id:user._id}, JWT_SECRET);
                    res.json({token});
                }else{
                    
                        {
                            res.json({message:"Invaid Credentails"})
                        }
                }
            })
        }
        else
        {
            res.json({message:"User doesn't exists!"})
        }

    
})

async function userAuth(req, res, next)
{
    
    const token=req.headers.token
    
    const result= jwt.verify(token, JWT_SECRET)

    try{
        const mongoID= new mongoose.Types.ObjectId(result._id)
        await userModel.findOne(mongoID); 

        req.userID= mongoID
        next();
    }catch(e)
    {
        res.json({message:"Invalid token"})
    }
}

userRouter.use(userAuth)

userRouter.get('/',(req, res)=>{
    
})

module.exports={
    userRouter
}