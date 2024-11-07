import React, { useContext, useState } from 'react'
import Intro from './CurrentChat/Intro'
import APICallContext from '../../Contexts/APICallContext';
import ChatWindowsContext from '../../Contexts/ChatWindowsContext';
import Prompt from './CurrentChat/Prompt';
import Messages from './CurrentChat/Messages';

const NewChat = () => {

    const { apiCall } = useContext(APICallContext)
    const { addNewChatWindow } = useContext(ChatWindowsContext)

    const [prompt, setPrompt] = useState('');
    const [_, setStaticPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const createNewChat = () => {
        let url = 'chat/'
        let body = {
            first_prompt: prompt
        }
        let method = 'post'
        let loadingState = setIsLoading
        const onSuccess = (data) => {
            addNewChatWindow(data)
        }
        const onError = (error) => {
            console.log(error)
        }
        setPrompt('')
        apiCall(url, body, method, loadingState, onSuccess, onError)
    }


    return (
        <div className='flex flex-col h-full overflow-auto'>

            {
                isLoading ?
                    <Messages
                        messages={[]}
                        _={_}
                        isLoading={isLoading}

                    />
                    :
                    <Intro />
            }
            <Prompt
                isLoading={isLoading}
                prompt={prompt}
                setPrompt={setPrompt}
                setStaticPrompt={setStaticPrompt}
                sendPrompt={createNewChat}
            />
        </div>
    )
}

export default NewChat