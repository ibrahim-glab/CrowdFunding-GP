import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const Dialog = forwardRef((props, ref) => {
    const dialogRef = useRef();

    // Expose function to trigger the dialog
    useImperativeHandle(ref, () => ({
        openDialog() {
            dialogRef.current.showModal();
        }
    }));

    return (
        <dialog ref={dialogRef} className="flex flex-col justify-around items-center relative p-[20px]">
            <div className="h-[150px] flex items-center justify-center flex-col">
                <h3>Your message is sending...</h3>
                <div className="w-[150px] h-[20px] bg-[#fff] p-[5px] shadow-anim1 rounded-[5px]">
                    <div className="bg-[#4acd8d] rounded-[5px] h-[20px] w-0"></div>
                </div>
            </div>
        </dialog>
    );
});