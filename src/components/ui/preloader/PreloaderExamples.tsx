'use client';

import { useState } from 'react';
import { usePagePreloader, useAsyncPreloader } from '@/hooks/usePreloader';
import { Preloader } from './Preloader';
import { useTheme } from 'next-themes';

// Example component using usePagePreloader
export function PagePreloaderExample() {
  const [isActive, setIsActive] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const { isLoading, preloaderProps } = usePagePreloader({
    variant: 'modern',
    duration: 2000,
    dependencies: [isActive]
  });

  return (
    <div className={`rounded-lg p-6 shadow-md transition-colors ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 transition-colors ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        Page Preloader Hook Example
      </h3>
      <button
        onClick={() => setIsActive(!isActive)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors mb-4"
      >
        Trigger Page Preloader
      </button>
      {isLoading && <Preloader {...preloaderProps} />}
      <p className={`text-sm transition-colors ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Status: {isActive ? 'Active' : 'Inactive'} | Loading: {isLoading ? 'Yes' : 'No'}
      </p>
    </div>
  );
}

// Example component using useAsyncPreloader
export function AsyncPreloaderExample() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const mockApiCall = () =>
    new Promise<string>((resolve) => 
      setTimeout(() => resolve('Data loaded successfully!'), 2000)
    );

  const { isLoading, data, error, refetch } = useAsyncPreloader(mockApiCall, []);

  return (
    <div className={`rounded-lg p-6 shadow-md transition-colors ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 transition-colors ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        Async Preloader Hook Example
      </h3>
      <div className="space-y-3">
        <button
          onClick={refetch}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {isLoading ? 'Loading...' : 'Fetch Data'}
        </button>
        
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 border-2 rounded-full animate-spin ${
              isDark ? 'border-green-400 border-t-green-200' : 'border-green-200 border-t-green-600'
            }`}></div>
            <span className={`text-sm transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Fetching data...
            </span>
          </div>
        )}
        
        {data && !isLoading && (
          <div className={`border rounded-lg p-3 transition-colors ${
            isDark 
              ? 'bg-green-900/20 border-green-700 text-green-300' 
              : 'bg-green-50 border-green-200 text-green-800'
          }`}>
            <p className="text-sm">{data}</p>
          </div>
        )}
        
        {error && (
          <div className={`border rounded-lg p-3 transition-colors ${
            isDark 
              ? 'bg-red-900/20 border-red-700 text-red-300' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="text-sm">Error: {error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
