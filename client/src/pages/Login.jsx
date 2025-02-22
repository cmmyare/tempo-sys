import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../componants/Button';
import Input from '../componants/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setIsLoading(false);
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            <h2 className={`mt-4 text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back!
            </h2>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sign in to access your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              error={error}
            />

            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/reset-password"
                  className={`font-medium ${
                    isDarkMode 
                      ? 'text-purple-400 hover:text-purple-300' 
                      : 'text-indigo-600 hover:text-indigo-500'
                  } transition-colors duration-200`}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isLoading}
              >
                Sign in
              </Button>

              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-300'}`}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                      New to the platform?
                    </span>
                  </div>
                </div>

                <Link
                  to="/register"
                  className={`mt-4 inline-block font-medium ${
                    isDarkMode 
                      ? 'text-purple-400 hover:text-purple-300' 
                      : 'text-indigo-600 hover:text-indigo-500'
                  } transition-colors duration-200`}
                >
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
