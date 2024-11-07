import { createContext, useState, useEffect, useContext } from "react";
import ChatWindowsContext from "./ChatWindowsContext";
import APICallContext from "./APICallContext";
import AuthContext from "./AuthContext";

const ChatMessagesContext = createContext();

export const ChatMessagesContextProvider = ({ children }) => {

    const { activeWindow } = useContext(ChatWindowsContext);
    const { isAuthenticated } = useContext(AuthContext)
    const { apiCall } = useContext(APICallContext);
    const [refresh, setRefresh] = useState(false)
    const [currentChatMessages, setCurrentChatMessages] = useState([])
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)

    const appendNewMessage = (message) => {
        setCurrentChatMessages([...currentChatMessages, message])
    }

    const getMessages = () => {
        let url = `chat/${activeWindow}/responses/list/`
        let body = {}
        let method = 'get'
        let loadingState = setIsMessagesLoading
        const onSuccess = (data) => {
            setCurrentChatMessages(data)
        }
        const onError = (error) => {
            console.log(error)
        }
        isAuthenticated && apiCall(url, body, method, loadingState, onSuccess, onError)
    };

    const refreshMessages = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {
        if (activeWindow && activeWindow !== '<new>') {
            getMessages()
        }
    }, [refresh, activeWindow, isAuthenticated])


    return < ChatMessagesContext.Provider value={
        {
            currentChatMessages,
            isMessagesLoading,
            appendNewMessage,
            refreshMessages,
        }
    }>
        {children}
    </ChatMessagesContext.Provider >
}

export default ChatMessagesContext;