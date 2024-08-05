import React, { useState } from 'react';
// import './Checck.css';

const Checck = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className='container mx-auto py-64'>
      <div className={`flex flex-row ${isFilterOpen ? 'filter-open' : ''}`}>
        <div className={`filter-section ${isFilterOpen ? 'w-1/5' : 'w-0'} bg-slate-400 h-full`}>
          <button className='text-3xl px-10 border-2 border-black' onClick={toggleFilter}>Close</button>
          hhh
        </div>
        <div className={`product-section ${isFilterOpen ? 'w-4/5' : 'w-full'} bg-slate-600 py-64`}>
          <button className='text-3xl px-10 border-2 border-black' onClick={toggleFilter}>Filter</button>
          hhh
        </div>
      </div>
    </div>
  );
};

export default Checck;
