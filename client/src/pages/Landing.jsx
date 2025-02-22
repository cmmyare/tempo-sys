import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaUserFriends, FaCode } from 'react-icons/fa';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 text-white px-4 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-10 -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-10 -bottom-20 -right-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-3xl text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
          Welcome to AuthMERN
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-blue-100">
          Experience secure, modern, and seamless authentication powered by the MERN stack.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-white text-purple-600 rounded-xl text-xl font-semibold 
                     hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 
                     shadow-lg hover:shadow-2xl"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl text-xl font-semibold 
                     hover:bg-white/10 transform hover:scale-105 transition-all duration-200 
                     shadow-lg hover:shadow-2xl"
          >
            Sign Up
          </button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="relative z-10 grid md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
        <div className="group bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
            <FaShieldAlt className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Secure Authentication</h3>
          <p className="text-blue-100 leading-relaxed">
            Industry-standard security protocols and encryption methods to keep your data safe and protected.
          </p>
        </div>

        <div className="group bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
            <FaUserFriends className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">User-Friendly</h3>
          <p className="text-blue-100 leading-relaxed">
            Intuitive interface designed for the best user experience with smooth navigation and clear feedback.
          </p>
        </div>

        <div className="group bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
          <div className="flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
            <FaCode className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Modern Stack</h3>
          <p className="text-blue-100 leading-relaxed">
            Built with the latest technologies including MongoDB, Express.js, React, and Node.js for optimal performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing; 