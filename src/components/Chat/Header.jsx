import React, { useContext } from 'react';
import { IoMdClose } from "react-icons/io";
import ChatWindowsContext from '../../Contexts/ChatWindowsContext';

const Header = () => {

    const { chatWindows, activeWindow, setActiveWindowFromId, removeChatWindow } = useContext(ChatWindowsContext);



    return (
        <div className='flex overflow-x-auto overflow-y-hidden border-b border-main border-opacity-25 whitespace-nowrap'>
            {
                chatWindows.map((chatWindow) => (
                    <div
                        key={chatWindow.id}
                        onClick={() => setActiveWindowFromId(chatWindow.id)}
                        className={`flex-shrink-0 transition-all duration-300 ${activeWindow === chatWindow.id ? 'w-auto bg-main' : 'truncate'
                            }`}
                    >
                        <div
                            className={`flex group items-center gap-2 p-2 border-r border-main cursor-pointer ${activeWindow === chatWindow.id ? 'bg-normal/80' : 'bg-normal'
                                }`}
                        >
                            <span className={`font-semibold ${activeWindow !== chatWindow.id ? 'truncate' : ''}`}>
                                {chatWindow.name}
                            </span>
                            <IoMdClose onClick={() => removeChatWindow(chatWindow.id)} className={`text-xl cp hover:scale-110 ${activeWindow !== chatWindow.id ? 'h-0 group-hover:h-auto' : ''}`} />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Header;
