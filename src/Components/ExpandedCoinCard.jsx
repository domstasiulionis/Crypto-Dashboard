// import axios from "axios";
// import React, { useState, useEffect } from "react";

// import "../Styles/ExpandedCoinCard.scss";

// const ExpandedCoinCard = ({ coinid }) => {
//   const [coin, setCoin] = useState({});

//   const url = `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&sparkline=true
// `;

//   useEffect(() => {
//     axios.get(url).then((res) => {
//       setCoin(res.data);
//     });
//   }, [url]);

//   return (
//     <div>
//       <div className="coin-top">
//         <div className="coin-top__price">
//           £
//           {coin.market_data?.current_price
//             ? coin.market_data.current_price.gbp.toLocaleString()
//             : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExpandedCoinCard;
