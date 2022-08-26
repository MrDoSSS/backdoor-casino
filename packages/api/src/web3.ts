import { Application } from './declarations'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { abi as collectionAbi } from '../../truffle/build/contracts/BackDoorCasino.json'
import { abi as paymentAbi } from '../../truffle/build/contracts/BDCPayment.json'

export default function (app: Application): void {
  const {
    network,
    infuraProjectId,
    collectionContractAddress,
    paymentContractAddress,
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
    address: ownerAddress,
    privateKey: ownerPk,
  })

  const collectionContract = new web3.eth.Contract(
    collectionAbi as unknown as AbiItem,
    collectionContractAddress,
    {
      from: ownerAddress,
    }
  )

  const paymentContract = new web3.eth.Contract(
    paymentAbi as unknown as AbiItem,
    paymentContractAddress,
    {
      from: ownerAddress,
    }
  )

  app.set('web3Client', web3)
  app.set('web3Account', account)
  app.set('web3CollectionContract', collectionContract)
  app.set('web3PaymentContract', paymentContract)
}
