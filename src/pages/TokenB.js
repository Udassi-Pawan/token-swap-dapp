import { useState, useEffect, useRef } from "react";
import web3 from "../ethereum/web3";
import tokenBInstance from "../ethereum/tokenBInstance";
import dexBInstance from "../ethereum/dexBInstance";
import { toBePartiallyChecked } from "@testing-library/jest-dom/matchers";
import "./Token.css";

const TokenB = ({ konsa }) => {
  const [balanceB, setBalanceB] = useState("0");
  const [accounts, setAccounts] = useState();
  const buyValue = useRef();
  const approveSpendor = useRef();
  const approveValue = useRef();
  const transferTo = useRef();
  const transferValue = useRef();
  const transferFromFrom = useRef();
  const transferFromTo = useRef();
  const transferFromValue = useRef();
  const allowanceOwner = useRef();
  const allowanceSpendor = useRef();

  useEffect(() => {
    const func = async () => {
      setAccounts(await web3.eth.requestAccounts());
      if (accounts)
        setBalanceB(await tokenBInstance.methods.balanceOf(accounts[0]).call());
    };
    func();
  }, [accounts]);

  const buyHandler = async () => {
    const exchangeRate = Number(
      await tokenBInstance.methods.exchangeRate().call()
    );
    const payment = String(
      Math.ceil(Number(buyValue.current.value) / exchangeRate)
    );
    try {
      await dexBInstance.methods
        .buy()
        .send({ from: accounts[0], value: payment });
    } catch (e) {
      console.log(e);
    }
  };

  const approveHandler = async () => {
    const spendor = approveSpendor.current.value;
    const value = approveValue.current.value;

    try {
      await tokenBInstance.methods
        .approve(spendor, value)
        .send({ from: accounts[0] });
    } catch (e) {
      console.log(e);
    }
  };

  const transferHandler = async () => {
    const to = transferTo.current.value;
    const value = transferValue.current.value;
    console.log(to);
    console.log(value);
    try {
      await tokenBInstance.methods
        .transfer(to, value)
        .send({ from: accounts[0] });
    } catch (e) {
      console.log(e);
    }
  };

  const transferFromHandler = async () => {
    const from = transferFromFrom.current.value;
    const to = transferFromTo.current.value;
    const value = transferFromValue.current.value;
    try {
      await tokenBInstance.methods
        .transferFrom(from, to, value)
        .send({ from: accounts[0] });
    } catch (e) {
      console.log(e);
    }
  };

  const allowanceHandler = async () => {
    const owner = allowanceOwner.current.value;
    const spendor = allowanceSpendor.current.value;
    console.log(await tokenBInstance.methods.allowance(owner, spendor).call());
  };

  return (
    <div className="token-parent">
      <h1>uStoken</h1>
      <h2> Balance: {balanceB}</h2>
      <div className="inputs">
        <div>
          <input ref={buyValue} placeholder="how many tokens?"></input>
          <button onClick={buyHandler}>Buy</button>
        </div>

        <div>
          <input placeholder="how many tokens?"></input>
          <button>Sell</button>
        </div>

        <div>
          <input ref={approveSpendor} placeholder="spendor"></input>
          <input ref={approveValue} placeholder="value"></input>
          <button onClick={approveHandler}>Approve</button>
        </div>
        <div>
          <input ref={transferTo} placeholder="to"></input>
          <input ref={transferValue} placeholder="value"></input>
          <button onClick={transferHandler}>Transfer</button>
        </div>

        <div>
          <input ref={transferFromFrom} placeholder="from"></input>
          <input ref={transferFromTo} placeholder="to"></input>
          <input ref={transferFromValue} placeholder="value"></input>
          <button onClick={transferFromHandler}>Transfer from</button>
        </div>

        <div>
          <input ref={allowanceOwner} placeholder="owner"></input>
          <input ref={allowanceSpendor} placeholder="spendor"></input>
          <button onClick={allowanceHandler}>Check Allowance</button>
        </div>
      </div>
    </div>
  );
};

export default TokenB;
