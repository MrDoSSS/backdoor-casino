const Casino = artifacts.require('Casino')
const Payment = artifacts.require('Payment')
const Withdraw = artifacts.require('Withdraw')

module.exports = function (deployer) {
  deployer.deploy(Casino, '')
  deployer.deploy(Payment)
  deployer.deploy(Withdraw)
}
