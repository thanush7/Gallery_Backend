import mongoose from 'mongoose'

const Tempscheme=mongoose.Schema(
    {
        image:{type:String,required:true},
        url:{type:String,required:true},
        name:{type:String,required:true}
    }
)

const TempModel=mongoose.models.temp || mongoose.model('temp',Tempscheme);

export default TempModel;