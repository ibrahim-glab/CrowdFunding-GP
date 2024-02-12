import React, { useState } from "react";
import logo from "../assets/logo.svg";
import sun from "../assets/sun.svg";
import { navlinks } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-20 h-20 rounded-[10px] ${
      isActive === name ? "bg-[#2c2f32]" : ""
    } flex justify-center items-center ${
      !disabled ? "cursor-pointer" : ""
    } ${styles}`}
    onClick={handleClick}
  >
    <img
      src={imgUrl}
      alt="fund_logo"
      className={`w-1/2 h-1/2 ${isActive !== name ? "grayscale" : ""}`}
    />
  </div>
);

const SideBar = () => {
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Icon styles="w-20 h-20 bg-2c2f32" imgUrl={logo} />
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] mt-24 py-4 ml-0">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                }
              }}
            />
          ))}
        </div>
        <Icon styles="bg-1c1c24 shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default SideBar;
