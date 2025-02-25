import userModel from "../modele/userModel.js";
import img from "../modele/imgModel.js";
import { StatusCodes } from "http-status-codes";
export const getUser = async(req, res) =>{
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        res.json({
            success:true,
            userData: {
                name: user.name, 
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
// get current user
export const getCurrentUser = async (req, res) => {
    const user = await userModel.findOne({ _id: req.body.userId });
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  };
// update user
export const updateUser = async (req, res) => {
    try {
        const { userId, name,phone,district,city, email } = req.body;
        const user = await userModel.findByIdAndUpdate(userId, { name,phone,district,city, email }, { new: true });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        res.json({ success: true, userData: user });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const getImages = async (req, res) => {
    try {
        const images = await img.find();
        res.status(200).json({ success: true, data: images });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const sendImages = async (req, res) => {
    try {
        const { title, subtitle, img: imgUrl } = req.body;

        if (!title || !subtitle || !imgUrl) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // Validate base64 image
        if (!imgUrl.startsWith('data:image')) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid image format" 
            });
        }

        const newImage = new img({ 
            title, 
            subtitle, 
            img: imgUrl 
        });
        
        await newImage.save();

        res.status(201).json({ 
            success: true, 
            data: newImage,
            message: "Image uploaded successfully" 
        });
    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to upload image", 
            error: error.message 
        });
    }
};