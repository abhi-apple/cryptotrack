import React from "react";
import "./coin.css";
function Coin(props) {
  return (
    <div>
      <div className="coin-container">
        <div className="coin-row">
          <div className="coin">
            <img src={props.image} alt="crypto" />
            <h1>{props.name}</h1>
            <p className="coin-symbol">{props.symbol}</p>
          </div>
          <div className="coin-data">
            <p className="coin-price">₹{props.price}</p>
            <p className="coin-volume">₹{props.volume.toLocaleString()}</p>

            {props.priceChange < 0 ? (
              <p className="coin-percent red">
                {props.priceChange.toFixed(2)}%
              </p>
            ) : (
              <p className="coin-percent green">
                {props.priceChange.toFixed(2)}%
              </p>
            )}

            <p className="coin-marketcap">
              Mkt Cap: ${props.marketcap.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coin;



// import React, { useState } from "react";
// import "./coin.css";

// function Coin(props) {
//   const [lowerLimit, setLowerLimit] = useState("");
//   const [upperLimit, setUpperLimit] = useState("");

//   const handleLowerLimitChange = (e) => {
//     setLowerLimit(e.target.value);
//     // Pass the updated value to the parent component (Presentation)
//     props.onAlertChange("lowerLimit", parseFloat(e.target.value));
//   };

//   const handleUpperLimitChange = (e) => {
//     setUpperLimit(e.target.value);
//     // Pass the updated value to the parent component (Presentation)
//     props.onAlertChange("upperLimit", parseFloat(e.target.value));
//   };

//   return (
//     <div>
//       <div className="coin-container">
//         <div className="coin-row">
//           <div className="coin">
//             <img src={props.image} alt="crypto" />
//             <h1>{props.name}</h1>
//             <p className="coin-symbol">{props.symbol}</p>
//           </div>
//           <div className="coin-data">
//             <p className="coin-price">₹{props.price}</p>
//             <p className="coin-volume">₹{props.volume.toLocaleString()}</p>

//             {props.priceChange < 0 ? (
//               <p className="coin-percent red">
//                 {props.priceChange.toFixed(2)}%
//               </p>
//             ) : (
//               <p className="coin-percent green">
//                 {props.priceChange.toFixed(2)}%
//               </p>
//             )}

//             <p className="coin-marketcap">
//               Mkt Cap: ${props.marketcap.toLocaleString()}
//             </p>

//             {/* Input fields for setting alert triggers */}
//             <div className="coin-alerts">
//               <input
//                 type="number"
//                 placeholder="Lower Limit"
//                 value={lowerLimit}
//                 onChange={handleLowerLimitChange}
//               />
//               <input
//                 type="number"
//                 placeholder="Upper Limit"
//                 value={upperLimit}
//                 onChange={handleUpperLimitChange}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Coin;

