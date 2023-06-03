import { useContext, useEffect, useState } from "react";
import web3 from "../ethereum/web3";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import "./Desclaimer.css";

const Desclaimer = () => {
  const navigate = useNavigate();
  const { acc, setAcc } = useContext(MyContext);
  useEffect(() => {
    (async function () {
      try {
        setAcc(await web3.eth.requestAccounts());
        console.log("connect");
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const clickHandler = async () => {
    if (acc && acc[0]) {
      navigate("/home");
    } else {
      navigate("/home");
      alert("Some functions might not work without metamask.");
    }
  };
  return (
    <div className="desclaimer-parent">
      <h1>token Exchange</h1>
      <h3>
        Please install and connect metamask using sepolia testnet to continue
      </h3>
      <button onClick={clickHandler}>Continue</button>;
    </div>
  );
};

export default Desclaimer;
