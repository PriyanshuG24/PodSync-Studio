import React from 'react';

const DashboardHome = () => {
  return (
    <div className="flex justify-center h-full p-5">
      <button 
        className="w-20 h-20 rounded-full bg-red-500 text-white font-bold text-sm md:text-base
                  flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 
                  active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2
                  focus:ring-red-500 focus:ring-opacity-50"
        onClick={() => console.log('Record button clicked')}
      >
        RECORD
      </button>
    </div>
  );
};

export default DashboardHome;