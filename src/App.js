import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import token from "./ethereum/token"
import web3 from './ethereum/web3';

function App() {

 const [data,setData] = useState("");
  
 useEffect(()=>{
  const funct = async ()=>{
    const accounts = await web3.eth.requestAccounts();
    const iska = await token.methods.balanceOf("0xdc9D1c6eCd88E926FF0558654b8ac227bf6F8F64").call();
    setData(accounts)
  }
  funct();
}) 

  return (
    <div className="App">
    <div>
  {data}
    </div>
    </div>
  );
}

export default App;
