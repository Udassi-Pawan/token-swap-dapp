import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import tokenA from "./ethereum/tokenAInstance";
import web3 from "./ethereum/web3";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TokenA from "./pages/TokenA";
import TokenB from "./pages/TokenB";
import Homepage from "./pages/Homepage";
import Swap from "./pages/Swap";
import LoadingSpinner from "./LoadingSpinner";
import { MyContext } from "./MyContext";
import Desclaimer from "./pages/Desclaimer";

function App() {
  const [data, setData] = useState("");
  const [acc, setAcc] = useState();

  return (
    <MyContext.Provider value={{ acc, setAcc }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Desclaimer />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="tokenB" element={<TokenB />} />
          <Route path="tokenA" element={<TokenA />} />
          <Route path="swap" element={<Swap />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
