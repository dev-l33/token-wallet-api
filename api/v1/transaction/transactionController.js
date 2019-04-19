const web3 = require("../../../ethereum");
const tokenContract = require("../../../ethereum/tokenContract");
const Tx = require('ethereumjs-tx');
const debug = require('debug')('app:controller:transaction');

exports.transfer = async (ctx) => {
  let fromAddress = ctx.request.body.fromAddress;
  let privateKey = Buffer.from(ctx.request.body.privateKey, 'hex');
  let toAddress = ctx.request.body.toAddress;
  let hexValue = web3.utils.toHex(web3.utils.toWei(String(ctx.request.body.value), 'ether'));

  // get transaction count, later will used as nonce
  let txCount = await web3.eth.getTransactionCount(fromAddress);
  let gasPrice = await web3.eth.getGasPrice();
  debug(`Tx Count of ${fromAddress} : ${txCount}  Network Gas Price: ${gasPrice}`);

  //creating raw tranaction
  let rawTransaction = {
    "from": fromAddress,
    "gasPrice": web3.utils.toHex(gasPrice),
    "gasLimit": web3.utils.toHex(80000),
    "to": toAddress,
    "value": hexValue,
    "nonce": web3.utils.toHex(txCount)
  }

  //creating tranaction via ethereumjs-tx
  var transaction = new Tx(rawTransaction);
  //signing transaction with private key
  transaction.sign(privateKey);

  try {

    let txHash = await new Promise((resolve, reject) => {
      //sending transacton via web3js module
      web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
        .on('transactionHash', resolve)
        .on('receipt', receipt => {
          // console.log("receipt: ", receipt);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log("confirmation", receipt);
        })
        .on('error', error => {
          reject(error);
        }); // If a out of gas error, the second parameter is the receipt.
    });

    debug('TransactionHash: ', txHash);

    ctx.body = {
      success: true,
      fromAddress: fromAddress,
      toAddress: toAddress,
      value: ctx.request.body.value,
      transactionHash: txHash,
    };

  } catch (ex) {
    ctx.throw(500, {
      success: false,
      msg: ex.toString()
    });
  }
}

exports.transferToken = async (ctx) => {

  debug(ctx.request.body);

  let fromAddress = ctx.request.body.fromAddress;
  let privateKey = Buffer.from(ctx.request.body.privateKey, 'hex');
  let toAddress = ctx.request.body.toAddress;
  let hexValue = web3.utils.toHex(web3.utils.toWei(String(ctx.request.body.value), 'ether'));

  // get transaction count, later will used as nonce
  let txCount = await web3.eth.getTransactionCount(fromAddress);
  let gasPrice = await web3.eth.getGasPrice();
  debug(`Tx Count of ${fromAddress} : ${txCount}  Network Gas Price: ${gasPrice}`);

  //creating raw tranaction
  let rawTransaction = {
    "from": fromAddress,
    "gasPrice": web3.utils.toHex(gasPrice),
    "gasLimit": web3.utils.toHex(80000),
    "to": tokenContract.address,
    "value": "0x0",
    "data": tokenContract.methods.transfer(toAddress, hexValue).encodeABI(),
    "nonce": web3.utils.toHex(txCount)
  }

  //creating tranaction via ethereumjs-tx
  var transaction = new Tx(rawTransaction);
  //signing transaction with private key
  transaction.sign(privateKey);

  try {

    let txHash = await new Promise((resolve, reject) => {
      //sending transacton via web3js module
      web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
        .on('transactionHash', resolve)
        .on('receipt', receipt => {
          // console.log("receipt: ", receipt);
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log("confirmation", receipt);
        })
        .on('error', error => {
          reject(error);
        }); // If a out of gas error, the second parameter is the receipt.
    });

    debug('TransactionHash: ', txHash);

    ctx.body = {
      success: true,
      fromAddress: fromAddress,
      toAddress: toAddress,
      value: ctx.request.body.value,
      transactionHash: txHash,
    };

  } catch (ex) {
    ctx.throw(500, {
      success: false,
      msg: ex.toString()
    });
  }
};