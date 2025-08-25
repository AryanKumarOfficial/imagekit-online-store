"use client";

import {useEffect, useState} from 'react';
import {useTheme} from 'next-themes';

export default function AuthenticationLoading() {
    const [mounted, setMounted] = useState(false);
    const {resolvedTheme} = useTheme();

    // useEffect only runs on the client, so we can safely set the mounted state.
    useEffect(() => {
        setMounted(true);
    }, []);

    // Avoid rendering theme-dependent UI on the server to prevent hydration mismatch.
    if (!mounted) {
        return null; // or a fallback non-themed loader
    }

    const isDark = resolvedTheme === 'dark';

    // Define theme-specific classes
    const backgroundClass = isDark
        ? 'from-gray-900 via-black to-gray-800'
        : 'from-indigo-50 via-white to-cyan-50';

    const mainRingClass = isDark
        ? 'border-gray-700 border-t-indigo-400'
        : 'border-indigo-200 border-t-indigo-600';

    const innerDotClass = isDark ? 'bg-indigo-400' : 'bg-indigo-600';

    const outerRingClass = isDark
        ? 'border-t-cyan-600 border-r-cyan-600'
        : 'border-t-cyan-400 border-r-cyan-400';

    const textClass = isDark ? 'text-indigo-300' : 'text-indigo-700';
    const bouncingDotsClass = isDark ? 'bg-indigo-500' : 'bg-indigo-400';

    return (
        <div className={`min-h-screen bg-gradient-to-br ${backgroundClass} flex items-center justify-center p-4`}>
            <div className="relative">
                {/* Main loading circle */}
                <div className={`w-20 h-20 border-4 ${mainRingClass} rounded-full animate-spin`}></div>

                {/* Inner pulsing dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-3 h-3 ${innerDotClass} rounded-full animate-pulse`}></div>
                </div>

                {/* Outer rotating ring */}
                <div
                    className={`absolute -inset-2 border-2 border-transparent ${outerRingClass} rounded-full animate-spin opacity-60`}
                    style={{animationDirection: 'reverse', animationDuration: '3s'}}
                ></div>

                {/* Text */}
                <div className="absolute top-28 left-1/2 transform -translate-x-1/2 text-center w-max">
                    <p className={`${textClass} font-medium text-lg mb-2`}>Authenticating</p>
                    <div className="flex space-x-1 justify-center">
                        <div className={`w-2 h-2 ${bouncingDotsClass} rounded-full animate-bounce`}
                             style={{animationDelay: '0ms'}}></div>
                        <div className={`w-2 h-2 ${bouncingDotsClass} rounded-full animate-bounce`}
                             style={{animationDelay: '150ms'}}></div>
                        <div className={`w-2 h-2 ${bouncingDotsClass} rounded-full animate-bounce`}
                             style={{animationDelay: '300ms'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
