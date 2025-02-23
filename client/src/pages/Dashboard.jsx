import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { FaUsers, FaTasks, FaImages, FaClock } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();

  // Mock data for charts
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Activity',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: isDarkMode ? '#9333ea' : '#4f46e5',
        backgroundColor: isDarkMode 
          ? 'rgba(147, 51, 234, 0.1)' 
          : 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const taskCompletionData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [12, 8, 5],
        backgroundColor: isDarkMode 
          ? ['#9333ea', '#6366f1', '#4c1d95']
          : ['#4f46e5', '#6366f1', '#c7d2fe'],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance',
        data: [30, 45, 35, 50, 40, 60],
        backgroundColor: isDarkMode ? '#9333ea' : '#4f46e5',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#4b5563',
        },
      },
      y: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#4b5563',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDarkMode ? '#9ca3af' : '#4b5563',
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
        Welcome back, {user?.name}!
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
              <FaUsers className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} size={24} />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Users</p>
              <p className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>1,234</p>
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-indigo-900/50' : 'bg-indigo-100'}`}>
              <FaTasks className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} size={24} />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Tasks</p>
              <p className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>25</p>
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
              <FaImages className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} size={24} />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Images</p>
              <p className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>89</p>
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-indigo-900/50' : 'bg-indigo-100'}`}>
              <FaClock className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} size={24} />
            </div>
            <div className="ml-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Time</p>
              <p className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>5.2h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-4`}>Weekly Activity</h3>
          <div className="h-80">
            <Line data={activityData} options={chartOptions} />
          </div>
        </div>

        {/* Task Completion Chart */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-4`}>Task Status</h3>
          <div className="h-80">
            <Doughnut data={taskCompletionData} options={doughnutOptions} />
          </div>
        </div>

        {/* Performance Chart */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200 lg:col-span-2`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-4`}>Performance Overview</h3>
          <div className="h-80">
            <Bar data={performanceData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 