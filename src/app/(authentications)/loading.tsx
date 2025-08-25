export default function AuthenticationLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="relative">
        {/* Main loading circle */}
        <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
        </div>
        
        {/* Outer rotating ring */}
        <div className="absolute -inset-2 border-2 border-transparent border-t-cyan-400 border-r-cyan-400 rounded-full animate-spin opacity-60" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
        
        {/* Text */}
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-indigo-700 font-medium text-lg mb-2">Authenticating</p>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}