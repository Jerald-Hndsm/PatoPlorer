import React from 'react';

const Loader = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen select-none"
      role="status"
      aria-live="polite"
    >
      {/* Container for Duck and Eggs */}
      <div className="flex items-end">
        {/* Duck */}
        <div className="text-6xl">
          <span role="img" aria-label="Duck">
            🦆
          </span>
        </div>
        {/* Eggs */}
        <div className="flex space-x-4 ml-4">
          <div className="text-4xl animate-bounceEgg" style={{ animationDelay: '0s' }}>
            <span role="img" aria-label="Egg">
              🥚
            </span>
          </div>
          <div className="text-4xl animate-bounceEgg" style={{ animationDelay: '0.2s' }}>
            <span role="img" aria-label="Egg">
              🥚
            </span>
          </div>
          <div className="text-4xl animate-bounceEgg" style={{ animationDelay: '0.4s' }}>
            <span role="img" aria-label="Egg">
              🥚
            </span>
          </div>
        </div>
      </div>
      {/* Loading Text */}
      <div className="mt-5 font-medium text-2xl text-gray-700">
        Loading...
      </div>
    </div>
  );
};

export default Loader;
