import React from 'react';

const ImageGameCard = ({ game }) => {
  return (
    <img
      className="object-cover rounded-md border-[1px] border-neutral-800"
      src={game.header_image}
      alt={game.name}
      loading="lazy"
    />
  );
};

export default ImageGameCard;
