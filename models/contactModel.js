import mongoose  from "mongoose";

const contactScheme=mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        subject:{type:String,required:true},
        phone:{type:String,required:true}
    }
)

const contactModel= mongoose.models.contact || mongoose.model('contact',contactScheme);

export default contactModel;