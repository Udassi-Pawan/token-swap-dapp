import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tokenAInstance from "../ethereum/tokenAInstance"
import tokenBInstance from "../ethereum/tokenBInstance"
import web3 from "../ethereum/web3";

const Homepage = ()=>{
    const [balanceA,setBalanceA] = useState("0");
    const [balanceB,setBalanceB] = useState("0");
    const [accounts,setAccounts] = useState();
useEffect(()=>{
const func = async () =>{
       setAccounts (await web3.eth.requestAccounts()); 
      if(accounts) setBalanceA (await tokenAInstance.methods.balanceOf(accounts[0]).call());
      if(accounts) setBalanceB( await tokenBInstance.methods.balanceOf(accounts[0]).call());
    
}
func();
},[accounts])

    return <div>
        <Link to="tokenA" >
        <button>
            tokenA
        </button>
            <h1>
            {balanceA}
            </h1>
            </Link>
        <Link to="tokenB" >
    <button>
        tokenB
    </button>
    <h1>
        {balanceB}
    </h1>
        </Link>
    </div>
}

export default Homepage;