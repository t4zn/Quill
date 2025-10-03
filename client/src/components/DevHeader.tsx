import React from 'react';

const DevHeader: React.FC = () => {
  return (
    <div className="bg-amber-100 border-b border-amber-200 px-4 py-2">
      <div className="flex items-center justify-center gap-2 text-amber-800 text-sm">
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="animate-spin"
        >
          <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        <span>Under Development</span>
      </div>
    </div>
  );
};

export default DevHeader;