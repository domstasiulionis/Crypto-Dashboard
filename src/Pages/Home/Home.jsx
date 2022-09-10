import { useState, useEffect, useContext, lazy, Suspense } from "react";
import ReactPaginate from "react-paginate";

import "./Home.scss";

import HomeNavBar from "../../Components/Menus/HomePage/HomeNavBar";
import SidebarIconContext from "../../Context/SidebarIconContext";
import Loader from "../../Components/Loaders/Loader";

const CoinCard = lazy(() =>
  import("../../Components/Cards/Not-Expanded/CoinCard")
);

const Home = ({ hamburgerMenu, setHamburgerMenu, coins }) => {
  const [searchText, setSearchText] = useState("");
  const { activeIcon, setActiveIcon } = useContext(SidebarIconContext);

  useEffect(() => {
    setActiveIcon("home");
  }, [activeIcon, setActiveIcon]);

  const converter = (str) => {
    const converted = str * 1;
    return converted.toLocaleString();
  };

  const priceFormatter = (str) => {
    const value = str * 1;
    if (value > 0.01) {
      return value.toLocaleString();
    } else {
      return value.toPrecision(3);
    }
  };

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 25;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(coins.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(coins.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, coins]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % coins.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <div className="home-container">
      <HomeNavBar
        setSearchText={setSearchText}
        hamburgerMenu={hamburgerMenu}
        setHamburgerMenu={setHamburgerMenu}
      />
      <div className="coins-container">
        <Suspense fallback={<Loader />}>
          {currentItems &&
            currentItems
              .filter((value) => {
                if (searchText === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(searchText.toLowerCase())
                ) {
                  return value;
                }
                return null;
              })
              .map((coin) => (
                <CoinCard
                  key={coin.uuid}
                  coinid={coin.uuid}
                  name={coin.name}
                  short={coin.symbol}
                  image={coin.iconUrl}
                  price={priceFormatter(coin.price)}
                  change7d={Math.round(coin.change * 100) / 100}
                  rank={coin.rank}
                  priceChart7d={coin.sparkline}
                  marketCap={converter(coin.marketCap)}
                />
              ))}
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="pagination__button"
            previousLinkClassName="pagination__arrow"
            nextLinkClassName="pagination__arrow"
            activeLinkClassName="pagination--active"
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
