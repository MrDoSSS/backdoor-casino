import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import * as web3 from './web3'

web3.init()
web3.connect()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
