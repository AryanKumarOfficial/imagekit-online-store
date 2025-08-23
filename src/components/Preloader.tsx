'use client';

import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
  duration?: number;
  variant?: 'default' | 'minimal' | 'branded' | 'modern' | 'dark' | 'dark-branded';
  showProgress?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

export default function Preloader({ 
  onComplete, 
  duration = 3000,
  variant = 'branded',
  showProgress = true,
  theme = 'auto'
}: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const loadingSteps = [
    'Initializing...',
    'Loading assets...',
    'Setting up interface...',
    'Almost ready...',
    'Welcome!'
  ];

  // Theme detection
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setIsDark(theme === 'dark');
    }
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + (100 / (duration / 50));
      });
    }, 50);

    // Update loading steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loadingSteps.length);
    }, duration / loadingSteps.length);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [duration, onComplete, loadingSteps.length]);

  if (!isVisible) return null;
  if (variant === 'minimal') {
    const bgClass = isDark ? 'bg-gray-900' : 'bg-white';
    const spinnerClass = isDark ? 'border-gray-700 border-t-blue-400' : 'border-gray-200 border-t-blue-600';
    const textClass = isDark ? 'text-gray-300' : 'text-gray-600';
    
    return (
      <div className={`fixed inset-0 ${bgClass} z-[9999] flex items-center justify-center`}>
        <div className="relative">
          <div className={`w-16 h-16 border-4 ${spinnerClass} rounded-full animate-spin`}></div>
          {showProgress && (
            <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm ${textClass}`}>
              {Math.round(progress)}%
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'modern') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-[9999] flex items-center justify-center">
        <div className="text-center">
          {/* Animated logo placeholder */}
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
              </div>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
          </div>

          {/* Progress bar */}
          <div className="w-64 h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-white text-lg font-medium">{loadingSteps[currentStep]}</p>
          <p className="text-gray-400 text-sm mt-2">{Math.round(progress)}%</p>
        </div>
      </div>
    );
  }

  if (variant === 'branded') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 z-[9999] flex items-center justify-center">
        <div className="text-center relative">
          {/* Brand animation */}
          <div className="relative mb-12">
            {/* Main logo container */}
            <div className="relative w-32 h-32 mx-auto">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 border-r-purple-500 rounded-full animate-spin opacity-80"></div>
              
              {/* Middle ring */}
              <div className="absolute inset-3 border-3 border-transparent border-b-blue-400 border-l-cyan-400 rounded-full animate-spin opacity-60" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
              
              {/* Inner ring */}
              <div className="absolute inset-6 border-2 border-transparent border-t-purple-400 rounded-full animate-spin opacity-40" style={{ animationDuration: '3s' }}></div>
              
              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
                  <span className="text-white font-bold text-xl">IK</span>
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '0s' }}></div>
                <div className="absolute right-0 top-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '2s' }}></div>
                <div className="absolute left-0 top-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>

          {/* Brand name */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-pulse">
            ImageKit Store
          </h1>
          <p className="text-gray-600 text-lg mb-8">Premium Digital Marketplace</p>

          {/* Progress section */}
          {showProgress && (
            <div className="space-y-4">
              {/* Progress bar */}
              <div className="w-80 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white opacity-30 animate-pulse rounded-full"></div>
                </div>
              </div>

              {/* Loading text and percentage */}
              <div className="flex justify-between items-center w-80">
                <span className="text-gray-700 font-medium animate-pulse">{loadingSteps[currentStep]}</span>
                <span className="text-indigo-600 font-bold text-lg">{Math.round(progress)}%</span>
              </div>
            </div>
          )}

          {/* Bottom decoration */}
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>        </div>
      </div>
    );
  }

  if (variant === 'dark') {
    return (
      <div className="fixed inset-0 bg-gray-900 z-[9999] flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-8 border-gray-700 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {showProgress && (
            <>
              <div className="w-64 h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-gray-300 font-medium">{loadingSteps[currentStep]}</p>
              <p className="text-gray-500 text-sm mt-1">{Math.round(progress)}%</p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'dark-branded') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-[9999] flex items-center justify-center">
        <div className="text-center relative">
          {/* Brand animation */}
          <div className="relative mb-12">
            {/* Main logo container */}
            <div className="relative w-32 h-32 mx-auto">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full animate-spin opacity-80"></div>
              
              {/* Middle ring */}
              <div className="absolute inset-3 border-3 border-transparent border-b-cyan-400 border-l-pink-400 rounded-full animate-spin opacity-60" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
              
              {/* Inner ring */}
              <div className="absolute inset-6 border-2 border-transparent border-t-purple-400 rounded-full animate-spin opacity-40" style={{ animationDuration: '3s' }}></div>
              
              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
                  <span className="text-gray-900 font-bold text-xl">IK</span>
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '0s' }}></div>
                <div className="absolute right-0 top-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '2s' }}></div>
                <div className="absolute left-0 top-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>

          {/* Brand name */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 animate-pulse">
            ImageKit Store
          </h1>
          <p className="text-gray-400 text-lg mb-8">Premium Digital Marketplace</p>

          {/* Progress section */}
          {showProgress && (
            <div className="space-y-4">
              {/* Progress bar */}
              <div className="w-80 h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse rounded-full"></div>
                </div>
              </div>

              {/* Loading text and percentage */}
              <div className="flex justify-between items-center w-80">
                <span className="text-gray-300 font-medium animate-pulse">{loadingSteps[currentStep]}</span>
                <span className="text-blue-400 font-bold text-lg">{Math.round(progress)}%</span>
              </div>
            </div>
          )}

          {/* Bottom decoration */}
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  const defaultBgClass = isDark ? 'bg-gray-900' : 'bg-white';
  const defaultSpinnerClass = isDark ? 'border-gray-700 border-t-blue-400' : 'border-gray-200 border-t-blue-600';
  const defaultDotClass = isDark ? 'bg-blue-400' : 'bg-blue-600';
  const defaultProgressClass = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const defaultProgressBarClass = isDark ? 'bg-blue-400' : 'bg-blue-600';
  const defaultTextClass = isDark ? 'text-gray-300' : 'text-gray-600';
  const defaultSubTextClass = isDark ? 'text-gray-500' : 'text-gray-500';

  return (
    <div className={`fixed inset-0 ${defaultBgClass} z-[9999] flex items-center justify-center`}>
      <div className="text-center">
        <div className="relative mb-8">
          <div className={`w-24 h-24 border-8 ${defaultSpinnerClass} rounded-full animate-spin mx-auto`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-4 h-4 ${defaultDotClass} rounded-full animate-pulse`}></div>
          </div>
        </div>
        
        {showProgress && (
          <>
            <div className={`w-64 h-2 ${defaultProgressClass} rounded-full mb-4 overflow-hidden`}>
              <div 
                className={`h-full ${defaultProgressBarClass} rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className={`${defaultTextClass} font-medium`}>{loadingSteps[currentStep]}</p>
            <p className={`${defaultSubTextClass} text-sm mt-1`}>{Math.round(progress)}%</p>
          </>
        )}
      </div>
    </div>
  );
}
