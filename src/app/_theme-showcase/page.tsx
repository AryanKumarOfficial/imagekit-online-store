'use client';

import { useState } from 'react';
import { Preloader, PagePreloaderExample, AsyncPreloaderExample } from '@/components/ui/preloader';
import { usePreloader } from '@/components/providers/preloader-provider';
import { InlineLoading, CardLoadingSkeleton, ListLoadingSkeleton, LoadingDemo } from '@/components/ui/loading';
import { ThemeToggle, ModeToggle } from '@/components/common';
import { useTheme } from 'next-themes';

export default function ThemeShowcase() {
  const [currentPreloader, setCurrentPreloader] = useState<string | null>(null);
  const { showPreloader } = usePreloader();  const { theme, resolvedTheme } = useTheme();

  const preloaderVariants = [
    { name: 'Branded', variant: 'branded' as const, description: 'Full-featured branded preloader with logo and progress' },
    { name: 'Modern', variant: 'modern' as const, description: 'Clean modern design with animations' },
    { name: 'Default', variant: 'default' as const, description: 'Simple and clean design' },
    { name: 'Minimal', variant: 'minimal' as const, description: 'Minimal spinner for quick loads' },
  ];

  const showDemo = (variant: 'default' | 'minimal' | 'branded' | 'modern') => {
    setCurrentPreloader(variant);
    setTimeout(() => setCurrentPreloader(null), 4000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">ImageKit Store</h1>
              <p className="text-sm text-muted-foreground">Theme & Loading System Showcase</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Theme Status */}
        <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-4">Theme System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Current Theme</div>
              <div className="font-medium capitalize">{theme || 'system'}</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Resolved Theme</div>
              <div className="font-medium capitalize">{resolvedTheme}</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Using next-themes</div>
              <div className="font-medium text-green-600">✓ Active</div>
            </div>
          </div>
        </section>

        {/* Preloader Variants */}
        <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-6">Professional Preloader System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {preloaderVariants.map((variant) => (
              <div key={variant.name} className="bg-muted rounded-lg p-4">
                <h3 className="font-medium mb-2">{variant.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{variant.description}</p>
                <button
                  onClick={() => showDemo(variant.variant)}
                  className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Preview
                </button>
              </div>
            ))}
          </div>
          
          {/* Global Preloader Controls */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium mb-4">Global Preloader Controls</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => showPreloader({ variant: 'branded', duration: 3000 })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Global Branded
              </button>
              <button
                onClick={() => showPreloader({ variant: 'modern', duration: 2500 })}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Global Modern
              </button>
              <button
                onClick={() => showPreloader({ variant: 'minimal', duration: 1500 })}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Global Minimal
              </button>
            </div>
          </div>
        </section>

        {/* Loading Components */}
        <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-6">Loading UI Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Inline Loading */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium mb-4">Inline Loading</h3>
              <div className="space-y-3">
                <InlineLoading color="blue" size="sm" />
                <InlineLoading color="purple" size="md" />
                <InlineLoading color="green" size="md" showMessage={false} />
              </div>
            </div>

            {/* Card Skeleton */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium mb-4">Card Skeleton</h3>
              <CardLoadingSkeleton />
            </div>

            {/* List Skeleton */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium mb-4">List Skeleton</h3>
              <ListLoadingSkeleton items={3} />
            </div>
          </div>
        </section>

        {/* Hook Examples */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Advanced Preloader Hooks</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PagePreloaderExample />
            <AsyncPreloaderExample />
          </div>
        </section>

        {/* Loading Demo */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Complete Loading Demo</h2>
          <LoadingDemo />
        </section>

        {/* Features Summary */}
        <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-6">✨ Features Implemented</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3 text-green-600">🎨 Theme System</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• next-themes integration</li>
                <li>• Professional color scheme</li>
                <li>• System theme detection</li>
                <li>• Smooth transitions</li>
                <li>• Hydration safety</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-blue-600">⚡ Loading System</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Professional preloaders</li>
                <li>• Custom React hooks</li>
                <li>• Progress tracking</li>
                <li>• Multiple variants</li>
                <li>• Auto dark mode</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-purple-600">🏗️ Architecture</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Clean folder structure</li>
                <li>• TypeScript types</li>
                <li>• Component exports</li>
                <li>• Provider patterns</li>
                <li>• Performance optimized</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-orange-600">🚀 Performance</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• CSS animations (60fps)</li>
                <li>• Lazy loading ready</li>
                <li>• Memory efficient</li>
                <li>• Minimal bundle size</li>
                <li>• Tree-shaking friendly</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Active Preloader */}
      {currentPreloader && (
        <Preloader
          variant={currentPreloader as any}
          onComplete={() => setCurrentPreloader(null)}
          duration={3000}
          showProgress={true}
        />
      )}
    </div>
  );
}
