import imageModel from "../models/imageModel.js";
import fs from 'fs'
import TempModel from "../models/TemModel.js";
import { url } from "inspector";

const addImage=async(req,res)=>{
    let image_file=`${req.file.filename}`;
    const image=new imageModel({
        image:image_file,
        imageName:req.body.imageName,
        category:req.body.category,
        likes:req.body.likes
    })
    
    try{
        await image.save();
        res.json({success:true,message:'image added'});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'not added'})
    }
}

const listImage=async(req,res)=>{
    try{
        const images=await imageModel.find({});
        res.json({success:true,data:images})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'error'})
    }
}

const removeImage=async(req,res)=>{
    try{
        const image=await imageModel.findById(req.body.id);
        fs.unlink(`uploads/${image.image}`,()=>{});
        
        await imageModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"removed"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"not remove"})
    }
}

const addTemp=async(req,res)=>{
    let image_file=`${req.file.filename}`;
    const image=new TempModel({
        image:image_file,
        url:req.body.url,
        name:req.body.name
    })
    
    try{
        await image.save();
        res.json({success:true,message:'template added'});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'not added'})
    }
}

const listTemp=async(req,res)=>{
    try{
        const images=await TempModel.find({});
        res.json({success:true,data:images})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'error'})
    }
}

const removeTemp=async(req,res)=>{
    try{
        const image=await TempModel.findById(req.body.id);
        fs.unlink(`tuploads/${image.image}`,()=>{});
        
        await TempModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"removed"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"not remove"})
    }
}

export {addImage,listImage,removeImage,addTemp,listTemp,removeTemp}