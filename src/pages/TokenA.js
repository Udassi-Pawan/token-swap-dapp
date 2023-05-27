import { useState, useEffect, useRef } from "react";
import web3 from "../ethereum/web3";
import tokenAInstance from "../ethereum/tokenAInstance"
import dexAInstance from "../ethereum/dexAInstance"

const TokenA = ()=>{
    const [balanceA,setBalanceA] = useState("0");
    const [accounts,setAccounts] = useState();
    const buyValue = useRef();
    const approveSpendor = useRef();
    const approveValue = useRef();
    const transferTo = useRef();
    const transferFromFrom = useRef();
    const transferFromTo = useRef();
    const transferFromValue = useRef();
    const allowanceOwner = useRef();
    const allowanceSpendor = useRef();


useEffect(()=>{
const func = async () =>{
       setAccounts (await web3.eth.requestAccounts());       
     if(accounts)  setBalanceA (await tokenAInstance.methods.balanceOf(accounts[0]).call());
}
func();
},[accounts])

const buyHandler = async () =>{
    const exchangeRate = Number(await tokenAInstance.methods.exchangeRate().call());
    const payment = String(Number(buyValue.current.value)/exchangeRate);
    try{
  await dexAInstance.methods.buy().send({from:accounts[0],value:payment})
}
catch(e){
    console.log(e);
}
}

const approveHandler = async () => {

}

const transferHandler = async () => {

}

const transferFromHandler = async () => {
    
}


   return <div>
        <h1> Balance: {balanceA}</h1>
       <div>        
        <input ref={buyValue} placeholder="how many tokens?">
        </input>
        <button onClick={buyHandler}>
            buy
        </button>
       </div>

       <div>
        <input placeholder="how many tokens?"></input>
            <button>sell</button>
        </div>

        <div>
            <input placeholder="spendor"></input>
            <input placeholder="value"></input>
            <button onClick={approveHandler}>approve</button>
        </div>
        <div>
        <input placeholder="to"></input>
            <input placeholder="value"></input>
            <button onClick={transferHandler}>transfer</button>
        </div>

        <div>
        <input placeholder="from"></input>
        <input placeholder="to"></input>
            <input placeholder="value"></input>
            <button onClick={transferFromHandler}>transfer from</button>
        </div>

        <div>
        <input placeholder="owner"></input>
            <input placeholder="spendor"></input>
            <button onClick={allowanceHandler}>check allowance</button>
        </div>

    </div>
}

export default TokenA;