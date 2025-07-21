import React from 'react';
import { Infinity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative bg-[#07021B] text-white py-16 overflow-hidden">
      {/* Bigger Blurred Light */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0F13F6] opacity-30 blur-[160px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-4">
          <Infinity className="h-16 w-16 text-blue-500 drop-shadow-lg" />
          <h1 className="text-5xl font-bold tracking-wide">Infinity Business Ideas</h1>
        </div>
        <p className="text-center mt-4 text-indigo-200 text-xl font-light">
          Explore Endless AI-Generated Business Possibilities
        </p>
      </div>
    </header>
  );
};

export default Header;
