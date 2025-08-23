import { useEffect, useState } from 'react';

interface InlineLoadingProps {
  size?: 'xs' | 'sm' | 'md';
  message?: string;
  showMessage?: boolean;
  color?: 'blue' | 'indigo' | 'purple' | 'green' | 'red';
  theme?: 'light' | 'dark' | 'auto';
}

export default function InlineLoading({ 
  size = 'sm', 
  message = "Loading...", 
  showMessage = true,
  color = 'blue',
  theme = 'auto'
}: InlineLoadingProps) {
  const [isDark, setIsDark] = useState(false);

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
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6'
  };
  const colorClasses = {
    blue: isDark ? 'border-blue-400' : 'border-blue-600',
    indigo: isDark ? 'border-indigo-400' : 'border-indigo-600',
    purple: isDark ? 'border-purple-400' : 'border-purple-600',
    green: isDark ? 'border-green-400' : 'border-green-600',
    red: isDark ? 'border-red-400' : 'border-red-600'
  };

  const textColorClasses = {
    blue: isDark ? 'text-blue-400' : 'text-blue-600',
    indigo: isDark ? 'text-indigo-400' : 'text-indigo-600',
    purple: isDark ? 'text-purple-400' : 'text-purple-600',
    green: isDark ? 'text-green-400' : 'text-green-600',
    red: isDark ? 'text-red-400' : 'text-red-600'
  };

  const borderBaseClass = isDark ? 'border-gray-600' : 'border-gray-200';
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={`${sizeClasses[size]} border-2 ${borderBaseClass} ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}></div>
      {showMessage && (
        <span className={`text-sm font-medium ${textColorClasses[color]}`}>
          {message}
        </span>
      )}
    </div>
  );
}

// Button loading state component
export function ButtonLoading({ 
  children, 
  isLoading, 
  loadingText = "Loading...",
  size = 'xs'
}: {
  children: React.ReactNode;
  isLoading: boolean;
  loadingText?: string;
  size?: 'xs' | 'sm' | 'md';
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <InlineLoading size={size} message={loadingText} showMessage={false} color="blue" />
        <span>{loadingText}</span>
      </div>
    );
  }

  return children;
}

// Card loading skeleton
export function CardLoadingSkeleton({ theme = 'auto' }: { theme?: 'light' | 'dark' | 'auto' }) {
  const [isDark, setIsDark] = useState(false);

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

  const bgClass = isDark ? 'bg-gray-800' : 'bg-white';
  const skeletonClass = isDark ? 'bg-gray-700' : 'bg-gray-200';

  return (
    <div className={`${bgClass} rounded-lg shadow-md p-6 animate-pulse`}>
      <div className={`h-4 ${skeletonClass} rounded-md mb-4`}></div>
      <div className={`h-3 ${skeletonClass} rounded-md mb-2`}></div>
      <div className={`h-3 ${skeletonClass} rounded-md mb-2`}></div>
      <div className={`h-3 ${skeletonClass} rounded-md w-3/4`}></div>
    </div>
  );
}

// List loading skeleton
export function ListLoadingSkeleton({ items = 5, theme = 'auto' }: { items?: number; theme?: 'light' | 'dark' | 'auto' }) {
  const [isDark, setIsDark] = useState(false);

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

  const avatarClass = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const skeletonClass = isDark ? 'bg-gray-700' : 'bg-gray-200';

  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 animate-pulse">
          <div className={`w-10 h-10 ${avatarClass} rounded-full`}></div>
          <div className="flex-1 space-y-2">
            <div className={`h-4 ${skeletonClass} rounded-md`}></div>
            <div className={`h-3 ${skeletonClass} rounded-md w-3/4`}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
