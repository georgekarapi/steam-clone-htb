import React, { useState } from 'react';

const userContextTemplate = {
  cart: {},
  setCart: () => {},
};

export const GlobalContext = React.createContext(userContextTemplate);

export default function ContextProvider({ children }) {
  const [cart, setCart] = useState();
  return <GlobalContext.Provider value={{ cart, setCart }}>{children}</GlobalContext.Provider>;
}
