import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";

const Toast = ({ message, onClose, duration = 5000 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show the toast
        setVisible(true);

        // Hide the toast after `duration` time
        const hideTimeout = setTimeout(() => {
            setVisible(false);
        }, duration);

        // Call `onClose` after the slide-out animation ends
        const removeTimeout = setTimeout(() => {
            onClose && onClose();
        }, duration + 500); // Add some buffer for animation

        // Cleanup timeouts on component unmount
        return () => {
            clearTimeout(hideTimeout);
            clearTimeout(removeTimeout);
        };
    }, [duration, onClose]);

    return (
        <div
            className={`fixed z-50 font-main top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg transition-transform duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                }`}
            style={{ minWidth: "300px" }}
        >
            {
                message && (
                    <div className="cc-2 p-px pt-[0.5px] pb-1">
                        <div className="cc-2-target p-3">
                            <h1 className="my-2 font-semibold">Message : </h1>
                            <ReactTyped
                                strings={[message]}
                                typeSpeed={20}
                                showCursor={false}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Toast;
