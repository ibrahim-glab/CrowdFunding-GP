import React, { useState, useEffect } from "react";
import { logo, sun, fundMe } from "../../assets";
import { navlinks } from "../../constants";
import { useNavigate } from "react-router-dom";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-20 h-[3rem] rounded-[10px] ${
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

const SideBar = ({ activePage, updateActivePage }) => {
  const [isActive, setIsActive] = useState(
    performance.navigation.type === performance.navigation.TYPE_RELOAD
      ? localStorage.getItem("activeNavItem")
      : "dashboard"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Check if the event is triggered by page refresh
      if (!event.currentTarget.performance.navigationType) {
        localStorage.setItem("activeNavItem", isActive);
      } else {
        // Reset localStorage value when user closes the website
        localStorage.setItem("activeNavItem", "dashboard");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, [isActive]);

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <div className=" flex items-center mx-auto w-16 h-16 bg-[#2c2f32] rounded-lg">
        <p className="m-auto">
          <pre className="text-customGreen">𝕱𝖚𝖓𝖉</pre>{" "}
          <pre className="text-customPurple">𝕸𝖊</pre>
        </p>
      </div>
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
                  navigate(link.link);
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
