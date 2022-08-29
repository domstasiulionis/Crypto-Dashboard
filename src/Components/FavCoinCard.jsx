import React from "react";

const FavCoinCard = ({ name, price }) => {
  return (
    <div>
      <div>{name} </div>
      <div>{price}</div>
    </div>
  );
};

export default FavCoinCard;
