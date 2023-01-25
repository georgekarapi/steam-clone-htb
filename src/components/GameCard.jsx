import React from 'react';
import { Link } from 'react-router-dom';
import PlatformIcons from './PlatformIcons';
import GameCategories from './GameCategories';

const GameCard = ({ game }) => {
  console.log(game);
  return (
    <Link to={`/store/${game._id}`}>
      <div className="flex rounded-md bg-neutral-900 cursor-default">
        <div className="flex-none h-full max-w-[230px] md:max-w-[320px]">
          <img className="object-cover rounded-l-md " src={game.header_image} alt={game.name} loading="lazy" />
        </div>
        <div className="w-full flex flex-col justify-between m-4">
          <div className="text-xl font-medium">{game.name}</div>
          <div className="flex justify-between">
            <div>{<PlatformIcons platforms={game.platforms} />}</div>
            <div className="flex flex-col text-sm text-center relative">
              <div className="text-[11px] text-gray-300 line-through absolute bottom-5 right-0">
                {game.price_overview?.initial_formatted}
              </div>
              <div className="text-xl font-medium">{game.price_overview?.final_formatted}</div>
            </div>
          </div>
          <div className="text-xs flex gap-2">
            <GameCategories categories={game.categories} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
