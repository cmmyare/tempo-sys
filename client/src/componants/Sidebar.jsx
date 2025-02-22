import { NavLink } from 'react-router-dom';
import { 
  FaUser, 
  FaClipboardList, 
  FaChartBar, 
  FaCog,
  FaBars,
  FaTimes,
  FaImages
} from 'react-icons/fa';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isDarkMode } = useTheme();

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FaChartBar className="w-5 h-5" />
    },
    {
      path: '/profile',
      name: 'Profile Information',
      icon: <FaUser className="w-5 h-5" />
    },
    {
      path: '/tasks',
      name: 'Task Management',
      icon: <FaClipboardList className="w-5 h-5" />
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: <FaCog className="w-5 h-5" />
    },
    {
      path: '/galry',
      name: 'Gallery',
      icon: <FaImages className="w-5 h-5" />
    }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className={`fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg ${
          isDarkMode 
            ? 'bg-purple-600 text-white hover:bg-purple-700' 
            : 'bg-purple-600 text-white'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      <div className={`min-h-screen fixed top-0 left-0 z-40 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out
        md:translate-x-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl w-64`}
      >
        <div className={`p-4 ${isDarkMode ? 'bg-purple-700' : 'bg-purple-600'}`}>
          <h2 className="text-2xl font-bold text-white">AuthMERN</h2>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-4 px-6 py-3 transition-colors duration-200
                ${isActive 
                  ? isDarkMode
                    ? 'text-purple-400 border-r-4 border-purple-400 bg-gray-700'
                    : 'text-purple-600 border-r-4 border-purple-600 bg-purple-50'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-purple-50'
                }`
              }
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 