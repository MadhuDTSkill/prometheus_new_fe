import React, { useState, useEffect, useRef, useContext } from 'react';
import ChatWindowsContext from '../Contexts/ChatWindowsContext';
import ChatResponseContext from '../Contexts/ChatResponseContext';
import { getData } from '../Functions/localStorage';

const token = getData('accessToken')

const ChatConnectionWrapper = (WrappedComponent) => {
    return (props) => {
        const ws = useRef(null);
        const { activeWindow } = useContext(ChatWindowsContext)
        const { storeLatestMessage, setIsLatestMessageLoading } = useContext(ChatResponseContext)
        const [isConnected, setIsConnected] = useState(false);
        const [isConnecting, setIsConnecting] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [waitingMessage, setWaitingMessage] = useState('Loading...');
        const [errorMessage, setErrorMessage] = useState('');
        const [isStreaming, setIsStreaming] = useState(false);
        const [latestMessage, setLatestMessage] = useState(null);


        const sendPrompt = (data) => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                setIsLoading(true)
                setIsLatestMessageLoading(true)
                ws.current.send(JSON.stringify({ ...data }));
            }
            else {
                console.log('WebSocket is not open!')
            }
        };

        const setupWebSocket = () => {
            setIsConnecting(true)
            ws.current = ws.current || new WebSocket(`ws://127.0.0.1:8000/ws/chat/${activeWindow}?token=${token}`);

            ws.current.onopen = () => {
                console.log("WebSocket connected!");
                setErrorMessage('')
                setIsConnecting(false)
                setIsConnected(true);
            };

            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'source_status') {
                    setWaitingMessage(data.source)
                }
                else {
                    setIsLoading(false)
                    setIsLatestMessageLoading(false)
                    setLatestMessage(data)
                    storeLatestMessage(data)
                    setIsStreaming(true)
                }
            }

            ws.current.onerror = (event) => {
                console.error("WebSocket error observed:", event);
                setErrorMessage('Something Went Wrong')
                setIsConnected(false);
                setIsConnecting(false)

            };

            ws.current.onclose = (event) => {
                console.log(`WebSocket is closed now`);
                setErrorMessage('Something Went Wrong')
                setIsConnected(false);
                setIsConnecting(false)
            };
        };

        useEffect(() => {
            activeWindow && setupWebSocket();
            return () => {
                if (ws.current?.readyState === WebSocket.OPEN) {
                    ws.current?.close();
                    ws.current = null
                    setIsConnected(false);
                }
            };
        }, [activeWindow]);

        return (
            <WrappedComponent
                {...props}
                isConnected={isConnected}
                isConnecting={isConnecting}
                isLoading={isLoading}
                errorMessage={errorMessage}
                isStreaming={isStreaming}
                setIsStreaming={setIsStreaming}
                sendPrompt={sendPrompt}
                latestMessage={latestMessage}
                waitingMessage={waitingMessage}
                activeWindow={activeWindow}
            />
        )
    }
}

export default ChatConnectionWrapper

