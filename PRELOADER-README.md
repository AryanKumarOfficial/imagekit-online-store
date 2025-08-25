# ImageKit Store - Preloader System

A comprehensive, professional preloader system designed specifically for the ImageKit Store. Features beautiful animations, multiple variants, and easy integration.

## ✨ Features

- **4 Beautiful Variants**: Branded, Modern, Default, and Minimal
- **Progress Tracking**: Real-time loading progress with customizable messages
- **Responsive Design**: Perfect display on all devices
- **Performance Optimized**: Smooth animations with minimal impact
- **Easy Integration**: Simple provider-based setup
- **TypeScript Support**: Full type safety and IntelliSense
- **Customizable**: Brand colors, duration, and messaging

## 🎨 Preloader Variants

### 1. Branded Preloader (`variant="branded"`)
- **Perfect for**: Main site loading, brand emphasis
- **Features**: 
  - ImageKit Store branding
  - Multi-layered rotating rings
  - Floating particles animation
  - Progress bar with custom messages
  - Gradient color scheme

### 2. Modern Preloader (`variant="modern"`)
- **Perfect for**: Dark themes, premium feel
- **Features**:
  - Dark gradient background
  - Glowing logo animation
  - Smooth progress transitions
  - Professional aesthetic

### 3. Default Preloader (`variant="default"`)
- **Perfect for**: General purpose loading
- **Features**:
  - Clean, minimal design
  - Progress tracking
  - Loading step messages
  - Light theme
  - **Auto dark mode support**

### 4. Minimal Preloader (`variant="minimal"`)
- **Perfect for**: Quick operations, inline loading
- **Features**:
  - Simple spinner
  - Lightweight
  - Fast loading
  - **Auto dark mode support**

### 5. Dark Preloader (`variant="dark"`) ✨ NEW
- **Perfect for**: Dark theme applications
- **Features**:
  - Dark background with light text
  - Blue/purple color scheme optimized for dark mode
  - Progress tracking
  - Modern dark UI aesthetic

### 6. Dark Branded Preloader (`variant="dark-branded"`) ✨ NEW
- **Perfect for**: Dark theme brand emphasis
- **Features**:
  - Dark branded experience
  - ImageKit Store branding in dark theme
  - Multi-layered animations with dark-optimized colors
  - Premium dark aesthetic

## 🚀 Quick Start

### 1. Global Setup (Already Configured)

The preloader is already set up in your `layout.tsx`:

```tsx
import { PreloaderProvider } from "@/components/PreloaderProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PreloaderProvider>
          {children}
        </PreloaderProvider>
      </body>
    </html>
  );
}
```

### 2. Manual Control

```tsx
'use client';
import { usePreloader } from '@/components/PreloaderProvider';

function MyComponent() {
  const { showPreloader, hidePreloader } = usePreloader();

  const handleLongOperation = async () => {
    showPreloader({ 
      variant: 'branded', 
      duration: 3000,
      showProgress: true 
    });
    
    // Perform your operation
    await longRunningTask();
    
    hidePreloader();
  };

  return (
    <button onClick={handleLongOperation}>
      Start Operation
    </button>
  );
}
```

### 3. Page-Specific Preloader

```tsx
'use client';
import { usePagePreloader } from '@/hooks/usePreloader';
import Preloader from '@/components/Preloader';

function MyPage() {
  const { isLoading, preloaderProps } = usePagePreloader({
    variant: 'modern',
    duration: 2000
  });

  return (
    <>
      {isLoading && <Preloader {...preloaderProps} />}
      <div>Your page content</div>
    </>
  );
}
```

### 4. Async Operations

```tsx
'use client';
import { useAsyncPreloader } from '@/hooks/usePreloader';

function DataComponent() {
  const { isLoading, data, error } = useAsyncPreloader(
    () => fetch('/api/data').then(res => res.json()),
    [] // dependencies
  );

  if (isLoading) return <Preloader variant="minimal" />;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{JSON.stringify(data)}</div>;
}
```

## 🎛️ Configuration Options

### PreloaderProvider Options

```tsx
<PreloaderProvider
  showOnMount={true}          // Show preloader on initial load
  defaultOptions={{
    duration: 3000,           // Default duration in milliseconds
    variant: 'branded',       // Default variant
    showProgress: true        // Show progress bar
  }}
>
  {children}
</PreloaderProvider>
```

### Preloader Component Props

```tsx
interface PreloaderProps {
  onComplete?: () => void;           // Callback when loading completes
  duration?: number;                 // Duration in milliseconds
  variant?: 'default' | 'minimal' | 'branded' | 'modern';
  showProgress?: boolean;            // Show progress bar and messages
}
```

## 🎨 Customization

### Custom Brand Colors

Update the CSS variables in `globals.css`:

```css
:root {
  --preloader-primary: #4f46e5;     /* Indigo */
  --preloader-secondary: #7c3aed;   /* Purple */
  --preloader-accent: #ec4899;      /* Pink */
}
```

### Custom Messages

```tsx
const customMessages = [
  'Preparing your experience...',
  'Loading digital assets...',
  'Setting up marketplace...',
  'Almost there...',
  'Welcome to ImageKit Store!'
];
```

## 📱 Responsive Behavior

All preloader variants are fully responsive:

- **Mobile**: Optimized sizing and touch-friendly
- **Tablet**: Balanced proportions
- **Desktop**: Full-featured experience
- **High DPI**: Crisp animations on retina displays

## 🔧 Available Hooks

### `usePagePreloader`
Perfect for page-level loading states.

### `useRoutePreloader`
Handles route change loading (can be integrated with Next.js router).

### `useAsyncPreloader`
Manages async operations with loading states.

### `usePreloader`
Global preloader control from the provider context.

## 🌙 Dark Theme Support

The preloader system includes comprehensive dark theme support with automatic detection and manual control.

### Automatic Theme Detection

All components support automatic dark mode detection using the `theme="auto"` prop (default):

```tsx
// Automatically detects user's system preference
<Preloader variant="default" theme="auto" />
<LoadingUI theme="auto" />
<InlineLoading theme="auto" />
```

### Manual Theme Control

You can also manually control the theme:

```tsx
// Force light theme
<Preloader variant="branded" theme="light" />

// Force dark theme
<Preloader variant="branded" theme="dark" />

// Or use dedicated dark variants
<Preloader variant="dark-branded" />
<Preloader variant="dark" />
```

### Dark Theme Components

#### Dark Mode Preloaders
- `variant="dark"` - Dark theme default preloader
- `variant="dark-branded"` - Dark theme branded preloader
- All other variants auto-adapt when `theme="dark"`

#### Dark Mode Loading Components
```tsx
// Dark theme inline loading
<InlineLoading theme="dark" color="blue" />

// Dark theme skeletons
<CardLoadingSkeleton theme="dark" />
<ListLoadingSkeleton theme="dark" />

// Dark theme main loading UI
<LoadingUI theme="dark" variant="overlay" />
```

### CSS Custom Properties for Dark Mode

Add these to your `globals.css` for consistent theming:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --preloader-bg: #111827;
    --preloader-surface: #1f2937;
    --preloader-text: #f3f4f6;
    --preloader-text-muted: #9ca3af;
    --preloader-border: #374151;
    --preloader-accent: #3b82f6;
  }
}
```

## 🎯 Best Practices

1. **Use appropriate variants**:
   - `branded` for main site loading
   - `modern` for premium features
   - `default` for general operations
   - `minimal` for quick tasks

2. **Duration guidelines**:
   - Quick operations: 1000-2000ms
   - Data loading: 2000-3000ms
   - Heavy operations: 3000-5000ms

3. **Progress messages**:
   - Keep messages short and friendly
   - Use action-oriented language
   - Match your brand voice

## 🎪 Demo

Visit `/preloader-demo` to see all variants in action and test different configurations.

## 🔍 File Structure

```
src/
├── components/
│   ├── Preloader.tsx              # Main preloader component
│   ├── PreloaderProvider.tsx      # Context provider
│   └── loading/
│       └── index.ts               # Exports
├── hooks/
│   └── usePreloader.ts            # Preloader hooks
└── app/
    ├── layout.tsx                 # Provider setup
    ├── globals.css                # Custom animations
    └── preloader-demo/
        └── page.tsx               # Demo page
```

## 🚀 Performance

- **CSS-only animations** for smooth 60fps performance
- **Minimal JavaScript** for fast loading
- **Optimized renders** with React best practices
- **Small bundle size** with tree-shaking support

---

**Need help?** Check the demo page or review the component source code for detailed implementation examples.
