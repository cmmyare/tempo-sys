import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.post('/api/auth/is-auth');
      //console.log("kan miyaa hada: ", response.data,);
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const getImages = async () => {
    try {
      const response = await axios.get('/api/images/img');
      if (response.data.success) {
        setImages(response.data.data); // Store images in state
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };
  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    if (response.data.success) {
      setUser(response.data.user);
    }
    return response.data;
  };

  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    if (response.data.success) {
      setUser(response.data.user);
    }
    return response.data;
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setUser(null);
  };

  const sendVerificationOTP = async () => {
    const response = await axios.post('/api/auth/send-verify-otp');
    return response.data;
  };

  const verifyEmail = async (otp) => {
    const response = await axios.post('/api/auth/verify-account', { otp });
    if (response.data.success && response.data.user) {
      setUser(response.data.user);
    }
    return response.data;
  };

  const sendResetOTP = async (email) => {
    const response = await axios.post('/api/auth/send-reset-otp', { email });
    return response.data;
  };

  const resetPassword = async (email, otp, password) => {
    const response = await axios.post('/api/auth/reset-password', {
        email, 
        otp, 
        newPassword: password
    });

    //console.log("Response from backend:", response.data);
    return response.data;
};

  const uploadImage = async (formData) => {
    try {
      const response = await axios.post('/api/images/img', formData);
      if (response.data.success) {
        // Update images state with the new image
        setImages(prevImages => [...prevImages, response.data.data]);
        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      return { success: false, message: "Failed to upload image" };
    }
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    sendVerificationOTP,
    verifyEmail,
    sendResetOTP,
    resetPassword,
    images, 
    getImages, 
    uploadImage, 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 