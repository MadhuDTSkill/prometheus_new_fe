import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Markdown from 'react-markdown';
import LoadingIcon from '../../ui/LoadingIcon';
import LoadingText from '../../ui/LoadingText';
import WordTypewriter from '../../ui/Typing';

const Message = ({ message, addNewMessage, isStreaming, isLoading }) => {
    const { prompt, response } = message;
    const titleRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
        );
    }, [message]);

    return (
        <div className='flex flex-col gap-4'>
            {/* Prompt - align to the right */}
            <div className='self-end w-full flex justify-end relative'>
                <div className='pb-0.5 border-t border-main min-w-[28%] max-w-[70%]'>
                    <p className='mt-2 py-2 px-4 text-sm'>{prompt}</p>
                </div>
                <div ref={titleRef} className='cc-2 absolute text-md right-5 -top-3 font-semibold p-px'>
                    <p className='cc-2-target p-1 px-16'>You</p>
                </div>
            </div>
            {/* Response - align to the left */}
            {
                isLoading ?
                    <div className='cc-2 w-52 p-[0.3px]'>
                        <div className='cc-2-target self-start flex items-center justify-between gap-2 p-2 px-3'>
                            <LoadingIcon size={18} />
                            <LoadingText />
                        </div>
                    </div>
                    :
                    <div className='self-start w-full flex justify-start relative'>
                        <div className='mt-2 pb-0.5 border-t border-main min-w-[50%] max-w-[70%]'>
                            <div className='pt-4 pb-2 px-4 pl-6 text-sm'>
                                {
                                    isStreaming ?
                                        <div className='intro-title'>
                                            <WordTypewriter
                                                text={response}
                                                typeSpeed={20}
                                                animate={true}
                                                onComplete={() => addNewMessage(message)}
                                            />
                                        </div>
                                        :
                                        <Markdown>
                                            {response}
                                        </Markdown>
                                }
                            </div>
                        </div>
                        <div ref={titleRef} className='cc-2 absolute text-md left-6 -top-2 font-semibold p-px'>
                            <p className='cc-2-target p-1 px-16'>Prometheus</p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Message;
