import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../componants/Button';
import Input from '../componants/Input';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const { user, sendVerificationOTP, verifyEmail } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAccountVerified) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      await verifyEmail(otp);
      setMessage('Email verified successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOTP = async () => {
    setIsSendingOTP(true);
    setError('');
    setMessage('');

    try {
      await sendVerificationOTP();
      setMessage('Verification code sent successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification code');
    } finally {
      setIsSendingOTP(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100'} py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-200`}>
      <div className="max-w-md w-full space-y-8">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl rounded-2xl p-8 space-y-8 transition-colors duration-200`}>
          <div className="text-center">
            <svg
              className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className={`mt-4 text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Verify your email
            </h2>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Please enter the verification code sent to{' '}
              <span className={`font-medium ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'}`}>{user?.email}</span>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
              id="otp"
              name="otp"
              type="text"
              required
              placeholder="Enter verification code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              error={error}
            />

            <div className="space-y-4">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isSubmitting}
              >
                Verify Email
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSendOTP}
                  loading={isSendingOTP}
                  className="text-sm"
                >
                  Resend verification code
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 