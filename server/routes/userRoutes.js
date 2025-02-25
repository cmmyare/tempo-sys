import express from 'express';
import { getUser,getCurrentUser,updateUser, getImages, sendImages} from '../controller/userController.js';
import userAuth from "../middleware/userAuth.js"
//import { isAuthenticated } from '../controller/authController';
const userRouter = express.Router();

userRouter.get("/data",userAuth, getUser)
userRouter.put("/data/:id",userAuth, updateUser)
userRouter.get("/current-user",userAuth, getCurrentUser);
userRouter.get("/img", getImages)
userRouter.post("/img", sendImages)


export default userRouter;