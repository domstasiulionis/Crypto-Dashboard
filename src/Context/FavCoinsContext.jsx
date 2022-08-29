import { createContext, useState } from "react";

const FavCoinsContext = createContext();

export function FavCoinsProvider({ children }) {
  const [favCoins, setFavCoins] = useState([]);

  return (
    <FavCoinsContext.Provider value={{ favCoins, setFavCoins }}>
      {children}
    </FavCoinsContext.Provider>
  );
}

export default FavCoinsContext;
