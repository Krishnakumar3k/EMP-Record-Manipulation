import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobileno:{
        type: Number,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
   gender:{
        type: String,
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    action:{
        type: Boolean,
        required: true
    }
})


export default mongoose.model("User", userSchema);