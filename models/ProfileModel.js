import mongoose from "mongoose";

const profileScheme=mongoose.Schema({
    proImage:{type:String,required:true}, 
    bio:{type:String,required:true},
    whatsapp:{type:String,required:true},
    instagram:{type:String,required:true},
    facebook:{type:String,required:true},
    email:{type:String,required:true},
})

const profileModel=mongoose.models.profile || mongoose.model('profile',profileScheme);
export default profileModel;

