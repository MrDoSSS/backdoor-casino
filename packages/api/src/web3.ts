import { Application } from './declarations'
import Web3 from 'web3'

export default function (app: Application): void {
  const {
    network,
    infuraProjectId,
    collectionContractAddress,
    paymentContractAddress,
    withdrawContractAddress,
    ownerPk,
    ownerAddress,
  } = app.get('web3Options')
  const env = app.get('env')

  const providerUrl =
    env === 'development'
      ? 'ws://localhost:8545'
      : `wss://${network}.infura.io/ws/v3/${infuraProjectId}`

  const provider = new Web3.providers.WebsocketProvider(providerUrl, {
    clientConfig: { keepalive: true, keepaliveInterval: -1 },
    reconnect: { auto: true, delay: 1000 },
  })

  const web3 = new Web3(provider)

  const account = web3.eth.accounts.wallet.add({
    address: ownerPk,
    privateKey: ownerAddress,
  })

  const collectionContract = { collectionContractAddress }
  const paymentContract = { paymentContractAddress }
  const withdrawContract = { withdrawContractAddress }

  app.set('web3Client', web3)
  app.set('web3Account', account)
  app.set('web3CollectionContract', collectionContract)
  app.set('web3PaymentContract', paymentContract)
  app.set('web3WithdrawContract', withdrawContract)
}
