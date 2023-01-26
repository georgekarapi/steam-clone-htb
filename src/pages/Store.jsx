import React, { useEffect, useState } from 'react';
import { fetchAllTabs } from '../utils/globalUtils';

import GameCard from '../components/GameCard';
import TabWrapper from '../components/Tabs/TabWrapper';
import Loading from '../components/Loading';

const Store = () => {
  const [inputText, setInputText] = useState('');
  const [gameTabs, setGameTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('trending');

  const filteredMatch = (el) => {
    if (inputText === '') return true;
    if (el.name.toUpperCase().includes(inputText.toUpperCase())) return true;
  };

  const changeTab = (val) => {
    setInputText('');
    setActiveTab(val);
  };
  useEffect(() => {
    fetchAllTabs().then((res) => setGameTabs(res));
  }, []);
  if (Object.keys(gameTabs).length === 0) return <Loading />;
  return (
    <>
      <TabWrapper tabs={gameTabs} initialTab={'trending'} onChange={changeTab} />
      <div className="flex flex-col gap-4 m-4">
        <input
          className="w-full rounded-md p-2 border-blue-900 border-2 bg-transparent"
          placeholder="Search a game..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></input>
        {gameTabs[activeTab].data
          .filter(filteredMatch)
          .slice(0, 10)
          .map((game) => (
            <GameCard key={game._id} game={game} addIcon />
          ))}
      </div>
    </>
  );
};

export default Store;
