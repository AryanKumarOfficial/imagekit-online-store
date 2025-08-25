'use client';

import { useState } from 'react';
import { Preloader, PagePreloaderExample, AsyncPreloaderExample } from '@/components/ui/preloader';
import { usePreloader } from '@/components/providers/preloader-provider';
import { InlineLoading, CardLoadingSkeleton, ListLoadingSkeleton } from '@/components/ui/loading';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { useTheme } from 'next-themes';

export default function PreloaderDemo() {
  const [currentPreloader, setCurrentPreloader] = useState<string | null>(null);
  const { showPreloader, hidePreloader } = usePreloader();
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const preloaderVariants = [
    { name: 'Branded', variant: 'branded' as const, description: 'Full-featured branded preloader with logo and progress' },
    { name: 'Modern', variant: 'modern' as const, description: 'Dark theme with gradient effects' },
    { name: 'Default', variant: 'default' as const, description: 'Clean and simple design' },
    { name: 'Minimal', variant: 'minimal' as const, description: 'Minimal spinner for quick loads' },
    { name: 'Dark', variant: 'dark' as const, description: 'Dark theme default variant' },
    { name: 'Dark Branded', variant: 'dark-branded' as const, description: 'Dark themed branded preloader' }
  ];
  
  const showDemo = (variant: 'default' | 'minimal' | 'branded' | 'modern' | 'dark' | 'dark-branded') => {
    setCurrentPreloader(variant);
    setTimeout(() => setCurrentPreloader(null), 4000);
  };

  return ( 
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    } p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 transition-colors ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Preloader Showcase
          </h1>
          <p className={`text-lg mb-6 transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Professional loading experiences for your ImageKit Store
          </p>
          
          {/* Theme Toggle */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className={`text-sm transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Theme: {theme} ({isDark ? 'Dark' : 'Light'})
            </span>            <ThemeToggle />
          </div>
        </div>        {/* Variant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {preloaderVariants.map((item) => (
            <div 
              key={item.variant} 
              className={`rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {item.name} Preloader
                  </h3>
                  <p className={`text-sm transition-colors ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
                <button
                  onClick={() => showDemo(item.variant)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Preview
                </button>
              </div>
              {/* Mini preview */}
              <div className={`rounded-lg p-4 h-32 flex items-center justify-center transition-colors ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="relative">
                  {item.variant === 'branded' && (
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">IK</span>
                    </div>
                  )}
                  {item.variant === 'modern' && (
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-purple-700 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded"></div>
                    </div>
                  )}
                  {item.variant === 'dark' && (
                    <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin"></div>
                    </div>
                  )}
                  {item.variant === 'dark-branded' && (
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                      <span className="text-blue-400 font-bold text-sm">IK</span>
                    </div>
                  )}
                  {(item.variant === 'default' || item.variant === 'minimal') && (
                    <div className="w-10 h-10 border-3 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>        {/* Global Preloader Test */}
        <div className={`rounded-xl shadow-lg p-8 mb-8 transition-colors ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-2xl font-semibold mb-6 transition-colors ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Global Preloader Test
          </h2>
          <p className={`mb-4 transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Test the global preloader context functionality:
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => showPreloader({ variant: 'branded', duration: 3000 })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Show Global Preloader
            </button>
            <button
              onClick={() => hidePreloader()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Hide Preloader
            </button>
          </div>
        </div>        {/* Usage Examples */}
        <div className={`rounded-xl shadow-lg p-8 transition-colors ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-2xl font-semibold mb-6 transition-colors ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Usage Examples
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-medium mb-2 transition-colors ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Global Preloader (Automatic)
              </h3>
              <p className={`mb-3 transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Automatically shows on page load via PreloaderProvider in layout.tsx
              </p>
              <div className={`rounded-lg p-4 transition-colors ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <code className={`text-sm transition-colors ${
                  isDark ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  {`// Already configured in your layout.tsx
<PreloaderProvider>
  {children}
</PreloaderProvider>`}
                </code>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-medium mb-2 transition-colors ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Manual Control
              </h3>
              <p className={`mb-3 transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Show/hide preloader programmatically
              </p>
              <div className={`rounded-lg p-4 transition-colors ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <code className={`text-sm transition-colors ${
                  isDark ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  {`const { showPreloader, hidePreloader } = usePreloader();

// Show preloader
showPreloader({ 
  variant: 'branded', 
  duration: 3000 
});

// Hide preloader
hidePreloader();`}
                </code>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-medium mb-2 transition-colors ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Page-specific Preloader
              </h3>
              <p className={`mb-3 transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Use hooks for specific pages or components
              </p>
              <div className={`rounded-lg p-4 transition-colors ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <code className={`text-sm transition-colors ${
                  isDark ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  {`const { isLoading, preloaderProps } = usePagePreloader({
  variant: 'modern',
  duration: 2000
});

return (
  <>
    {isLoading && <Preloader {...preloaderProps} />}
    <YourPageContent />
  </>
);`}
                </code>
              </div>
            </div>
          </div>
        </div>        {/* Theme-aware Components Demo */}
        <div className={`rounded-xl shadow-lg p-8 mb-8 transition-colors ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}>
          <h2 className={`text-2xl font-semibold mb-6 transition-colors ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Theme-Aware Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-lg p-4 transition-colors ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <h3 className={`font-medium mb-3 transition-colors ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Inline Loading
              </h3>
              <InlineLoading color="blue" size="sm" />
            </div>
            <div className={`rounded-lg p-4 transition-colors ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <h3 className={`font-medium mb-3 transition-colors ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Card Skeleton
              </h3>
              <div className="scale-75">
                <CardLoadingSkeleton />
              </div>
            </div>
            <div className={`rounded-lg p-4 transition-colors ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <h3 className={`font-medium mb-3 transition-colors ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                List Skeleton
              </h3>
              <div className="scale-75">
                <ListLoadingSkeleton items={2} />
              </div>
            </div>
          </div>
        </div>        {/* Live Hook Examples */}
        <div className="space-y-8 mb-12">
          <h2 className={`text-2xl font-semibold transition-colors ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Live Hook Examples
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PagePreloaderExample />
            <AsyncPreloaderExample />
          </div>
        </div>        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`rounded-lg p-6 text-center shadow-md transition-colors ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className={`font-semibold mb-2 transition-colors ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Lightning Fast
            </h3>
            <p className={`text-sm transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Optimized animations with minimal performance impact
            </p>
          </div>

          <div className={`rounded-lg p-6 text-center shadow-md transition-colors ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className={`font-semibold mb-2 transition-colors ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Fully Responsive
            </h3>
            <p className={`text-sm transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Perfect display on all devices and screen sizes
            </p>
          </div>

          <div className={`rounded-lg p-6 text-center shadow-md transition-colors ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className={`font-semibold mb-2 transition-colors ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Brand Focused
            </h3>
            <p className={`text-sm transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Customizable to match your brand identity
            </p>
          </div>
        </div>
      </div>

      {/* Active Preloader Demo */}
      {currentPreloader && (
        <Preloader
          variant={currentPreloader as any}
          duration={3500}
          showProgress={true}
          onComplete={() => setCurrentPreloader(null)}
        />
      )}
    </div>
  );
}
