import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './componants/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import DashboardLayout from './componants/DashboardLayout';
import ProtectedRoute from './componants/ProtectedRoute';
import ImageGallery from "./pages/ImageGallery"
import Footer from './components/Footer';
import UpdateUser from './pages/updateUser';
function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || 
                          location.pathname === '/profile' || 
                          location.pathname === '/tasks' || 
                          location.pathname === '/settings' ||
                          location.pathname === '/galry' ||
                          location.pathname === '/update-user';

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
          {!isLandingPage && !isDashboardRoute && <Navbar />}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />            
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Dashboard Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update-user" element={<UpdateUser />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/galry" element={<ImageGallery />} />
              </Route>

              <Route
                path="/verify-email"
                element={
                  <ProtectedRoute>
                    <VerifyEmail />
                  </ProtectedRoute>
                }
              />

              {/* 404 Not Found Route - This should be the last route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          {!isDashboardRoute && <Footer />}
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;


//Add role-based access (e.g., admin vs. user dashboards)?
//To implement role-based access control (RBAC) for admin and user dashboards in your React application, follow these steps: