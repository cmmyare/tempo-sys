import express from 'express';
import { getUser, getImages, sendImages} from '../controller/userController.js';
import userAuth from "../middleware/userAuth.js"
//import { isAuthenticated } from '../controller/authController';
const userRouter = express.Router();

userRouter.get("/data",userAuth, getUser)
userRouter.get("/img", getImages)
userRouter.post("/img", sendImages)


export default userRouter;