const express = require('express')
const mongoose = require('mongoose'); 
const path = require('path');
const cors= require('cors')

const {userRouter} = require('./routes/user')
const app=express()

const port=process.env.PORT || 3000

app.use(cors())
app.use('/user',userRouter)


// server only listens when connected to DB
async function main(){
    // await 
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port,()=>{
        //inheriting process.env from config through userRouter
        console.log(`Server is listening on port ${port}`)
    })
}

main()



