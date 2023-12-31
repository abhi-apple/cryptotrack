



import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Coin from "./Coin";
import './coin.css';
import './pre.css';

function Presentation() {
  const [coins, setcoins] = useState([]);
  const [search, setsearch] = useState('coin');

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
      .then(res => {
        setcoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setsearch(e.target.value);
  };
  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="text-3xl font-bold ml-10 mb-5">Enter The Coin</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
      </div>
      {filteredCoins.map(coin => (
        
        <Link key={coin.symbol} to={`/coindetails/${coin.symbol}`}> {/* Use Link with the URL path to coindetails */}
       
          <Coin
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        </Link>
      ))}
    </div>
  );
}

export default Presentation;




