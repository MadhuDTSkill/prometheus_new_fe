import { createContext, useState, useEffect, useContext } from "react";
import APICallContext from "./APICallContext";
import AuthContext from "./AuthContext";

const ChatsContext = createContext();

export const ChatsContextProvider = ({ children }) => {

    const { apiCall } = useContext(APICallContext);
    const { isAuthenticated } = useContext(AuthContext)
    const [refresh, setRefresh] = useState(false)
    const [chats, setChats] = useState([])
    const [isChatsLoading, setIsChatsLoading] = useState(false)

    const getChats = () => {
        let url = `chat/`
        let body = {}
        let method = 'get'
        let loadingState = setIsChatsLoading
        const onSuccess = (data) => {
            setChats(data)
        }
        const onError = (error) => {
        }
        isAuthenticated && apiCall(url, body, method, loadingState, onSuccess, onError)
    };

    const refreshChats = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {
        getChats()
    }, [refresh, isAuthenticated])

    return (
        <ChatsContext.Provider value={{
            chats,
            isChatsLoading,
            refreshChats,
        }}>
            {children}
        </ChatsContext.Provider>
    )
}

export default ChatsContext;