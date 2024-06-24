import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from "react";

const Dialog = forwardRef(({ load, error }, ref) => {
  const dialogRef = useRef(null);
  const [loading, setLoading] = useState(load);

  // Imperative methods for opening and closing the dialog
  useImperativeHandle(ref, () => ({
    openDialog() {
      dialogRef.current.showModal();
    },
    closeDialog() {
      dialogRef.current.close();
    },
  }));

  // Effect to update loading state when 'load' prop changes
  useEffect(() => {
    setLoading(load);
  }, [load]);

  // Effect to handle error state changes
  useEffect(() => {
    if (error) {
      dialogRef.current.showModal(); // Show dialog when error occurs
    }
  }, [error]);

  return (
    <dialog
      ref={dialogRef}
      className={`result-modal p-8 ${loading ? "active" : ""}`}
    >
      <div className="h-[150px] flex items-center justify-center flex-col">
        {loading ? (
          <>
            <h3 className="mb-2 flash">Your Form is submitting...</h3>
            <div className="w-[150px] h-[20px] bg-[#fff] p-[0px] shadow-anim1 rounded-[5px]">
              <div className="loading bg-[#4acd8d] rounded-[5px] h-[20px] p-[5px] w-0"></div>
            </div>
          </>
        ) : (
          <>
            <h3 className="mb-2 text-red-500">Error: {error}</h3>
            <button onClick={() => ref.current.closeDialog()}>Close</button>
          </>
        )}
      </div>
    </dialog>
  );
});

export default Dialog;
