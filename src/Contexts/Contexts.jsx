import React from 'react'
import { GlobalContextProvider } from './GlobalContext';
import { ToastContextProvider } from './ToastContext';
import { AuthContextProvider } from './AuthContext';
import { APICallContextProvider } from './APICallContext';
import { ChatWindowsContextProvider } from './ChatWindowsContext';
import { ChatsContextProvider } from './ChatsContext';
import { ChatMessagesContextProvider } from './ChatMessagesContext';
import { LLMConfigContextProvider } from './LLMConfigContext';
import { ChatResponseContextProvider } from './ChatResponseContext';

const Contexts = ({ children }) => {
    return (
        <GlobalContextProvider>
            <ToastContextProvider>
                <AuthContextProvider>
                    <LLMConfigContextProvider>
                        <APICallContextProvider>
                            <ChatResponseContextProvider>
                                <ChatWindowsContextProvider>
                                    <ChatsContextProvider>
                                        <ChatMessagesContextProvider>
                                            {children}
                                        </ChatMessagesContextProvider>
                                    </ChatsContextProvider>
                                </ChatWindowsContextProvider>
                            </ChatResponseContextProvider>
                        </APICallContextProvider>
                    </LLMConfigContextProvider>
                </AuthContextProvider>
            </ToastContextProvider>
        </GlobalContextProvider>
    )
}

export default Contexts