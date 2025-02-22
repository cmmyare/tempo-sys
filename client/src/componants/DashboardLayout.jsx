import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-200`}>
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 min-h-screen flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 