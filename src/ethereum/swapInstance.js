import web3 from "./web3"
import tokenExchange from "../tokenExchange.json"

const instance  = new web3.eth.Contract(tokenExchange,
"0x26eec1254c08eb64C9dbA38EA4355dAf29D1B936")

export default instance;
