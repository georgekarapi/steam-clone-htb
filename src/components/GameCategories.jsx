import React from 'react';
import Chip from './Chip';

const GameCategories = ({ categories }) => {
  return (
    <>
      {categories?.slice(0, categories.length >= 3 ? 3 : categories.length).map((cat) => (
        <Chip>
          <span>{cat.description}</span>
        </Chip>
      ))}
    </>
  );
};

export default GameCategories;
