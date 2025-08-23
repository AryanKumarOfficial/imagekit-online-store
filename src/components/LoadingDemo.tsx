'use client';

import { useState } from 'react';
import LoadingUI from '@/components/LoadingUI';
import InlineLoading, { ButtonLoading, CardLoadingSkeleton, ListLoadingSkeleton } from '@/components/InlineLoading';

export default function LoadingDemo() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Loading Components Demo</h1>
        
        {/* Main Loading UI Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Main Loading UI</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium mb-4">Default Variant</h3>
              <div className="h-64">
                <LoadingUI message="Loading your data..." variant="default" size="md" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium mb-4">Minimal Variant</h3>
              <div className="h-64">
                <LoadingUI variant="minimal" size="md" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium mb-4">Overlay Variant</h3>
              <button 
                onClick={() => setShowOverlay(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show Overlay Loading
              </button>
              {showOverlay && (
                <LoadingUI 
                  message="Processing your request..." 
                  variant="overlay" 
                  size="lg" 
                />
              )}
            </div>
          </div>
        </section>

        {/* Inline Loading Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Inline Loading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium mb-4">Small</h3>
              <InlineLoading size="xs" message="Loading..." color="blue" />
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium mb-4">Medium</h3>
              <InlineLoading size="sm" message="Processing..." color="indigo" />
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium mb-4">Large</h3>
              <InlineLoading size="md" message="Saving..." color="purple" />
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-medium mb-4">Without Text</h3>
              <InlineLoading size="sm" showMessage={false} color="green" />
            </div>
          </div>
        </section>

        {/* Button Loading */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Button Loading</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="space-y-4">
              <button 
                onClick={handleButtonClick}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={buttonLoading}
              >
                <ButtonLoading isLoading={buttonLoading} loadingText="Submitting...">
                  Submit Form
                </ButtonLoading>
              </button>
              
              <p className="text-gray-600 text-sm">Click the button to see the loading state</p>
            </div>
          </div>
        </section>

        {/* Skeleton Loading */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Skeleton Loading</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Card Skeleton</h3>
              <CardLoadingSkeleton />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">List Skeleton</h3>
              <ListLoadingSkeleton items={3} />
            </div>
          </div>
        </section>

        {/* Color Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Color Variants</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <InlineLoading color="blue" size="sm" showMessage={false} />
                <p className="text-sm text-gray-600 mt-2">Blue</p>
              </div>
              <div className="text-center">
                <InlineLoading color="indigo" size="sm" showMessage={false} />
                <p className="text-sm text-gray-600 mt-2">Indigo</p>
              </div>
              <div className="text-center">
                <InlineLoading color="purple" size="sm" showMessage={false} />
                <p className="text-sm text-gray-600 mt-2">Purple</p>
              </div>
              <div className="text-center">
                <InlineLoading color="green" size="sm" showMessage={false} />
                <p className="text-sm text-gray-600 mt-2">Green</p>
              </div>
              <div className="text-center">
                <InlineLoading color="red" size="sm" showMessage={false} />
                <p className="text-sm text-gray-600 mt-2">Red</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Close overlay */}
      {showOverlay && (
        <button 
          onClick={() => setShowOverlay(false)}
          className="fixed top-4 right-4 z-[60] bg-white text-gray-800 py-2 px-4 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
          Close Overlay
        </button>
      )}
    </div>
  );
}
