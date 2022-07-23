import "../Styles/Home.scss";

import CoinCard from "../Components/CoinCard";
import HomeNavBar from "../Components/HomeNavBar";

const Home = ({ coins }) => {
  return (
    <div className="home-container">
      <HomeNavBar />
      <hr />
      <div className="coins-container">
        {coins.map((coin, i) => (
          <CoinCard
            key={i}
            name={coin.name}
            short={coin.symbol.toUpperCase()}
            image={coin.image}
            price={coin.current_price}
            change={Math.round(coin.price_change_24h * 1000) / 1000}
            change24per={
              Math.round(coin.price_change_percentage_24h * 100) / 100
            }
            rank={coin.market_cap_rank}
            priceChart={coin.sparkline_in_7d.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
