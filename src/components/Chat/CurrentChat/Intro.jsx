import React, { useEffect, useState } from 'react';

const Intro = ({
    gpt = {
        name: 'Prometheus',
        short_bio: 'Your friendly AI chatbot, here to help you with all things AI!',
        long_bio: 'Prometheus is an AI from the future, designed to provide insightful, intelligent responses. With advanced learning capabilities, Prometheus is equipped to assist with diverse queries and provide personalized AI interactions in real time.'
    }
}) => {

    return (
        <div className='h-full flex-1 overflow-auto flex flex-col justify-center items-center'>
            <h1 className='text-center text-xl font-semibold'>{gpt.name}</h1>
            <p className='text-center text-sm mb-6'>{gpt.short_bio}</p>
            <p className='text-center text-md'>{gpt.long_bio}</p>
        </div>
    );
};

export default Intro;
