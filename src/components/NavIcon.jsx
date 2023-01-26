import React from 'react';

const NavIcon = ({ iconComponent, badgeCounter }) => {
  // Badge counter dummy implementation needs work
  return (
    <div className="w-full flex justify-center py-2 nav-icon border-b-4 md:border-r-4 md:border-b-0 relative">
      {badgeCounter && badgeCounter !== 0 ? (
        <div className="bg-indigo-800 absolute w-[12px] h-[12px] left-[60%] top-[6px] rounded-full" />
      ) : (
        ''
      )}
      {iconComponent}
    </div>
  );
};

export default NavIcon;
