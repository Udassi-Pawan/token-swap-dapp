import web3 from "./web3"
import Token from "../Token.json"

const instance  = new web3.eth.Contract(Token,
"0xA10cCdD4D977C1efe47424682167C39De9C3696C")

export default instance;
