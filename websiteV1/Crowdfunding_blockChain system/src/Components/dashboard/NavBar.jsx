import React from "react";
import { useRef } from "react";
import { search, thirdweb } from "../../assets";
import Auth from "./Auth";
const NavBar = () => {
  const inputRef = useRef(null);
  return (

    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <Auth ref={inputRef} />
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




      <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">

        <img
          onClick={() => { inputRef.current.open() }}
          src={thirdweb}
          alt="user"
          className="w-[60%] h-[60%] object-contain"
        />

      </div>


    </div>
  );
};
export default NavBar;