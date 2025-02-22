import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../modele/userModel.js';
import transporter from '../config/nodemailer.js';

// Register User
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        // Set token in cookies
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // set to true in production
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Get user data without sensitive fields
        const userData = await userModel.findById(user._id).select('-password -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt');

        // Send Welcome Email
        try {
            const mailOptions = {
                from: process.env.SENDER_EMAIL, 
                to: email,
                subject: 'Welcome!',
                text: `Welcome ${name}! Thank you for registering.`
            };
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Don't fail registration if email fails
        }

        return res.status(201).json({ 
            success: true, 
            message: "Registered successfully",
            user: userData
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ 
            success: false, 
            message: "Registration failed. Please try again." 
        });
    }
};


// login
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // set to true in production
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Get user data without sensitive fields
        const userData = await userModel.findById(user._id).select('-password -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt');
      
        return res.json({ 
            success: true, 
            message: "Login successful",
            user: userData
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ 
            success: false, 
            message: "Login failed. Please try again." 
        });
    }
};



// logout
export const logout = async (req, res) => {
   try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false, // set to true in production
      sameSite: 'lax',
      path: '/'
    });
    return res.status(200).json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
   } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to logout. Please try again.' 
    });
   }
}



// Send Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ 
                success: false, 
                message: "Account is already verified" 
            });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        // send mail to the user
        const mailOptions = {
            from: process.env.SENDER_EMAIL, 
            to: user.email,
            subject: 'Account Verification OTP',
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #4CAF50; text-align: center;">Account Verification OTP</h2>
                <p>Dear ${user.name},</p>
                <p>Your One-Time Password (OTP) for verifying your account is:</p>
                <p style="font-size: 24px; font-weight: bold; text-align: center; color: #4CAF50;">${otp}</p>
                <p>This OTP is valid for 15 minutes.</p>
                <p>Please use this OTP to complete your account verification. For security reasons, do not share this OTP with anyone.</p>
                <p>Thank you,</p>
                <p><strong>Your Team</strong></p>
            </div>
            `
        };
        
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true, 
            message: "Verification OTP sent to your email"
        });
    } catch (error) {
        console.error('Send verification OTP error:', error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to send verification OTP. Please try again." 
        });
    }
};



// Verify OTP
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if(!userId || !otp){
        return res.status(400).json({ 
            success: false, 
            message: "Missing Details"
        });
    }
    try {
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({ 
                success: false, 
                message: "User not found." 
            });
        }
        if(user.verifyOtp === "" || user.verifyOtp !== otp){
            return res.status(400).json({ 
                success: false, 
                message: "Invalid OTP"
            });
        }
        if(user.verifyOtpExpireAt < Date.now()){
            return res.status(400).json({ 
                success: false, 
                message: "OTP expired"
            });
        }

        // Update user verification status
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        // Get updated user data without sensitive fields
        const userData = await userModel.findById(userId)
            .select('-password -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt');

        return res.status(200).json({ 
            success: true, 
            message: "Account verified successfully",
            user: userData
        });
    } catch (error) {
        console.error('Email verification error:', error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to verify email. Please try again." 
        });
    }
};

// check if user is logged in
export const isAuthenticated = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const user = await userModel.findById(userId)
      .select('-password -verifyOtp -verifyOtpExpireAt -resetOtp -resetOtpExpireAt');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify authentication"
    });
  }
};


// send Reset Password otp
export const sendRessetOtp = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; 
        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL, 
            to: user.email,
            subject: 'Account Verification OTP',
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #4CAF50; text-align: center;">Reset Password OTP</h2>
                <p>Dear User,</p>
                <p>Your One-Time Password (OTP) for resetting the password is:</p>
                <p style="font-size: 24px; font-weight: bold; text-align: center; color: #4CAF50;">${otp}</p>
                <p>This OTP is valid for 15 minutes.</p>
                <p>Please reset your password by entering this OTP. For your security, do not share this OTP with anyone.</p>
                <p>Thank you,</p>
                <p><strong>OneClick.so Team</strong></p>
            </div>
        `  
        };

        await transporter.sendMail(mailOption);
        return res.json({ success: true, message: "Reset Password OTP sent on your Email." });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};



// reset user password
export const resetPassrord = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    console.log("Received Request Body:", req.body); // Log entire body
    console.log("Email:", email, "OTP:", otp, "New Password:", newPassword);
    console.log("Type Check - Email:", typeof email, "OTP:", typeof otp, "New Password:", typeof newPassword);

    if (!email?.trim() || !otp?.trim() || !newPassword?.trim()) {
        console.log("Validation failed: Missing email, OTP, or new password.");
        return res.json({ success: false, message: "Email, OTP, and new Password are required." });
    }

    try {
        const user = await userModel.findOne({ email: { $regex: new RegExp("^" + email + "$", "i") } });
        console.log("User found:", user);

        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        console.log("Stored OTP:", user.resetOtp, "Provided OTP:", otp);

        if (!user.resetOtp || String(user.resetOtp) !== String(otp)) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        console.log("OTP Expiry Time:", user.resetOtpExpireAt, "Current Time:", Date.now());

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save()
            .then(() => console.log("Password reset successfully"))
            .catch(err => console.error("Error saving user:", err));

        return res.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Error:", error);
        return res.json({ success: false, message: error.message });
    }
};





export const checkAuth = async (req, res) => {
    try {
      // User will be attached by auth middleware
      if (!req.user) {
        return res.status(401).json({ 
          success: false,
          message: 'Not authenticated' 
        });
      }
      
      const user = await User.findById(req.user._id).select('-password');
      res.json({ 
        success: true,
        user 
      });
    } catch (error) {
      console.error('Check auth error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Server error' 
      });
    }
  };


  export const updateProfile = async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: 'User not found' 
        });
      }
  
      // Check if new email already exists
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ 
            success: false,
            message: 'Email already in use' 
          });
        }
        user.email = email;
      }
  
      if (name) {
        user.name = name;
    }

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};



export const updatePassword = async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
  
      // Validate input
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ 
          success: false,
          message: 'Please provide both current and new password' 
        });
      }
  
      if (newPassword.length < 6) {
        return res.status(400).json({ 
          success: false,
          message: 'New password must be at least 6 characters long' 
        });
      }
  
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: 'User not found' 
        });
      }
  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ 
      success: false,
      message: 'Current password is incorrect' 
    });
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.json({ 
    success: true,
    message: 'Password updated successfully' 
  });
} catch (error) {
  console.error('Update password error:', error);
  res.status(500).json({ 
    success: false,
    message: 'Server error' 
  });
}
};