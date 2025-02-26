import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from '../componants/Button';

const Profile = () => {
  const { user } = useAuth();
  console.log("viefied mayahay", user)
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200`}>
      <div className="max-w-3xl mx-auto">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow overflow-hidden sm:rounded-lg transition-colors duration-200`}>
          <div className="px-4 py-5 sm:px-6">
            <h3 className={`text-lg leading-6 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Profile Information
            </h3>
            <p className={`mt-1 max-w-2xl text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Your personal details
            </p>
          </div>
          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <dl>
              <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Full name</dt>
                <dd className={`mt-1 text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
                  {user?.name}
                </dd>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>phone number</dt>
                <dd className={`mt-1 text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
                  {user?.phone}
                </dd>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>District</dt>
                <dd className={`mt-1 text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
                  {user?.district}
                </dd>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>City</dt>
                <dd className={`mt-1 text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
                  {user?.city}
                </dd>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Email address</dt>
                <dd className={`mt-1 text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
                  {user?.email}
                </dd>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Email verified</dt>
                <dd className="flex justify-between mt-1 text-sm sm:mt-0 sm:col-span-2">
                  {user?.isAccountVerified ? (
                    <span className="text-green-600">Verified</span>
                  ) : (
                    <span className="text-red-600">Not verified</span>
                  )}
                  {!user?.isAccountVerified &&  <Button
              onClick={() =>navigate('/verify-email')}
              variant="secondary"
              className="text-sm"
            >
              Verify account
            </Button>}
                </dd>
              </div>
            </dl>
          </div>
          <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} text-right sm:px-6`}>
            <Button
              onClick={()=>navigate('/update-user')}
              variant="primary"
              className="text-sm"
            >
              update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 