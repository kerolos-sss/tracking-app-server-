import mongoose, { Mongoose } from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true
    }, 
    password: {
        type: mongoose.SchemaTypes.String ,
        required: true
    }

}) 

mongoose.model('User', userSchema)