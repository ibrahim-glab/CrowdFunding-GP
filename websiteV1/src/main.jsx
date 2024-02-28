import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId="b1a5dc98f41e4ccd71b1f68cccded809"
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
