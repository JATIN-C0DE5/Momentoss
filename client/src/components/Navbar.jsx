import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-yellow-50/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-red-300/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Heart className="h-10 w-10 text-red-600 transition-transform group-hover:scale-110" fill="currentColor" />
              <div className="absolute inset-0 h-10 w-10 text-red-600 animate-pulse opacity-50">
                <Heart className="h-full w-full" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 via-red-400 to-amber-800 bg-clip-text text-transparent">
              Momentoss
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 shadow-lg shadow-red-600/25' 
                  : 'text-amber-800 hover:text-red-600 hover:bg-red-100/60 hover:shadow-md'
              }`}
            >
              Home
            </Link>
            <Link
              to="/cards"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                isActive('/cards') 
                  ? 'bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 shadow-lg shadow-red-600/25' 
                  : 'text-amber-800 hover:text-red-600 hover:bg-red-100/60 hover:shadow-md'
              }`}
            >
              Create Cards
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                isActive('/contact') 
                  ? 'bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 shadow-lg shadow-red-600/25' 
                  : 'text-amber-800 hover:text-red-600 hover:bg-red-100/60 hover:shadow-md'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-amber-800 hover:text-red-600 hover:bg-red-100/60 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-yellow-50/90 backdrop-blur-sm rounded-lg mt-2 border border-red-200/30">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 shadow-lg' 
                    : 'text-amber-800 hover:text-red-600 hover:bg-red-100/60'
                }`}
              >
                Home
              </Link>
              <Link
                to="/cards"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive('/cards') 
                    ? 'bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 shadow-lg' 
                    : 'text-amber-800 hover:text-red-600 hover:bg-red-100/60'
                }`}
              >
                Create Cards
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive('/contact') 
                    ? 'bg-gradient-to-r from-red-600 to-red-400 text-yellow-50 shadow-lg' 
                    : 'text-amber-800 hover:text-red-600 hover:bg-red-100/60'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;