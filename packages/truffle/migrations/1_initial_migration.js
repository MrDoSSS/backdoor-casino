const BackDoorCasino = artifacts.require('BackDoorCasino')
const BDCPayment = artifacts.require('BDCPayment')

module.exports = function (deployer) {
  deployer.deploy(BackDoorCasino, '')
  deployer.deploy(BDCPayment)
}
