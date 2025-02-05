import React from 'react';
import { LineChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { sendDiscordNotification } from '../utils/discord';

const Header = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const isDocsPage = location.pathname === '/docs';

  return (
    <header className={`w-full fixed top-0 z-50 ${isContactPage || isDocsPage ? 'bg-white shadow-sm' : 'absolute'}`}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <LineChart className={`w-8 h-8 ${isContactPage || isDocsPage ? 'text-indigo-600' : 'text-white'}`} />
           <span className={`font-bold text-xl ${isContactPage || isDocsPage ? 'text-gray-900' : 'text-white'}`}>Web3 Panel</span>
          </Link>

          {/* Navigation */}
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <a 
                  href="https://www.dropbox.com/scl/fi/qnmitutujij0cdp53da8g/Web3-Panel-Installer.exe?rlkey=7g9shdoqhxmpqwhadfxbhh2ut&st=o53lhu45&dl=1"
                  onClick={() => sendDiscordNotification('download', 'Header')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isContactPage || isDocsPage
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-white text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Download
                </a>
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
        </div>
      </div>
    </header>
  );
};

export default Header;