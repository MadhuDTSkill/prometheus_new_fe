import React, { useContext } from 'react';
import ChatItem from './ChatItem';
import { VscAdd } from 'react-icons/vsc';
import ChatWindowsContext from '../../Contexts/ChatWindowsContext';
import ChatsContext from '../../Contexts/ChatsContext';
import LoadingIcon from '../ui/LoadingIcon';

const ChatItems = () => {

    const { chats, isChatsLoading } = useContext(ChatsContext)
    const { activeWindow, addChatWindow } = useContext(ChatWindowsContext)

    const handleNewChat = () => {
        addChatWindow({
            id: '<new>',
            "name": "New Chat",
            "gpt": null,
            "attach": null,
        })
    };




    return (
        <div className='h-full flex flex-col border-b border-main border-opacity-25 p-1'>
            <div onClick={handleNewChat} className='cc-2 mb-4 p-px pb-0.5 hover:border border-main'>
                <h2 className="cc-2-target p-2 flex items-center justify-center gap-1 font-semibold mb-3 text-center text-main cp"><VscAdd size={15} /> New Chat</h2>
            </div>
            <div className='flex-1 overflow-auto'>
                {
                    isChatsLoading &&
                    <div className='flex justify-center items-center h-full'>
                        <LoadingIcon />
                    </div>
                }

                {Object.keys(chats).map((period) => (
                    <div key={period} className='mb-5'>
                        {
                            chats[period].length > 0 &&
                            <>
                                <h2 className='text-xs font-semibold mb-3'>{period}</h2>
                                <div className='flex flex-col'>
                                    {chats[period].map((chat) => (
                                        <ChatItem key={chat.id} chat={chat} active={chat.id === activeWindow} addChatWindow={addChatWindow} />
                                    ))}
                                </div>
                            </>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatItems;
