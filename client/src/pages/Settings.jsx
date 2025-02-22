import { useTheme } from '../context/ThemeContext';
import Button from '../componants/Button';

const Settings = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="p-6">
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Settings</h1>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden transition-colors duration-200`}>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Account Settings</h3>
              <div className={`mt-4 space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <Button variant="secondary" className="text-sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Password</span>
                  <Button variant="secondary" className="text-sm">
                    Change
                  </Button>
                </div>
              </div>
            </div>
            
            <div className={`pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Privacy</h3>
              <div className={`mt-4 space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center justify-between">
                  <span>Profile Visibility</span>
                  <Button variant="secondary" className="text-sm">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Usage</span>
                  <Button variant="secondary" className="text-sm">
                    Review
                  </Button>
                </div>
              </div>
            </div>

            <div className={`pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Danger Zone</h3>
              <div className="mt-4">
                <Button variant="danger" className="text-sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 