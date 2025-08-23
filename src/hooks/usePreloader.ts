 'use client';

import { useEffect, useState, useCallback } from 'react';

interface UsePagePreloaderOptions {
  duration?: number;
  variant?: 'default' | 'minimal' | 'branded' | 'modern' | 'dark' | 'dark-branded';
  showProgress?: boolean;
  dependencies?: any[];
}

export function usePagePreloader({
  duration = 2000,
  variant = 'branded',
  showProgress = true,
  dependencies = []
}: UsePagePreloaderOptions = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + (100 / (duration / 50));
      });
    }, 50);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, ...dependencies]);

  return {
    isLoading,
    progress,
    setIsLoading,
    preloaderProps: {
      variant,
      showProgress,
      duration,
      onComplete: () => setIsLoading(false)
    }
  };
}

// Hook for route-based preloading
export function useRoutePreloader() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  useEffect(() => {
    // This is a placeholder for Next.js router integration
    // When implementing, you would add router event listeners here
    return () => {
      // Cleanup would go here
    };
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading
  };
}

// Hook for async operation preloading
export function useAsyncPreloader<T>(
  asyncFn: () => Promise<T>,
  deps: any[] = []
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedAsyncFn = useCallback(asyncFn, deps);

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await memoizedAsyncFn();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [memoizedAsyncFn]);

  const refetch = useCallback(() => {
    setData(null);
    setError(null);
    // The useEffect will automatically re-run due to memoizedAsyncFn dependency
  }, []);

  return {
    isLoading,
    data,
    error,
    refetch
  };
}
