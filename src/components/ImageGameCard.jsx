import React from 'react';
import PlatformIcons from './PlatformIcons';

const ImageGameCard = ({ game }) => {
  return (
    <div className="relative cursor-pointer">
      <img
        className="object-cover rounded-md border-[1px] border-neutral-800"
        src={game.header_image}
        alt={game.name}
        loading="lazy"
      />
      <div className="overlay w-full h-full absolute top-0 invisible opacity-90 bg-neutral-800 hover:visible">
        <div className="flex flex-col gap-2 justify-end m-4">
          <div>{game.name}</div>
          <div>{<PlatformIcons platforms={game.platforms} />}</div>
        </div>
      </div>
    </div>
  );
};

export default ImageGameCard;
