import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../componants/Button';
import Input from '../componants/Input';
import { toast } from 'react-toastify';
import axios from "axios";
const UpdateUser = () => {
  const { user } = useAuth(); // Add setUser from AuthContext
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    _id: '', // Store user ID
    name: '',
    phone: '',
    district: '',
    city: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        _id: user._id,
        name: user.name || '',
        phone: user.phone || '',
        district: user.district || '',
        city: user.city || '',
        email: user.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
 const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const updatedData = {
      name: formData.name,
      phone: formData.phone,
      district: formData.district,
      city: formData.city,
      email: formData.email,
      isEmailVerified: user.isEmailVerified, // Preserve email verification status
    };

    // Include password only if it's provided
    if (formData.password) {
      updatedData.password = formData.password;
    }

    // ✅ Use axios.put WITHOUT Authorization header
      await axios.put(`/api/user/data/${formData._id}`, updatedData, {
      withCredentials: true, // ✅ Ensures cookies are sent automatically
    });

    toast.success("User data updated successfully!");
    navigate("/profile");
  } catch (error) {
    console.error("Update error:", error);
    toast.error(error.response?.data?.message || "An error occurred while updating user data.");
  }
};

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100'} py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-200`}>
      <div className="max-w-md w-full space-y-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl rounded-2xl p-8 space-y-8 transition-colors duration-200`}>
          <div className="text-center">
            <h2 className={`mt-4 text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Update Your Account
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleUpdate}>
            <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Name" />
            <Input id="phone" name="phone" type="text" required value={formData.phone} onChange={handleChange} placeholder="Phone number" />
            <Input id="district" name="district" type="text" required value={formData.district} onChange={handleChange} placeholder="District" />
            <Input id="city" name="city" type="text" required value={formData.city} onChange={handleChange} placeholder="City" />
            <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Email address" />
            <Input id="password" name="password" type="password" required={false} value={formData.password} onChange={handleChange} placeholder="New Password (leave empty to keep current)" />
            <Input id="confirmPassword" name="confirmPassword" type="password" required={false} value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm New Password" />

            <div className="space-y-4">
              <Button type="submit" variant="primary" fullWidth>Update Account</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
