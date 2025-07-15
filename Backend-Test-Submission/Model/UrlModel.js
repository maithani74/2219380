import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl:{type:String,required:true},
    shortCode:{type:String,required:true},
    expiry:{type:Date,required:true},
})

export default URL;