import web3 from "./web3"
import Token from "../Token.json"

const instance  = new web3.eth.Contract(Token,
"0x6F480E3AfA1a917642F3eb23D01da7E7c1946E6E")


export default instance;
