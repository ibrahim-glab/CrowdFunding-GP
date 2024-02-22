import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from '@thirdweb-dev/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <ThirdwebProvider activeChain={Sepolia} clientId="930432fd22031de24c7b002dc4abcd6e">
      <App />
    </ThirdwebProvider>

  </React.StrictMode>,
)
