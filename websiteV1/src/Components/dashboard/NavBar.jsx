import React, { useRef, useState } from "react";
import { search, thirdweb, logo, menu } from "../../assets";
import Auth from "./Auth";
import { ConnectWallet, useConnectionStatus } from "@thirdweb-dev/react";
import { navlinks } from "../../constants"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";

const NavBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const isConnected = useConnectionStatus();
  const inputRef = useRef(null);
  const [connect, setConnect] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");

  const connectHandler = () => {
    setConnect(true);
  };

  const disconnectHandler = () => {
    setConnect(false);
  };

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <Auth ref={inputRef} />
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          onChange={handleInputChange}
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

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-16 h-16  rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
        <p className="m-auto">
          <pre className="text-customGreen">𝕱𝖚𝖓𝖉</pre>
          <pre className="text-customPurple">𝕸𝖊</pre>
        </p>
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4">
            <button
              type="button"
              className={`font-epilogue font-semibold text-[14px] py-3 px-5 rounded-[10px] ${connect ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'} text-white`}
              onClick={connectHandler}
            >
              {connect ? 'Create a campaign' : 'Connect'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
