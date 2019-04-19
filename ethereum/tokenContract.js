var web3 = require('./index');
var tokenABI = require("./abi/erc20.json");

const {
    TOKEN_ADDRESS: tokenAddress,
} = process.env;

module.exports = new web3.eth.Contract(tokenABI, tokenAddress);