import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="p-6">
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-4`}>Welcome Back!</h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            This is your dashboard overview. Here you can monitor your activity and manage your account.
          </p>
        </div>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-4`}>Quick Stats</h3>
          <div className="space-y-2">
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Last Login: 2 hours ago</p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Account Status: Active</p>
          </div>
        </div>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-4`}>Recent Activity</h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 