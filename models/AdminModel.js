import mongoose from "mongoose";

const AdminScheme=new mongoose.Schema(
    {
        email:{type:String,required:true},
        password:{type:String,required:true}
    }
)

const AdminModel=mongoose.models.admin || mongoose.model('admin',AdminScheme);

export default AdminModel;