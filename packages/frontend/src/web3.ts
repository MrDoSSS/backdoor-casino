import Web3 from 'web3/dist/web3.min'
import { ethereum } from '@/ethereum'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import { abi as collectionAbi } from '../../truffle/build/contracts/Casino.json'
import { abi as paymentAbi } from '../../truffle/build/contracts/Payment.json'
import { abi as withdrawAbi } from '../../truffle/build/contracts/Withdraw.json'

export let web3: Web3,
  collectionContract: Contract,
  paymentContract: Contract,
  withdrawContract: Contract

export const initWeb3 = (address: string) => {
  web3 = new Web3(ethereum!)

  collectionContract = new web3.eth.Contract(
    collectionAbi as unknown as AbiItem,
    import.meta.env.VITE_COLLECTION_ADDRESS,
    {
      from: address,
    }
  )

  paymentContract = new web3.eth.Contract(
    paymentAbi as unknown as AbiItem,
    import.meta.env.VITE_PAYMENT_ADDRESS,
    {
      from: address,
    }
  )

  withdrawContract = new web3.eth.Contract(
    withdrawAbi as unknown as AbiItem,
    import.meta.env.VITE_WITHDRAW_ADDRESS,
    {
      from: address,
    }
  )
}
