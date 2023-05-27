import web3 from "./web3"
import DEX2 from "../DEX2.json"

const instance  = new web3.eth.Contract(DEX2,
"0xcb1Cc509e4A9E1ecfbDEEd8a83a07D2d64088d04")

export default instance;
