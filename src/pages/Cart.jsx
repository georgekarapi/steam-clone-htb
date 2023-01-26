import React, { useContext } from 'react';
import { GlobalContext } from '../utils/ContextProvider';
import { MdOutlineMoodBad, MdDeleteOutline } from 'react-icons/md';
import GameCard from '../components/GameCard';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart } = useContext(GlobalContext);
  return (
    <div className="m-4">
      <div className="text-2xl">Cart</div>
      <div>
        {cart && Object.keys(cart).length !== 0 ? (
          <div className="flex flex-col gap-4">
            <span className="flex justify-end items-center cursor-pointer" onClick={() => setCart({})}>
              <MdDeleteOutline />
              Remove all from cart
            </span>
            {Object.values(cart).map((game) => (
              <GameCard key={game._id} game={game} deleteIcon />
            ))}
          </div>
        ) : (
          <div className="flex flex-col h-[50vh] justify-center items-center">
            <MdOutlineMoodBad size="32px" />
            <div>Oops...Cart looks empty</div>
            <Link to="/store" className=" bg-blue-600 rounded-md p-2 mt-4 hover:bg-blue-800">
              Go back to Store
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
