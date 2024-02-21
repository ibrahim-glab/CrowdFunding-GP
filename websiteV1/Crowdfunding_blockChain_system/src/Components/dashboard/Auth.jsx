import React from 'react';
import { useRef, useImperativeHandle, forwardRef } from 'react';   //importing useRef and useImperativeHandle
import { ConnectButton } from 'web3uikit';

const Auth = forwardRef((props, ref) => {
    const dialog = useRef();
    useImperativeHandle(ref, () => ({
        open: () => {
            dialog.current.showModal();
        },
    }));

    const isLoggedIn = false; // Replace with your login logic

    const handleLogin = () => {
        // Handle login with Google account
    };

    const handleLogout = () => {
        // Handle logout
    };

    return (
        <dialog ref={dialog} className="bg-dark shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-black">      
                        <ConnectButton moralisAuth = {false} />  
        </dialog>
    );
});

export default Auth;
