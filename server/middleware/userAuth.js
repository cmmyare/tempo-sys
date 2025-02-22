import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Authentication required. Please login." 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid authentication token." 
            });
        }

        req.body.userId = decoded.id;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid authentication token." 
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: "Authentication token expired. Please login again." 
            });
        }
        console.error('Auth middleware error:', error);
        return res.status(500).json({ 
            success: false, 
            message: "Authentication failed. Please try again." 
        });
    }
};

export default userAuth;
