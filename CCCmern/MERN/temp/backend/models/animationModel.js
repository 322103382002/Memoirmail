const mongoose=require('mongoose');
const animationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'userId is required']

    },
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        required:[true,'description is required'],
        trim:true
    },
    video:{
        type:String,
        required:[true,'video is required'],
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});