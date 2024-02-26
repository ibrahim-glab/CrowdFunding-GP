import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from '@thirdweb-dev/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <ThirdwebProvider activeChain={Sepolia} clientId="a2bb068145c0ae3bf90caaa77361de77">
      <App />
    </ThirdwebProvider>

  </React.StrictMode>,
)
