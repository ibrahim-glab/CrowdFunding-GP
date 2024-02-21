import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from "react";

const Dialog = forwardRef((props, ref) => {
  const dialogRef = useRef(null);
  const [loading, setLoading] = useState(true); // Start with loading state

  // Expose function to trigger the dialog
  useImperativeHandle(ref, () => ({
    openDialog() {
      setLoading(true); // When opening dialog, set loading state to true
      dialogRef.current.showModal();
      setTimeout(() => {
        setLoading(false); // After 5 seconds, set loading state to false
      }, 5000);
    },
  }));

  useEffect(() => {
    if (!loading) {
      // If loading is false, set a timeout to switch back to loading state after 5 seconds
      const timer = setTimeout(() => {
        setLoading(true);
      }, 5000);

      return () => clearTimeout(timer); // Clear the timeout on component unmount
    }
  }, [loading]); // Run the effect whenever the loading state changes

  return (
    <>
      {loading ? ( // Show loading dialog if loading state is true
        <dialog ref={dialogRef} className="active result-modal p-8">
          <div className="h-[150px] flex items-center justify-center flex-col">
            <h3 className="mb-2 flash">Your Form is submitting...</h3>
            <div className="w-[150px] h-[20px] bg-[#fff] p-[0px] shadow-anim1 rounded-[5px]">
              <div className="loading bg-[#4acd8d] rounded-[5px] h-[20px] p-[5px] w-0"></div>
            </div>
          </div>
        </dialog>
      ) : ( // Show success dialog if loading state is false
        <dialog
          ref={dialogRef}
          className="dialogBg w-1/4 bg-[#1c1c23] m-auto h-1/4 p-5 rounded-[20px]"
        >
          <div className="flex flex-col items-center justify-center h-200">
            <i className="text-[#FF785A] fa-check fa fa-check text-4xl mb-8"></i>
            <h2 className="text-slate-50 mb-2">Your Message Has Been Sent!</h2>
            <button onClick={()=>dialogRef.current.close()}className="bg-[#ff785a] border-none p-3 text-gray-800 rounded-[5px] self-center m-1 mr-0 outline-none cursor-pointer transition-all duration-300 ease-in-out text-xs font-bold uppercase">
              Back
            </button>
          </div>
        </dialog>
      )}
    </>
  );
});

export default Dialog;
