import contactModel from "../models/contactModel.js";

const addContact=async(req,res)=>{
    try{
        const {name,email,subject,phone}=req.body;
        const newcontact=new contactModel({name,email,subject,phone});
        
        await newcontact.save();
        res.json({success:true,message:'sended'})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'not send'})
    }
}
const listcontact=async(req,res)=>{
    try{
    const contacts=await contactModel.find({});
    res.json({success:true,data:contacts});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'error'});
    }
}
const removeMsg=async(req,res)=>{
    try{
        await contactModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'deleted'})
    }
    catch(error){
        console.log(error);
    }
}
export{addContact,listcontact,removeMsg};