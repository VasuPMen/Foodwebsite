import express from 'express';
import { loginUser , registerUser } from '../controllers/userController.js';

const app = express()

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

export default userRouter