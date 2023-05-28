import { useState, useEffect, useRef } from "react";
import web3 from "../ethereum/web3";
import tokenAInstance from "../ethereum/tokenAInstance";
import dexAInstance from "../ethereum/dexAInstance";
import { toBePartiallyChecked } from "@testing-library/jest-dom/matchers";
import "./Token.css";

const TokenA = ({ konsa }) => {
  const dex1Address = "0xdc9D1c6eCd88E926FF0558654b8ac227bf6F8F64";
  const [balanceA, setBalanceA] = useState("0");
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
  const sellValue = useRef();

  useEffect(() => {
    const func = async () => {
      setAccounts(await web3.eth.requestAccounts());
      if (accounts)
        setBalanceA(await tokenAInstance.methods.balanceOf(accounts[0]).call());
    };
    func();
  }, [accounts]);

  const buyHandler = async () => {
    const exchangeRate = Number(
      await tokenAInstance.methods.exchangeRate().call()
    );
    const payment = buyValue.current.value;
    if (!buyValue.current.value)
      return alert("Please enter the amount to buy.");
    try {
      await dexAInstance.methods
        .buy()
        .send({ from: accounts[0], value: payment });
    } catch (e) {
      return alert("Transaction failed!");
    }
  };

  const accessHandler = async () => {
    const value = sellValue.current.value;
    if (!value) return alert("Please enter the amount to buy.");
    let res;
    try {
      res = await tokenAInstance.methods
        .approve(dex1Address, value)
        .send({ from: accounts[0] });
    } catch (e) {
      return alert("Transaction failed!");
    }

    if (res) alert("Click Sell now to complete transaction.");
  };
  const sellHandler = async () => {
    const value = sellValue.current.value;
    if (!value) return alert("Please enter the amount to buy.");
    const approval = await tokenAInstance.methods
      .allowance(accounts[0], dex1Address)
      .call();
    if (!approval || approval < value)
      return alert("Please approve token access first before selling!");
    try {
      await dexAInstance.methods.sell(value).send({ from: accounts[0] });
    } catch (e) {
      return alert("Transaction failed!");
    }
  };

  const approveHandler = async () => {
    const spendor = approveSpendor.current.value;
    const value = approveValue.current.value;
    if (!value || !spendor) return alert("Please fill the empty fields.");
    try {
      await tokenAInstance.methods
        .approve(spendor, value)
        .send({ from: accounts[0] });
    } catch (e) {
      return alert("Transaction failed!");
    }
  };

  const transferHandler = async () => {
    const to = transferTo.current.value;
    const value = transferValue.current.value;
    if (!value || !to) return alert("Please fill the empty fields.");

    try {
      await tokenAInstance.methods
        .transfer(to, value)
        .send({ from: accounts[0] });
    } catch (e) {
      return alert("Transaction failed!");
    }
  };

  const transferFromHandler = async () => {
    const from = transferFromFrom.current.value;
    const to = transferFromTo.current.value;
    const value = transferFromValue.current.value;
    if (!value || !to || !from) return alert("Please fill the empty fields.");

    try {
      await tokenAInstance.methods
        .transferFrom(from, to, value)
        .send({ from: accounts[0] });
    } catch (e) {
      return alert("Transaction failed!");
    }
  };

  const allowanceHandler = async () => {
    const owner = allowanceOwner.current.value;
    const spendor = allowanceSpendor.current.value;
    if (!owner || !spendor) return alert("Please fill the empty fields.");

    try {
      const res = await tokenAInstance.methods.allowance(owner, spendor).call();
      alert("Allowance is " + res || "0");
    } catch (e) {
      alert("Transaction failed!");
    }
  };

  return (
    <div className="token-parent">
      <h1>uDtoken</h1>
      <h2> Balance: {balanceA}</h2>
      <div className="inputs">
        <div>
          <input ref={buyValue} placeholder="Tokens in multiples of 10"></input>
          <button onClick={buyHandler}>Buy</button>
        </div>

        <div>
          <input ref={sellValue} placeholder="How many tokens?"></input>
          <button onClick={accessHandler}>Approve Access</button>
          <button onClick={sellHandler}>Sell</button>
        </div>

        <div>
          <input ref={approveSpendor} placeholder="Spendor"></input>
          <input ref={approveValue} placeholder="Value"></input>
          <button onClick={approveHandler}>Approve Transfer</button>
        </div>
        <div>
          <input ref={transferTo} placeholder="To"></input>
          <input ref={transferValue} placeholder="Value"></input>
          <button onClick={transferHandler}>Transfer</button>
        </div>

        <div>
          <input ref={transferFromFrom} placeholder="From"></input>
          <input ref={transferFromTo} placeholder="To"></input>
          <input ref={transferFromValue} placeholder="Value"></input>
          <button onClick={transferFromHandler}>Transfer from</button>
        </div>

        <div>
          <input ref={allowanceOwner} placeholder="Owner"></input>
          <input ref={allowanceSpendor} placeholder="Spendor"></input>
          <button onClick={allowanceHandler}>Check Allowance</button>
        </div>
      </div>
    </div>
  );
};

export default TokenA;
