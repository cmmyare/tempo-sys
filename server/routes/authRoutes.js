import express from 'express';
import { 
    isAuthenticated, 
    login, 
    logout, 
    register, 
    resetPassrord, 
    sendRessetOtp, 
    sendVerifyOtp, 
    verifyEmail } from '../controller/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.post('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendRessetOtp);
authRouter.post('/reset-password', resetPassrord);


export default authRouter;