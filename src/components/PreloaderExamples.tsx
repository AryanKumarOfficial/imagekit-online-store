'use client';

import { useState } from 'react';
import { usePagePreloader, useAsyncPreloader } from '@/hooks/usePreloader';
import Preloader from '@/components/Preloader';

// Example component using usePagePreloader
export function PagePreloaderExample() {
  const [isActive, setIsActive] = useState(false);
  const { isLoading, preloaderProps } = usePagePreloader({
    variant: 'modern',
    duration: 2000,
    dependencies: [isActive]
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Page Preloader Hook Example</h3>
      <button
        onClick={() => setIsActive(!isActive)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors mb-4"
      >
        Trigger Page Preloader
      </button>
      {isLoading && <Preloader {...preloaderProps} />}
      <p className="text-sm text-gray-600">
        Status: {isActive ? 'Active' : 'Inactive'} | Loading: {isLoading ? 'Yes' : 'No'}
      </p>
    </div>
  );
}

// Example component using useAsyncPreloader
export function AsyncPreloaderExample() {
  const mockApiCall = () => 
    new Promise<string>((resolve) => 
      setTimeout(() => resolve('Data loaded successfully!'), 2000)
    );

  const { isLoading, data, error, refetch } = useAsyncPreloader(mockApiCall, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Async Preloader Hook Example</h3>
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
            <div className="w-4 h-4 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Fetching data...</span>
          </div>
        )}
        
        {data && !isLoading && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-800 text-sm">{data}</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-sm">Error: {error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
