import AdminModel from '../models/AdminModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//login user
const loginUser= async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await AdminModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"password wrong"})
        }
        const token=createToken(user._id);
        
        res.json({success:true,token,message:"login successfully"});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
    }
}


//register user
const registerUser=async (req,res)=>{
    const {name,password,email}=req.body;
    try{
        //check for already exists user
        const exists=await AdminModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"plz enter valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"plz enter strong password"})
        }
        //hashing user password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        const newUser=new AdminModel(
            {
                email:email,
                password:hashedPassword
            }
        )
       const user= await newUser.save();
       const token=createToken(user._id);
       res.json({success:true,token,message:"registered successfully"})
    }   
    
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    } 
}
const updateUser=async(req,res)=>{
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) {
        return res.json({ success: false, message: "All fields are required" });
    }
    try {
        const user = await AdminModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Old password is incorrect" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating password" });
    }
}
export {loginUser,registerUser,updateUser}