import { useEffect, useRef, useState } from "react";
import "./Swap.css";
import web3 from "../ethereum/web3";
import tokenAInstance from "../ethereum/tokenAInstance";
import tokenBInstance from "../ethereum/tokenBInstance";
import swapInstance from "../ethereum/swapInstance";

const Swap = () => {
  const udAmount = useRef();
  const usAmount = useRef();
  const [accounts, setAccounts] = useState();
  const acc2 = "0xe24fB10c138B1eB28D146dFD2Bb406FAE55176b4";
  const swapContractAddress = "0x26eec1254c08eb64C9dbA38EA4355dAf29D1B936";

  useEffect(() => {
    const func = async () => {
      setAccounts(
        web3.eth.defaultAccount || (await web3.eth.requestAccounts())
      );
    };
    func();
  }, [accounts]);

  const udAccessHandler = async () => {
    if (!udAmount.current.value) return alert("Please fill in empty fields.");
    try {
      await tokenAInstance.methods
        .approve(swapContractAddress, udAmount.current.value)
        .send({ from: accounts[0] });
    } catch (e) {
      alert("Transaction failed!");
    }
    alert("Press click Confirm swap now to complete transaction.");
  };

  const usAccessHandler = async () => {
    if (!usAmount.current.value) return alert("Please fill in empty fields.");
    try {
      await tokenBInstance.methods
        .approve(swapContractAddress, usAmount.current.value)
        .send({ from: accounts[0] });
    } catch (e) {
      alert("Transaction failed!");
    }
    alert("Press click Confirm swap now to complete transaction.");
  };

  const udConfirmHandler = async () => {
    if (!udAmount.current.value) return alert("Please fill in empty fields.");

    const approval = await tokenAInstance.methods
      .allowance(accounts[0], swapContractAddress)
      .call();
    if (approval < udAmount.current.value) {
      return alert("Please approve first before swap!");
    }
    try {
      const res2 = await swapInstance.methods
        .exchange(
          udAmount.current.value,
          udAmount.current.value,
          accounts[0],
          acc2
        )
        .send({ from: accounts[0] });
    } catch (e) {
      alert("Transaction failed!");
    }
  };

  const usConfirmHandler = async () => {
    if (!usAmount.current.value) return alert("Please fill in empty fields.");

    const approval = await tokenBInstance.methods
      .allowance(accounts[0], swapContractAddress)
      .call();
    if (approval < usAmount.current.value) {
      return alert("Please approve first before swap!");
    }
    try {
      const res2 = await swapInstance.methods
        .exchange(
          usAmount.current.value,
          usAmount.current.value,
          acc2,
          accounts[0]
        )
        .send({ from: accounts[0] });
    } catch (e) {
      alert("Transaction failed!");
    }
  };

  return (
    <div className="swap-parent">
      <div className="swap-modal left">
        <h1>Swap uDtoken for uStoken</h1>
        <input ref={udAmount} placeholder="How many uDtokens to swap?"></input>
        <button onClick={udAccessHandler}>Approve Access</button>
        <button onClick={udConfirmHandler}>Confirm Swap</button>
      </div>

      <div className="line"></div>

      <div className="swap-modal right">
        <h1>Swap uStoken for uDtoken</h1>
        <input ref={usAmount} placeholder="How many uStokens to swap?"></input>

        <button onClick={usAccessHandler}>Approve Access</button>
        <button onClick={usConfirmHandler}>Confirm Swap</button>
      </div>
    </div>
  );
};

export default Swap;
