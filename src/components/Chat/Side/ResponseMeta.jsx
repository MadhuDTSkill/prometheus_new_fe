import React, { useContext } from 'react';
import ChatResponseContext from '../../../Contexts/ChatResponseContext';
import CountUp from 'react-countup';
import LoadingText from '../../ui/LoadingText';

const ResponseMeta = ({
    lastResponseMetadata = {
        model: "GPT-4 Turbo",
        prompt_tokens: 120,
        output_tokens: 250,
        total_tokens: 370
    }
}) => {
    const { latestMessage, isLatestMessageLoading } = useContext(ChatResponseContext)
    const { llm_config, token_usage } = latestMessage

    return (
        <div className="flex-1 flex flex-col overflow-auto border-t border-b border-main border-opacity-25 p-3">
            <h2 className="font-semibold mb-2 text-center text-main">Response Meta</h2>
            {
                isLatestMessageLoading ?
                    <div className="text-sm space-y-2">
                        <p>
                            <strong>Model:</strong>
                            <LoadingText />
                        </p>
                        <p>
                            <strong>Input Tokens:</strong>
                            <CountUp
                                end={5000}
                                duration={100}
                                separator=","
                            />
                        </p>
                        <p>
                            <strong>Output Tokens:</strong>
                            <CountUp
                                end={5000}
                                duration={100}
                                separator=","
                            />
                        </p>
                        <p><strong>Total Tokens:</strong>
                            <CountUp
                                end={5000}
                                duration={100}
                                separator=","
                            />
                        </p>
                    </div>
                    :
                    <div className="text-sm space-y-2">
                        <p><strong>Model:</strong> {llm_config?.model || ' - '}</p>
                        <p><strong>Input Tokens:</strong> {token_usage?.input_tokens || ' - '}</p>
                        <p><strong>Output Tokens:</strong> {token_usage?.output_tokens || ' - '}</p>
                        <p><strong>Total Tokens:</strong> {token_usage?.total_tokens || ' - '}</p>
                    </div>
            }
        </div>
    );
};

export default ResponseMeta;
