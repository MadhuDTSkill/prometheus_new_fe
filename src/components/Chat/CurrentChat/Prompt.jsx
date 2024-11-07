import React from 'react';
import { TbSend } from "react-icons/tb";
import LoadingIcon from '../../ui/LoadingIcon';

const Prompt = ({ prompt, setPrompt, setStaticPrompt, sendPrompt, isLoading, isStreaming }) => {
    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent the default Enter behavior (new line)
            if (prompt && !isLoading && !isStreaming) { // Ensure there is a prompt and it's not loading
                sendPrompt();
            }
        }
    };

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
        setStaticPrompt(e.target.value);
    };

    return (
        <div className="flex items-center p-2">
            <div className='cc-2 flex-1'>
                <textarea
                    value={prompt}
                    onChange={handlePromptChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="cc-2-target w-full p-2 resize-none outline-none border-main border bg-transparent"
                    rows="1"
                />
            </div>
            <button
                disabled={isLoading || !prompt}
                onClick={sendPrompt}
                className="ml-2 text-main hover:text-main-dark focus:outline-none"
            >
                {
                    isLoading || isStreaming ? (
                        <LoadingIcon size={34} />
                    ) : (
                        <TbSend size={24} />
                    )
                }
            </button>
        </div>
    );
};

export default Prompt;
