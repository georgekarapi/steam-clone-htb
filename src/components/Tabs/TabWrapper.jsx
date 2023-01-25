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
    <div class="text-sm font-medium text-center border-b dark:text-gray-400 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px">
        {Object.keys(tabs).map((tab) => (
          <Tab tab={tabs[tab]} onActive={changeTab} isActive={tabs[tab].key === activeTab} />
        ))}
      </ul>
    </div>
  );
};

export default TabWrapper;
