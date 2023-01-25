import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameInfo, fetchTrending } from '../utils/globalUtils';
import GameCategories from '../components/GameCategories';
import Chip from '../components/Chip';
import PlatformIcons from '../components/PlatformIcons';
import TabWrapper from '../components/Tabs/TabWrapper';
import SliderContainer from '../components/SliderContainer';
import Loading from '../components/Loading';

const GameView = () => {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState();
  const [trending, setTrending] = useState();

  const gameInfoTabs = {
    screenshots: { key: 'screenshots', label: 'Screenshots' },
    trailers: { key: 'trailers', label: 'Trailers' },
  };

  useEffect(() => {
    fetchGameInfo(gameId).then((res) => setGameInfo(res[0]));
    fetchTrending().then((res) => setTrending(res));
  }, []);
  console.log(gameInfo);
  if (!gameInfo) return <Loading />;
  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="flex">
        <div className="h-[300px] w-7/12">
          <img
            className="h-full w-full rounded-md border-[1px] border-neutral-800"
            src={gameInfo.header_image}
            alt={gameInfo.name}
            loading="lazy"
          />
        </div>
        <div className="flex-auto ml-4 mt-2">
          <div className="text-2xl font-bold mb-2 cursor-default">{gameInfo.name}</div>
          <div className="text-xs flex gap-2">
            <GameCategories categories={gameInfo.categories} />
          </div>
          <div className="text-xl flex gap-2 items-center">
            {gameInfo.price_overview?.discount_percent !== 0 && (
              <>
                <Chip isBlue>-{gameInfo.price_overview?.discount_percent}%</Chip>
                <div className="text-sm text-gray-300 line-through">{gameInfo.price_overview?.initial_formatted}</div>
              </>
            )}
            <div className="font-medium">{gameInfo.price_overview?.final_formatted}</div>
          </div>
          <button className="w-full bg-blue-600 rounded-md p-1 hover:bg-blue-800">Add to Cart</button>
          <ul className="game-info-table bg-gray-700 my-2 px-4 py-1.5 rounded-md ">
            <li>Edition: Standard</li>
            <li className="flex items-center">
              Platforms:{' '}
              {
                <span className="ml-4">
                  <PlatformIcons platforms={gameInfo.platforms} />
                </span>
              }
            </li>
            <li>Developer: {gameInfo.developers[0]}</li>
            <li>Release Date: {gameInfo.release_date.coming_soon ? 'Coming Soon' : gameInfo.release_date.date}</li>
          </ul>
        </div>
      </div>
      <div>
        <TabWrapper initialTab="screenshots" tabs={gameInfoTabs} />
        <SliderContainer slides={gameInfo.screenshots} type="screenshots" infinite />
      </div>
      <div className="my-2">
        <div className="text-md font-bold  mb-2">About Game</div>
        <div>{gameInfo.short_description}</div>
      </div>
      <div className="my-2">
        <div className="text-md font-bold mb-2">You may wanna try...</div>
        {trending && <SliderContainer slides={trending} type="games" infinite />}
      </div>
    </div>
  );
};

export default GameView;
