import React from 'react';

const activeTabClass = 'inline-block p-4 border-b-2 border-blue-600 rounded-t-lg active text-blue-500 border-blue-500';
const tabClass =
  'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:border-white hover:text-gray-600 hover:text-white';

const Tab = ({ tab, onActive, isActive }) => {
  return (
    <li class="mr-2 cursor-pointer">
      <div onClick={() => onActive(tab.key)} className={isActive ? activeTabClass : tabClass}>
        {tab.label}
      </div>
    </li>
  );
};

export default Tab;
