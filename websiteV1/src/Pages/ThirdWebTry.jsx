import { ConnectWallet, useContract, useContractRead } from '@thirdweb-dev/react';
import React from 'react';

const ThirdWebTry = () => {
  const {contract} = useContract("0xF22a0FFA58e317a803779079BCcdCc62f1f4897D");
  const {data:numValue,isLoading} = useContractRead(contract,'retrieve');
  const handleConnect = () => {
    // Logic to connect the wallet
  };

  return (
   <div>
    <ConnectWallet/>
    <h1>Value:{isLoading ? 'loading...':numValue.toNumber()}</h1>
   </div>
  );
};

export default ThirdWebTry ;
