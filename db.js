const mongoose = require('mongoose') 

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    todos:Object
})

const TodoListSchema = new mongoose.Schema({
    userID: Object,
    todos:Object
}) 

const userModel = mongoose.model('user',UserSchema)
const todolistModel = mongoose.model('todolist',TodoListSchema)

module.exports={userModel, todolistModel}