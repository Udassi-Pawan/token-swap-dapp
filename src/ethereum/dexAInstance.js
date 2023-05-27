import web3 from "./web3"
import DEX1 from "../DEX1.json"

const instance  = new web3.eth.Contract(DEX1,
"0xdc9D1c6eCd88E926FF0558654b8ac227bf6F8F64")


export default instance;
