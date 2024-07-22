import mongoose from "mongoose";

const imageScheme=new mongoose.Schema(
    {
        image:{type:String,required:true},
        imageName:{type:String,required:true},
        category:{type:String,required:true},
        likes:{type:Number,required:true,default:0}
    }
)

const imageModel=mongoose.models.image || mongoose.model('image',imageScheme);

export default imageModel;