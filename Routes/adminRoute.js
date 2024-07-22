import express from 'express'
import { loginUser,registerUser, updateUser } from '../Controller/AdminController.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/editpass',updateUser);

export default userRouter;