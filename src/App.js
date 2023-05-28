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

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    let accounts;

    const funct = async () => {
      try {
        accounts =
          web3.eth.defaultAccount || (await web3.eth.requestAccounts());
      } catch (e) {
        console.log(e);
      }
      const iska = await tokenA.methods
        .balanceOf("0xdc9D1c6eCd88E926FF0558654b8ac227bf6F8F64")
        .call();
      setData(accounts);
    };
    funct();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="tokenB" element={<TokenB />} />
        <Route path="tokenA" element={<TokenA />} />
        <Route path="swap" element={<Swap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
