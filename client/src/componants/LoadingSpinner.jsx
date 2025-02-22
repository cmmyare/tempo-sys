import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${
        isDarkMode ? 'border-purple-400' : 'border-indigo-500'
      }`}></div>
    </div>
  );
};

export default LoadingSpinner; 