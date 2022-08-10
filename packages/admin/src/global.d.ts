import { WebsocketProvider } from 'web3'

declare global {
  interface Window {
    ethereum?: WebsocketProvider & {
      isConnected(): boolean
      on<T>(event: string, handler: (data: T) => void): void
      isMetaMask: boolean
      selectedAddress: string
    }
  }
}

export {}
