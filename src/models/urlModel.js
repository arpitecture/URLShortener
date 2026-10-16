const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true,
        trim:true,
    },
    code:{
        type:String,
        required:true,
        unique:true,
        
    },
},{ timestamps: true })
const urlModel=mongoose.model('Url',urlSchema);
module.exports=urlModel;