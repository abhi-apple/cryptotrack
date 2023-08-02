// import React from 'react';
// import './App.css';
// import './index.css';
// import Header from './components/Header';
// import Features from './components/Features';
// import About from './components/About';
// import Presentation from './components/Presentation';
// import Contract from './components/Contract';
// import Quotes from './components/Quotes';
// import Web from './components/Web';
// function App() {
//   return (
//     <div className="App">
//       <Header/>
//       <Presentation/>
//       <About  title="Buy The Crypto " button="Buy Now"/>
//       <Web/>
//       <Features/>
//       <Quotes/>
//       <Contract/>
//     </div>
//   );
// }

// export default App;
// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./Home";
import CoinDetails from "./components/CoinDetails"; // Import your CoinDetails component
import RechartsExample from "./RechartsExample";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home component */}
          <Route path="/chart" element={<RechartsExample />} /> {/* Home component */}
          <Route path="/coindetails/:id" element={<CoinDetails />} /> {/* CoinDetails component */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
