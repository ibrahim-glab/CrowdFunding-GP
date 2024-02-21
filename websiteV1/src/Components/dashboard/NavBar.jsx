import React from "react";
import { useRef, useState } from "react";
import { search, thirdweb } from "../../assets";
import Auth from "./Auth";
import { ConnectWallet, useConnectionStatus } from "@thirdweb-dev/react";

const NavBar = () => {
  const isConnected = useConnectionStatus();
  const inputRef = useRef(null);
  const [connect, setConnect] = useState(false);

  const connectHandler = () => {
    setConnect(true);
  };

  const disconnectHandler = () => {
    setConnect(false);
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <Auth ref={inputRef} />
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer relative">
        <img
          style={{
            opacity: connect ? 0 : 1,
          }}
          src={thirdweb}
          alt="user"
          className="w-[60%] h-[60%] object-contain absolute"
        />
        <ConnectWallet
          onConnect={connectHandler}
          style={{
            opacity: connect ? 1 : 0,
          }}
        />
        {connect && ( // Display disconnect button only if connected
          <div
            className="absolute top-0 left-0 w-full h-full cursor-pointer"
            onClick={disconnectHandler}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
