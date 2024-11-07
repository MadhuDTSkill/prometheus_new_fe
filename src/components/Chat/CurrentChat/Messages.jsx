import React from 'react'
import Message from './Message'

const Messages = ({
    messages,
    isLoading,
    _,
    isStreaming,
    addNewMessage,
    latestMessage,
    waitingMessage,
}) => {


    return (
        <div className='h-full flex flex-col gap-4 p-4'>
            {
                messages.map((message, index) =>
                    <Message key={index} message={message} />
                )
            }
            {
                isLoading &&
                <Message message={{
                    prompt: _,
                    ressponse: waitingMessage,
                }}
                    isLoading={isLoading}
                />
            }
            {
                isStreaming &&
                <Message message={{
                    ...latestMessage,
                }}
                    isStreaming={isStreaming}
                    addNewMessage={addNewMessage}
                />
            }
            <span id='message-bottom'></span>
        </div>
    )
}

export default Messages
