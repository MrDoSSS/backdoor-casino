import Web3 from 'web3/dist/web3.min'
import { ethereum } from '@/ethereum'

export let web3: Web3

export const initWeb3 = () => {
  web3 = new Web3(ethereum!)
}
