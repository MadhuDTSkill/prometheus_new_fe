import { createContext, useState } from "react";

const ChatResponseContext = createContext()

export const ChatResponseContextProvider = ({ children }) => {

    const [latestMessage, setLatestMessage] = useState({})
    const [isLatestMessageLoading, setIsLatestMessageLoading] = useState(false)

    const storeLatestMessage = (message) => {
        setLatestMessage(message)
    }


    return (
        <ChatResponseContext.Provider value={{
            latestMessage,
            storeLatestMessage,
            isLatestMessageLoading,
            setIsLatestMessageLoading

        }}>
            {children}
        </ChatResponseContext.Provider>
    )
}

export default ChatResponseContext