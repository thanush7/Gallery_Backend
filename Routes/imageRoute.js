import express from 'express'
import { addImage ,addTemp,listImage,listTemp,removeImage, removeTemp} from '../Controller/imageController.js'
import multer from 'multer'

const imageRouter=express.Router();

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{return cb(null,`${Date.now()}${file.originalname}`)}
})
const storage1=multer.diskStorage({
    destination:"tuploads",
    filename:(req,file,cb)=>{return cb(null,`${Date.now()}${file.originalname}`)}
})
const upload=multer({storage:storage})
const upload1=multer({storage:storage1})

imageRouter.post('/add',upload.single('image'),addImage);
imageRouter.get('/list',listImage);
imageRouter.post('/remove',removeImage);

imageRouter.post('/addTemp',upload1.single('image'),addTemp);
imageRouter.get('/listTemp',listTemp);
imageRouter.post('/removeTemp',removeTemp);
export default imageRouter;