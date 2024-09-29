const {Router} = require('express');
const userRouter= Router();
const  {z}= require('zod')
const bcrypt= require('bcrypt');
const bodyParser = require('body-parser')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')

const {JWT_SECRET}=require('../config') 
const {userModel, todolistModel} =require('../db')

userRouter.use(bodyParser.urlencoded({extended : false}))

userRouter.post('/signup', async (req, res)=>{

    const {username, password} = req.body

    // craeting user credential validator
    const  userCredValidator= z.object({
        username :z.string().catch((err)=>{
            
            res.json({
            message: "Invalid credentails"
            })
        }),
        password : z.string().catch((err)=>{
            
            res.json({
            message: "Invalid credentails"
            })
        })
    })

    
    userCredValidator.parse({username, password})

    

        //generating hashed password
        bcrypt.hash(password,3, async (err, result)=>{
        if(err)
        {
            res.status(500).json({message:"Error while hashing password"})
        }
        if( result)
        {
            // inserting data in User Collection
            try{
             await userModel.create({
                    username: username, 
                     password:result
                });
                res.status(200).json({message:"User added successfully!"})
            }catch(e)
            {
                res.status(409).json({message:"User name already in use"})
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
                    res.status(200).json({token});
                }else{
                    
                        {
                            res.status(401).json({message:"Invaid Credentails"})
                        }
                }
            })
        }
        else
        {
            res.status(404).json({message:"User doesn't exists!"})
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

userRouter.get('/', async (req, res)=>{
    
    const userID= req.userID

    try{
        const  result = await todolistModel.find( {userID})
        // upadte all todos on FE
        res.status(200).json({
            message:"List populated",
            result:result
        })
    }catch(e)
    {
        res.status(500).json({message:"Error while fetchin data, try again laters"})
    }
})

userRouter.post('/add', async(req, res)=>{
        const todos= req.body.todos;
        const  userID=req.userID

        try{
            await todolistModel.create({todos, userID})
            res.json({message:"Todos created successfully"})
        }catch(e)
        {
            console.log(e)
            res.json({
                message:"Error while updating "
            })
        }
        
})

userRouter.put('/edit/:id', async(req, res)=>{
    const todosID= new mongoose.Types.ObjectId(req.params.id)
    const filter={_id: todosID, userID:req.userID}
    
    const update={
        todos: req.body.todos
    }

    const result = await todolistModel.findOneAndUpdate(filter, update)
    if(result)
    {
        res.json({message: "Todos updated successfully"})
    }
    else{
        res.json({message:"No such todos exists"})
    }
})

userRouter.delete('/delete/:id', async(req, res)=>{
    const todosID= new mongoose.Types.ObjectId(req.params.id)
    const filter={_id: todosID, userID:req.userID}
    
    const update={
        todos: req.body.todos
    }

    const result = await todolistModel.findOneAndDelete(filter)
    if(result)
    {
        res.json({message: "Todos updated successfully"})
    }
    else{
        res.json({message:"No such todos exists"})
    }
})

module.exports={
    userRouter
}