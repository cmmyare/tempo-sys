import { useTheme } from '../context/ThemeContext';

const Input = ({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error = '',
  label = '',
  className = ''
}) => {
  const { isDarkMode } = useTheme();
  
  const baseStyles = `appearance-none rounded-md relative block w-full px-3 py-2 border transition-all duration-300
    ${isDarkMode 
      ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-purple-500 focus:border-purple-500' 
      : 'bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
    }`;
    
  const errorStyles = error 
    ? isDarkMode
      ? "border-red-500 text-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
      : "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
    : "";

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className={`block text-sm font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          className={`${baseStyles} ${errorStyles} ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && (
        <p className={`mt-1 text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input; 