import { useTheme } from '../context/ThemeContext';
import Button from '../componants/Button';

const Tasks = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="p-6">
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Task Management</h1>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden transition-colors duration-200`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Your Tasks</h2>
            <Button variant="primary">
              Add New Task
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4 rounded-lg transition-colors duration-200`}>
              <h3 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Complete Profile Setup</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>Update your profile information and verify email</p>
            </div>
            <div className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4 rounded-lg transition-colors duration-200`}>
              <h3 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Review Security Settings</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>Check and update your security preferences</p>
            </div>
            <div className={`border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4 rounded-lg transition-colors duration-200`}>
              <h3 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Explore Features</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>Discover all available features and functionalities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks; 