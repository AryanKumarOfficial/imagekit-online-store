"use client";
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface LoadingUIProps {
  message?: string;
  variant?: 'default' | 'minimal' | 'overlay';
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingUI({ 
  message = "Loading...", 
  variant = 'default',
  size = 'md'
}: LoadingUIProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };
  if (variant === 'overlay') {
    const overlayBg = isDark ? 'bg-black opacity-70' : 'bg-black opacity-50';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    
    return (
      <div className={`fixed inset-0 ${overlayBg} flex items-center justify-center z-50 backdrop-blur-sm`}>
        <div className={`${cardBg} rounded-2xl p-8 shadow-2xl bg-transparent`}>
          <LoadingSpinner size={size} message={message} isDark={isDark} />
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    const spinnerClass = isDark ? 'border-gray-600 border-t-blue-400' : 'border-gray-200 border-t-blue-600';
    
    return (
      <div className="flex items-center justify-center p-4">
        <div className={`${sizeClasses[size]} border-3 ${spinnerClass} rounded-full animate-spin`}></div>
      </div>
    );
  }

  const defaultBg = isDark ? 'from-gray-900 to-blue-900' : 'from-gray-50 to-blue-50';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${defaultBg} flex items-center justify-center p-4`}>
      <LoadingSpinner size={size} message={message} isDark={isDark} />
    </div>
  );
}

function LoadingSpinner({ size, message, isDark }: { size: 'sm' | 'md' | 'lg'; message: string; isDark: boolean }) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  // Dark theme classes
  const outerRingClass = isDark ? 'border-gray-600' : 'border-gray-200';
  const middleRingClass = isDark ? 'border-t-blue-400 border-r-blue-400' : 'border-t-blue-500 border-r-blue-500';
  const innerRingClass = isDark ? 'border-t-purple-400' : 'border-t-purple-500';
  const centerDotClass = isDark ? 'from-blue-400 to-purple-400' : 'from-blue-500 to-purple-500';
  const textClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const dotsClass = isDark ? 'bg-blue-400' : 'bg-blue-400';
  const particleClasses = {
    blue: isDark ? 'bg-blue-400' : 'bg-blue-300',
    purple: isDark ? 'bg-purple-400' : 'bg-purple-300',
    indigo: isDark ? 'bg-indigo-400' : 'bg-indigo-300'
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Main container with multiple rings */}
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 ${outerRingClass} rounded-full`}></div>
        
        {/* Middle ring */}
        <div className={`absolute inset-1 border-3 border-transparent ${middleRingClass} rounded-full animate-spin`}></div>
        
        {/* Inner ring */}
        <div className={`absolute inset-2 border-2 border-transparent ${innerRingClass} rounded-full animate-spin opacity-75`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${dotSizeClasses[size]} bg-gradient-to-r ${centerDotClass} rounded-full animate-pulse`}></div>
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-6 text-center">
        <p className={`${textSizeClasses[size]} font-medium ${textClass} mb-3`}>{message}</p>
        
        {/* Animated dots */}
        <div className="flex space-x-1 justify-center">
          <div className={`${dotSizeClasses[size]} ${dotsClass} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
          <div className={`${dotSizeClasses[size]} ${dotsClass} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
          <div className={`${dotSizeClasses[size]} ${dotsClass} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-2 h-2 ${particleClasses.blue} rounded-full animate-ping opacity-20`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-3/4 right-1/4 w-1.5 h-1.5 ${particleClasses.purple} rounded-full animate-ping opacity-20`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-1/4 left-3/4 w-1 h-1 ${particleClasses.indigo} rounded-full animate-ping opacity-20`} style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  );
}
