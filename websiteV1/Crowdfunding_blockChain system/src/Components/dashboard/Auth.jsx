import React from 'react';
import { useRef, useImperativeHandle, forwardRef } from 'react';   //importing useRef and useImperativeHandle

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
        <dialog ref={dialog} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {isLoggedIn ? (
                <div>
                    {/* Display user details */}
                    <p className="text-gray-700 text-base">Welcome, User!</p>
                    {/* Logout button */}
                    <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Logout
                    </button>
                </div>
            ) : (
                <div>
                    {/* Login with Google account */}
                    <p className="text-gray-700 text-base">Login with Google account</p>
                    <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Login
                    </button>
                </div>
            )}
        </dialog>
    );
});

export default Auth;
