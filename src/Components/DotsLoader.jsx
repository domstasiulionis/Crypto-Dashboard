import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { FiRefreshCw } from "react-icons/fi";

import "../Styles/DotsLoader.scss";

const DotsLoader = ({ setExpanded }) => {
  const refreshHandler = () => {
    setExpanded(false);
    setTimeout(() => {
      setExpanded(true);
    }, 300);
  };

  return (
    <div className="loader-container">
      <div className="dot-elastic" />
      <p className="fetching-msg">Fetching data...</p>
      <div className="dont-ref">
        <p>
          <b>Please do not refresh the page</b>
        </p>
        <Tippy
          placement="right"
          delay={100}
          theme="custom"
          interactive={true}
          content={
            <>
              <h3>Waiting for a while?</h3>
              <p>
                Long waits for data retrieval can be caused by the CORS policy.
                The server becomes overloaded with requests for data and can
                temporarily stop responding, this issue typically resolves
                itself shortly. You can use the refresh button below to refresh
                this specific coin. <b>We apologise for this delay!</b>
              </p>
              <div className="ref">
                <div onClick={refreshHandler} className="ref-items">
                  <button className="ref-items-btn">Refresh Coin</button>
                  <FiRefreshCw className="ref-items-icon" />
                </div>
              </div>
            </>
          }
        >
          <div className="info">i</div>
        </Tippy>
      </div>
    </div>
  );
};

export default DotsLoader;
