import React, { useEffect, useState } from 'react';
import { fetchTrending, fetchAllTabs } from '../utils/globalUtils';
import SliderContainer from '../components/SliderContainer';
import Loading from '../components/Loading';

const Home = () => {
  const [games, setGames] = useState({});

  useEffect(() => {
    fetchAllTabs().then((res) => setGames(res));
  }, []);
  if (Object.keys(games).length === 0) return <Loading />;
  return (
    <div className="w-full">
      <div className="w-full">
        {Object.values(games).map((gameCategory) => (
          <div>
            <div className="text-lg text-white">{gameCategory.label}</div>
            <SliderContainer slides={gameCategory.data} type="games" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
