import LoadingSpinner from './LoadingSpinner';
import { useTheme } from '../context/ThemeContext';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  loading = false,
  fullWidth = false,
  onClick,
  className = ''
}) => {
  const { isDarkMode } = useTheme();
  const baseStyles = "relative flex justify-center items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out";
  
  const variants = {
    primary: `border-transparent text-white ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} focus:ring-indigo-500`,
    secondary: `border-transparent text-white ${isDarkMode ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-600 hover:bg-gray-700'} focus:ring-gray-500`,
    danger: "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
    outline: `${isDarkMode 
      ? 'border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800' 
      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} focus:ring-indigo-500`
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;