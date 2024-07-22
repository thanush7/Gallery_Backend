import { addProfile, editProfile, getbyId, listProfile } from "../Controller/profileController.js";
import express from 'express'
import multer from "multer";
const profileRoute=express.Router();

const storage=multer.diskStorage({
    destination:"puploads",
    filename:(req,file,cb)=>{return cb(null,`${Date.now()}${file.originalname}`)}
})
const upload=multer({storage:storage})

profileRoute.post("/addProfile",upload.single('proImage'),addProfile);
profileRoute.get('/listProfile',listProfile);
profileRoute.put('/editProfile/:id',upload.single('proImage'),editProfile)
profileRoute.get('/getProfile/:id',getbyId)
export default profileRoute;