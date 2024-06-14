import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from "react";

const Dialog = forwardRef(({ load }, ref) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (load) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [load]);

  useImperativeHandle(ref, () => ({
    openDialog() {
      dialogRef.current.showModal();
    },
    closeDialog() {
      dialogRef.current.close();
    },
  }));

  return (
    <>
      {load ? (
        <dialog ref={dialogRef} className="active result-modal p-8">
          <div className="h-[150px] flex items-center justify-center flex-col">
            <h3 className="mb-2 flash">Your Form is submitting...</h3>
            <div className="w-[150px] h-[20px] bg-[#fff] p-[0px] shadow-anim1 rounded-[5px]">
              <div className="loading bg-[#4acd8d] rounded-[5px] h-[20px] p-[5px] w-0"></div>
            </div>
          </div>
        </dialog>
      ) : (
        <dialog ref={dialogRef} className="dialogBg w-1/4 bg-[#1c1c23] m-auto h-1/4 p-5 rounded-[20px]">
          <div className="flex flex-col items-center justify-center h-200">
            <i className="text-[#FF785A] fa-check fa fa-check text-4xl mb-8"></i>
            <h2 className="text-slate-50 mb-2">Your Message Has Been Sent!</h2>
            <button
              onClick={() => dialogRef.current.close()}
              className="bg-[#ff785a] border-none p-3 text-gray-800 rounded-[5px] self-center m-1 mr-0 outline-none cursor-pointer transition-all duration-300 ease-in-out text-xs font-bold uppercase"
            >
              Back
            </button>
          </div>
        </dialog>
      )}
    </>
  );
});

export default Dialog;
