import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RechartsExample from "../RechartsExample";
import "../components/coinDetails.css"; // Import the CSS file
import logo from "../images/logo.jpg";
import addNotification from "react-push-notification";
import emailjs from "emailjs-com";
const CoinDetails = () => {
  const { id } = useParams(); // Get the coinid from the URL parameter
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  // State to store the fetched data
  const [coinData, setCoinData] = useState([]);
  // State to store user-selected interval and target
  const [interval, setInterval] = useState("4hour");
  const [target, setTarget] = useState("USD");

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://real-time-quotes1.p.rapidapi.com/api/v1/historical/crypto",
      params: {
        interval,
        source: id,
        target,
      },
      headers: {
        "X-RapidAPI-Key": "ce222f844dmshe102f93562134c4p184e64jsn78b106510366",
        "X-RapidAPI-Host": "real-time-quotes1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const extractedData = response.data.map((item) => ({
        timestamp: new Date(item.date).getTime(),
        closePrice: parseFloat(item.close),
      }));
      setCoinData(extractedData);

      // Check the trigger when new data is fetched
      checkPriceTrigger(extractedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Request notification permission when component mounts
    Notification.requestPermission();

    fetchData(); // Call the fetchData function
  }, [id, interval, target]);
  const [upperLimit, setUpperLimit] = useState(0);
  const [LowerLimit, setLowerLimit] = useState(0);

  useEffect(() => {
    // Ask for permission to show browser notifications
    Notification.requestPermission();
  }, []);

  // Function to handle the trigger check
  const checkPriceTrigger = (data) => {
    const latestPrice = coinData[0]?.closePrice;
    if (latestPrice > upperLimit) {
      // Show a browser notification
      if (Notification.permission === "granted") {
        console.log("hi");
        addNotification({
          title: `Price Alert for ${id}`,
          message: `Price has crossed the upper limit of ${upperLimit}. Current price: ${latestPrice}`,
          duration: 5000,
          icon: { logo },
          native: true,
        });
      }
    }
    if (latestPrice > LowerLimit) {
      // Show a browser notification
      if (Notification.permission === "granted") {
        addNotification({
          title: `Price Alert for ${id}`,
          message: `Price has crossed the upper limit of ${upperLimit}. Current price: ${latestPrice}`,
          duration: 5000,
          icon: { logo },
          native: true,
        });
      }
    }
  };

  useEffect(() => {
    // Call the trigger check function whenever coinData updates
    checkPriceTrigger(coinData);
  }, [coinData, upperLimit]);
  const handleFetchData = () => {
    fetchData();
  };
  const [email, setEmail] = useState("");

  // Function to handle the subscribe button click
  const handleSubscribe = () => {
    setShowSubscriptionPopup(true);
    if (email) {
      // Send the subscription email
      const templateParams = {
        to_email: email,
        coin_name: id,
      };

      emailjs
        .send(
          "abhin@gmail.com",
          "wqehbrih43uh8b53ug",
          templateParams,
          "abhinay"
        )
        .then((result) => {
          console.log("Subscription email sent successfully:", result.text);
        })
        .catch((error) => {
          console.error("Failed to send subscription email:", error);
        });
    }
    setTimeout(() => {
      setShowSubscriptionPopup(false);
    }, 3000);
  };

  return (
    <div className="main">
      <div className="containers">
        <div className="chart-header">
          <h2 className="chart-title text-stone-50">Coin Details for {id}</h2>
          <div className="price-container">
            <div className="price-change">{/* ... */}</div>
            <div className="current-price">{/* ... */}</div>
          </div>
        </div>
        <div className="mb-4">
          <label className="mr-2">Select Interval:</label>
          <select
            className="px-2 py-1 border rounded"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          >
            <option value="1min">1 Minute</option>
            <option value="5min">5 Minutes</option>
            <option value="15min">15 Minutes</option>
            <option value="30min">30 Minutes</option>
            <option value="1hour">1 Hour</option>
            <option value="4hour">4 Hours</option>
          </select>
        </div>
        {/* Dropdown for selecting the target */}
        <div className="mb-4">
          <label className="mr-2">Select Target:</label>
          <select
            className="px-2 py-1 border rounded"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="USD">INR</option>
            <option value="USD">EUR</option>

            {/* Add other target options here */}
          </select>
        </div>
        <div className="mb-4">
          <label className="mr-2">Set Upper Limit:</label>
          <input
            type="number"
            value={upperLimit}
            onChange={(e) => setUpperLimit(parseFloat(e.target.value))}
            className="px-2 py-1 border rounded bg-slate-300 border-zinc-950 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="mr-2">Set Lower Limit:</label>
          <input
            type="number"
            value={LowerLimit}
            onChange={(e) => setLowerLimit(parseFloat(e.target.value))}
            className="px-2 py-1 border rounded bg-slate-300 border-zinc-950"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleFetchData}
        >
          Fetch Data
        </button>
        <div className="mb-4">
          <label className="mr-2">Subscribe to daily price updates:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-1 bg-slate-300 border rounded"
            placeholder="Enter your email"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
        {showSubscriptionPopup && (
          <div className="subscription-popup show">
            You have successfully subscribed!
          </div>
        )}

        {/* ... */}
        {coinData.length > 0 && (
          <div>
            <RechartsExample coinData={coinData} coinname={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinDetails;
