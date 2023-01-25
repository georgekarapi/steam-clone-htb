import React from 'react';
import { FaWindows, FaLinux, FaApple } from 'react-icons/fa';

const PlatformIcons = ({ platforms }) => {
  return (
    <div className="flex gap-4">
      {platforms.windows && <FaWindows size="18px" title="Working with Windows" />}
      {platforms.linux && <FaLinux size="18px" title="Working with Linux" />}
      {platforms.mac && <FaApple size="18px" title="Working with Mac" />}
    </div>
  );
};

export default PlatformIcons;
