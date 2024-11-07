import React, { useContext, useEffect, useRef, useState } from 'react'
import Messages from './CurrentChat/Messages'
import Intro from './CurrentChat/Intro'
import Prompt from './CurrentChat/Prompt'
import ChatConnectionWrapper from '../../Wrappers/ChatConnectionWrapper'
import LoadingIcon from '../ui/LoadingIcon'
import LLMConfigContext from '../../Contexts/LLMConfigContext'
import ChatMessagesContext from '../../Contexts/ChatMessagesContext'

const CurrentChat = ({
    isConnected,
    isConnecting,
    isLoading,
    errorMessage,
    isStreaming,
    setIsStreaming,
    sendPrompt,
    latestMessage,
    waitingMessage,
    currentChat
}) => {

    const { currentChatMessages, isMessagesLoading, appendNewMessage } = useContext(ChatMessagesContext)
    const { llmConfig } = useContext(LLMConfigContext)


    const [prompt, setPrompt] = useState('');
    const [_, setStaticPrompt] = useState(currentChat?.first_prompt || '');
    const messageContainerRef = useRef(null);
    const [scrollInterval, setScrollInterval] = useState(null)


    const addNewMessage = (message) => {
        appendNewMessage(message)
        setIsStreaming(false)
    };

    const scrollToBottom = () => {
        const ele = document.getElementById('message-bottom')
        if (ele) {
            ele.scrollIntoView({ behavior: "smooth" });
        }
    };

    const onSubmit = () => {
        setPrompt("");
        sendPrompt({
            prompt: prompt,
            llm_config: llmConfig
        });
    };

    useEffect(() => {
        if (isConnected && !isMessagesLoading && currentChatMessages.length === 0) {
            sendPrompt()
        }
    }, [isConnected, currentChatMessages, isMessagesLoading])

    useEffect(() => {
        scrollToBottom();
    }, [isLoading, errorMessage, currentChatMessages]);

    useEffect(() => {
        if (isStreaming) {
            setScrollInterval(setInterval(() => {
                scrollToBottom()
            }, 100))
        }
        else {
            if (scrollInterval) {
                clearInterval(scrollInterval)
            }
            scrollToBottom()
        }
    }, [isStreaming])


    return (
        <div className='flex flex-col h-full overflow-auto py-2'>
            <div id="messages" className="flex-1 overflow-auto md:p-3" ref={messageContainerRef}>
                {
                    isMessagesLoading ?
                        <div className='flex gap-3 items-center justify-center h-full'>
                            <LoadingIcon />
                        </div>
                        :
                        currentChatMessages?.length > 0 || isLoading || isStreaming ? (
                            <Messages
                                messages={currentChatMessages}
                                isLoading={isLoading}
                                _={_}
                                isStreaming={isStreaming}
                                addNewMessage={addNewMessage}
                                latestMessage={latestMessage}
                                waitingMessage={waitingMessage}
                            />
                        ) : (
                            <Intro />
                        )
                }
            </div>
            <Prompt
                prompt={prompt}
                setPrompt={setPrompt}
                setStaticPrompt={setStaticPrompt}
                isLoading={isLoading}
                isStreaming={isStreaming}
                sendPrompt={onSubmit}
            />
        </div>
    )
}

export default ChatConnectionWrapper(CurrentChat)