import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Input from '../componants/Input';

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { sendResetOTP, resetPassword } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      await sendResetOTP(formData.email);
      setMessage('OTP has been sent to your email');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await resetPassword(formData.email, formData.otp, formData.password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100'} py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-200`}>
      <div className="max-w-md w-full space-y-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl rounded-2xl p-8 space-y-8 transition-colors duration-200`}>
          <div>
            <h2 className={`mt-6 text-center text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Reset your password
            </h2>
            <p className={`mt-2 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {step === 1 ? 'Enter your email to receive a reset code' : 'Enter the reset code and your new password'}
            </p>
          </div>

          {step === 1 ? (
            <form className="mt-8 space-y-6" onSubmit={handleSendOTP}>
              {error && (
                <div className={`p-4 rounded-md ${isDarkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-50 text-red-700'}`}>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              {message && (
                <div className={`p-4 rounded-md ${isDarkMode ? 'bg-green-900/50 text-green-200' : 'bg-green-50 text-green-700'}`}>
                  <p className="text-sm">{message}</p>
                </div>
              )}

              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />

              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
              >
                Send Reset Code
              </button>
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
              {error && (
                <div className={`p-4 rounded-md ${isDarkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-50 text-red-700'}`}>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              {message && (
                <div className={`p-4 rounded-md ${isDarkMode ? 'bg-green-900/50 text-green-200' : 'bg-green-50 text-green-700'}`}>
                  <p className="text-sm">{message}</p>
                </div>
              )}

              <div className="space-y-4">
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  placeholder="Enter reset code"
                  value={formData.otp}
                  onChange={handleChange}
                />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="New password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
