const web3 = require("../../../ethereum");
const tokenContract = require("../../../ethereum/tokenContract");


exports.getBalance = async (ctx) => {
    let balance = await web3.eth.getBalance(ctx.params.address);
    let tokenBalance = web3.utils.hexToNumberString(await tokenContract.methods.balanceOf(ctx.params.address).call());
    try {
        ctx.body = {
            web: web3.utils.fromWei(balance, 'ether'),
            token: web3.utils.fromWei(tokenBalance, 'ether')
        };
    } catch (e) {
        ctx.throw(500, {
            success: false,
            message: e.toString()
        });
    }
};