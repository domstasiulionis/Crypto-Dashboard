import { useState, useEffect } from "react";
import axios from "axios";

const Second = () => {
  useEffect(() => {
    const fetchMore = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=25&page=2&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      const data = await res.json();
      return data;
    };
  }, []);

  const fetchData = async () => {
    const nextTwenty = await fetchMore();
    setCoins([...coins, ...nextTwenty]);
    setHasMore(false);
  };

  return <div>{fetchData()}</div>;
};

export default Second;
