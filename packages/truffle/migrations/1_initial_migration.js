const Casino = artifacts.require('Casino')
const Payment = artifacts.require('Payment')

module.exports = function (deployer) {
  deployer.deploy(Casino, '')
  deployer.deploy(Payment)
}
