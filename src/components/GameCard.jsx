import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import PlatformIcons from './PlatformIcons';
import GameCategories from './GameCategories';
import Chip from './Chip';
import { GlobalContext } from '../utils/ContextProvider';

const GameCard = ({ game, deleteIcon, addIcon }) => {
  const { cart, setCart } = useContext(GlobalContext);
  return (
    <div className="relative">
      <div className="absolute right-0 z-10">
        {addIcon || (deleteIcon && addIcon) ? (
          <button
            className="flex items-center text-md font-medium bg-indigo-800 hover:bg-indigo-900 rounded-tr-md p-1"
            onClick={() => setCart({ ...cart, [game._id]: { ...game } })}
          >
            <MdAdd /> Add to Cart
          </button>
        ) : (
          <button
            className="flex items-center text-md font-medium bg-red-800 hover:bg-red-900 rounded-tr-md p-1"
            onClick={() =>
              setCart(() => {
                let temp = cart;
                delete temp[game._id];
                return { ...temp };
              })
            }
          >
            <MdAdd /> Remove from Cart
          </button>
        )}
      </div>
      <Link className="flex flex-col md:flex-row rounded-md bg-neutral-900 cursor-default relative" to={`/store/${game._id}`}>
        <div className="flex-none h-full md:max-w-[320px]">
          <img
            className="w-full object-cover rounded-t-md md:rounded-l-md md:rounded-tr-none"
            src={game.header_image}
            alt={game.name}
            loading="lazy"
          />
        </div>
        <div className="md:w-full flex flex-col justify-between m-4">
          <div className="text-xl font-medium">{game.name}</div>
          <div className="flex justify-between items-center my-2">
            <div>{<PlatformIcons platforms={game.platforms} />}</div>
            <div className="flex text-sm text-center relative">
              {game.price_overview && game.price_overview.discount_percent !== 0 && (
                <div className="text-xl font-medium mr-2">
                  <Chip isBlue>-{game.price_overview?.discount_percent}%</Chip>
                </div>
              )}
              <div className="text-[11px] text-gray-300 line-through absolute bottom-5 right-0">
                {game.price_overview?.initial_formatted}
              </div>
              <div className="text-xl font-medium">{game.price_overview?.final_formatted}</div>
            </div>
          </div>
          <div className="text-xs flex gap-2 flex-wrap md:flex-nowrap">
            <GameCategories categories={game.categories} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
