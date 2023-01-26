import React, { useState } from 'react';
import Tab from './Tab';

// Tabs consists from { key: 'key', label: 'Label'}
const TabWrapper = ({ tabs, initialTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const changeTab = (key) => {
    setActiveTab(key);
    onChange(key);
  };

  return (
    <div className="text-sm font-medium text-center border-b dark:text-gray-400 dark:border-gray-700">
      <ul className="flex -mb-px overflow-auto">
        {Object.values(tabs).map((tab) => (
          <Tab key={tab.key} tab={tab} onActive={changeTab} isActive={tab.key === activeTab} />
        ))}
      </ul>
    </div>
  );
};

export default TabWrapper;
