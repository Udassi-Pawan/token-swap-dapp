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

  useEffect(() => {
    const func = async () => {
      setAccounts(await web3.eth.requestAccounts());
    };
    func();
  }, [accounts]);

  const udAccessHandler = async () => {
    const acc2 = "0xe24fB10c138B1eB28D146dFD2Bb406FAE55176b4";
    console.log(udAmount.current.value);
    console.log(accounts[0]);
    // const res = await tokenAInstance.methods
    //   .approve(
    //     "0x26eec1254c08eb64C9dbA38EA4355dAf29D1B936",
    //     udAmount.current.value
    //   )
    //   .send({ from: accounts[0] });
    const res2 = await swapInstance.methods
      .exchange(
        udAmount.current.value,
        udAmount.current.value,
        accounts[0],
        acc2
      )
      .send({ from: accounts[0] });

    // if (!res) {
    //   alert("Press Confirm swap now to complete transaction.");
    // }
  };

  return (
    <div className="swap-parent">
      <div className="swap-modal left">
        <h1>Swap uDtoken for uStoken</h1>
        <input ref={udAmount} placeholder="How many uDtokens to swap?"></input>
        <button onClick={udAccessHandler}>Approve Access</button>
      </div>

      <div className="line"></div>

      <div className="swap-modal right">
        <h1>Swap uStoken for uDtoken</h1>
        <input ref={usAmount} placeholder="How many uStokens to swap?"></input>

        <button>Approve Access</button>
      </div>
    </div>
  );
};

export default Swap;
