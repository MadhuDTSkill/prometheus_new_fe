import React from 'react';
import { GrContactInfo } from "react-icons/gr";

const UserInfo = () => {
    const userName = "MadhuSuniL"; // Replace with dynamic data if available
    const userEmail = "madhu@sunil.com"; // Replace with dynamic data if available

    return (
        <div className='border-t border-b border-main border-opacity-25 p-3'>
            <h2 className="font-semibold mb-2 text-center text-main">User Information</h2>
            <div className="flex items-center">
                {/* Profile Icon */}
                <div className="flex-1">
                    {/* User Name */}
                    <div className="font-semibold text-main">{userName}</div>

                    {/* User Email */}
                    <div className="text-sm">{userEmail}</div>

                    {/* Account Actions */}
                    {/* <div className="flex space-x-4 mt-2">
                        <span className="text-main cursor-pointer hover:underline">Edit Profile</span>
                        <span className="text-main cursor-pointer hover:underline">Logout</span>
                    </div> */}
                </div>
                <div className="w-10 h-10 flex justify-center items-center font-semibold  border-main rounded-full border-2 p-2">
                    {userName.slice(0, 1).toUpperCase()}
                </div>
                {/* User Information */}
            </div>
        </div>
    );
};

export default UserInfo;
