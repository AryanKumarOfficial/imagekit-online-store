'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Preloader from './Preloader';

interface PreloaderContextType {
  isLoading: boolean;
  showPreloader: (options?: PreloaderOptions) => void;
  hidePreloader: () => void;
}

interface PreloaderOptions {
  duration?: number;
  variant?: 'default' | 'minimal' | 'branded' | 'modern';
  showProgress?: boolean;
  message?: string;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
}

interface PreloaderProviderProps {
  children: ReactNode;
  showOnMount?: boolean;
  defaultOptions?: PreloaderOptions;
}

export function PreloaderProvider({ 
  children, 
  showOnMount = true,
  defaultOptions = {
    duration: 3000,
    variant: 'branded',
    showProgress: true
  }
}: PreloaderProviderProps) {
  const [isLoading, setIsLoading] = useState(showOnMount);
  const [options, setOptions] = useState<PreloaderOptions>(defaultOptions);

  const showPreloader = (newOptions?: PreloaderOptions) => {
    setOptions({ ...defaultOptions, ...newOptions });
    setIsLoading(true);
  };

  const hidePreloader = () => {
    setIsLoading(false);
  };

  // Auto-hide preloader on initial mount after a delay
  useEffect(() => {
    if (showOnMount) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, options.duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [showOnMount, options.duration]);

  return (
    <PreloaderContext.Provider value={{ isLoading, showPreloader, hidePreloader }}>
      {children}
      {isLoading && (
        <Preloader
          onComplete={hidePreloader}
          duration={options.duration}
          variant={options.variant}
          showProgress={options.showProgress}
        />
      )}
    </PreloaderContext.Provider>
  );
}
