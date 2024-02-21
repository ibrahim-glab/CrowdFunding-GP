import { ConnectWallet } from "@thirdweb-dev/react";
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  
} from "react"; // Importing useRef and useImperativeHandle

const Auth = forwardRef((ropsprops, ref) => {
  const dialog = useRef();

  // Handle click outside dialog to close it
  const handleClickOutside = () => {
    dialog.current.close();
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    },
  }));

  const isLoggedIn = false; // Replace with your login logic

  const handleLogin = () => {
    // Handle login with Google account
  };

  return (
    <dialog
      ref={dialog}
      className="  bg-[#1c1c23] shadow-md rounded px-8 pt-6 pb-8 ml-0"
    >
      <div className="flex flex-col gap-3 ">
        {/* Login with Google account */}
        <p className="text-gray-700 text-base font-epilogue">Login with meta mask account</p>
        <ConnectWallet
         onClick={()=>handleClickOutside}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 h-4" 
        ></ConnectWallet>
        <button onClick={handleClickOutside}className="bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded mt-4">
          Close
        </button>
      </div>
    </dialog>
  );
});

export default Auth;
