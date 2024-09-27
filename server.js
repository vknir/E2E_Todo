const express = require('express')
const mongoose = require('mongoose'); 


const {userRouter} = require('./routes/user')
const app=express()


app.use(express.static('public'))
// server only listens whe connected to DB
async function main(){
    // await 
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000,()=>{
        //inheriting process from config through userRouter
        console.log(`Server is listening`)
    })
}

main()

app.use('/user',userRouter)

app.get('/', (req, res)=>{
    res.render('./index.ejs');
})