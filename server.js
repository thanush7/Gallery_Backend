import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import imageRoute from './Routes/imageRoute.js'
import contactRoute from './Routes/contactRoute.js';
import userRouter from './Routes/adminRoute.js';
import profileRoute from './Routes/profileRoute.js';
dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());

const PORT=process.env.PORT || 3000

connectDB();

app.use("/api/gallery",imageRoute)
app.use("/images",express.static('uploads'));
app.use("/timages",express.static('tuploads'));
app.use("/pimages",express.static('puploads'));
app.use("/api/order",contactRoute);
app.use("/api/admin/",userRouter);
app.use('/api/profile',profileRoute);
app.listen(PORT,()=>console.log(`listen port ${PORT}`));
