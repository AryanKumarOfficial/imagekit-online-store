// Main loading components
export { default as LoadingUI } from '@/components/LoadingUI';
export { default as InlineLoading, ButtonLoading, CardLoadingSkeleton, ListLoadingSkeleton } from '@/components/InlineLoading';

// Preloader components
export { default as Preloader } from '@/components/Preloader';
export { PreloaderProvider, usePreloader } from '@/components/PreloaderProvider';

// Hooks
export { usePagePreloader, useRoutePreloader, useAsyncPreloader } from '@/hooks/usePreloader';

// Re-export types for convenience
export type LoadingVariant = 'default' | 'minimal' | 'overlay';
export type LoadingSize = 'xs' | 'sm' | 'md' | 'lg';
export type LoadingColor = 'blue' | 'indigo' | 'purple' | 'green' | 'red';
export type PreloaderVariant = 'default' | 'minimal' | 'branded' | 'modern' | 'dark' | 'dark-branded';
export type ThemeVariant = 'light' | 'dark' | 'auto';
