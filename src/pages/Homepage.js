import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tokenAInstance from "../ethereum/tokenAInstance";
import tokenBInstance from "../ethereum/tokenBInstance";
import web3 from "../ethereum/web3";
import "./Homepage.css";

const Homepage = () => {
  const [balanceA, setBalanceA] = useState("0");
  const [balanceB, setBalanceB] = useState("0");
  const [accounts, setAccounts] = useState();

  useEffect(() => {
    const func = async () => {
      setAccounts(await web3.eth.requestAccounts());
      if (accounts)
        setBalanceA(await tokenAInstance.methods.balanceOf(accounts[0]).call());
      if (accounts)
        setBalanceB(await tokenBInstance.methods.balanceOf(accounts[0]).call());
    };
    func();
  }, [accounts]);

  return (
    <div className="homepage-parent">
      <div className="left">
        <h2> token Exchange </h2>
        <h1>Get your Tokens now!</h1>
      </div>
      <div className="right">
        <div className="tokens">
          <div className="tokenA token">
            <Link style={{ textDecoration: "none" }} to="/tokenA">
              <div className="token-modal">
                <h1>uDtoken</h1>
                <div className="balance">
                  <h3>Your Balance:</h3>
                  <h2>{balanceA}</h2>
                </div>
              </div>
            </Link>
          </div>
          <div className="tokenB token">
            <Link style={{ textDecoration: "none" }} to="/tokenB">
              <div className="token-modal">
                <h1>uStoken</h1>
                <div className="balance">
                  <h3>Your Balance:</h3>
                  <h2>{balanceB}</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="swap">
          <Link style={{ textDecoration: "none" }} to="/swap">
            <h1>Swap Tokens</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
