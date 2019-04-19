var Web3 = require("web3");
var debug = require('debug')('app:web3');

const {
  NODE_URL: nodeUrl
} = process.env;

// connect WebChain node
var web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));
// web3 = new Web3(new Web3.providers.WebsocketProvider(ethNode));

// web3.eth.getCoinbase()
//   .then(coinbase => debug(`connected to ${nodeUrl} coinbase: ${coinbase}`))
//   .catch(ex => {
//     debug('cannot connect to WebChain Node: ',nodeUrl);
//     debug('error: ', ex);
//   });

module.exports = web3;