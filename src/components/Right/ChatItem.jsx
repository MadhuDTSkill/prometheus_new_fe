import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';

const ChatItem = ({ chat, active, addChatWindow }) => {

    const handleClick = () => {
        addChatWindow(chat)
    }

    return (
        <div
            onClick={handleClick}
            className={`'group flex justify-between items-center truncate py-2 px-2.5 rounded-lg cursor-pointer ${active ? 'bg-normal' : 'hover:bg-normal'}`}
        >
            <span className='truncate font-thin'>
                {chat.name}
            </span>
            <div className='cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 duration-500'>
                <MdDeleteOutline className='text-xl' />
            </div>
        </div>
    );
};

export default ChatItem;
