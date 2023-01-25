import React from 'react';

const Chip = ({ children, isBlue }) => {
  return (
    <span class={`text-xs font-medium px-1 py-0.5 rounded ${!isBlue ? 'bg-gray-700' : 'bg-indigo-900'} text-gray-300`}>
      {children}
    </span>
  );
};

export default Chip;
