import React, { useContext } from 'react'
import Header from '../components/Chat/Header'
import CurrentChat from '../components/Chat/CurrentChat'
import ResponseMeta from '../components/Chat/Side/ResponseMeta'
import ModalConfig from '../components/Chat/Side/ModalConfig'
import LoadingHUD from '../components/Chat/Side/LoadingHUD'
import ChatWindowsContext from '../Contexts/ChatWindowsContext'
import CurrentWindowInfo from '../components/Chat/Side/CurrentWindowInfo'
import NewChat from '../components/Chat/NewChat'
import MainIntro from '../components/Chat/MainIntro'

const Chat = ({
    moreOptions = false
}) => {

    const { chatWindows, activeWindow } = useContext(ChatWindowsContext);
    const activeChatWindow = chatWindows.find(window => window.id === activeWindow);


    return (
        <div className='cc-target grid grid-cols-12 h-full gap-2'>
            <div className='col-span-9 flex flex-col overflow-auto overflow-x-auto w-full'>
                <Header />
                {
                    activeWindow && activeWindow !== '<new>' &&
                    <CurrentChat currentChat={activeChatWindow} />
                }
                {
                    chatWindows.length === 0 &&
                    <MainIntro />
                }
                {
                    activeWindow === '<new>' &&
                    <NewChat />
                }
            </div>
            <div className='col-span-3 
            bg-normal cc overflow-auto'>
                <div className='flex overflow-auto flex-col cc-target-2 border border-main border-opacity-25'>
                    <CurrentWindowInfo currentWindow={activeChatWindow} />
                    <ResponseMeta />
                    <ModalConfig />
                    {
                        moreOptions &&
                        <LoadingHUD />
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat