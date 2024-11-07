import { createContext, useState, useEffect } from "react";

const ChatWindowsContext = createContext();

export const ChatWindowsContextProvider = ({ children }) => {

    const [chatWindows, setChatWindows] = useState([])
    const [activeWindow, setActiveWindow] = useState(0)

    const addNewChatWindow = (chatWindow) => {
        let windows = [...chatWindows]
        if (windows.length) {
            windows[windows.length - 1] = chatWindow
        }
        else {
            windows.push(chatWindow)
        }
        setChatWindows(windows)
    }

    const addChatWindow = (chatWindow) => {
        let windows = [...chatWindows]
        if (!windows.find(window => window.id === chatWindow.id)) {
            windows.push(chatWindow)
            setChatWindows(windows)
        }

    }

    const removeChatWindow = (id) => {
        setChatWindows(chatWindows.filter(chatWindow => chatWindow.id !== id))
    }

    const setActiveWindowFromId = (id) => {
        setActiveWindow(id)
    }

    const setFirstWindowAsActive = () => {
        setActiveWindow(chatWindows[chatWindows.length - 1]?.id)
    }


    useEffect(() => {
        setFirstWindowAsActive()
    }, [chatWindows])



    return (
        <ChatWindowsContext.Provider value={{
            chatWindows,
            setChatWindows,
            activeWindow,
            setActiveWindow,
            setActiveWindowFromId,
            addChatWindow,
            addNewChatWindow,
            removeChatWindow,
        }}>
            {children}
        </ChatWindowsContext.Provider>
    )
}

export default ChatWindowsContext;