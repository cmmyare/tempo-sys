import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">AuthMERN</h3>
            <p className="text-gray-600 text-sm">
              Secure, modern, and seamless authentication powered by the MERN stack.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-purple-600 text-sm">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/galry" className="text-gray-600 hover:text-purple-600 text-sm">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {currentYear} AuthMERN. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 