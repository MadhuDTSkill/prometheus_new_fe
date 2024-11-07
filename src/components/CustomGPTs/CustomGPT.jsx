import React from 'react'
import { GiBrain } from "react-icons/gi";

const CustomGPT = ({ gpt }) => {
    return (
        <div className='flex flex-col gap-2 p-2 cp rounded-md hover:bg-main/10 duration-200 transition-all'>
            <GiBrain className='text-3xl text-main self-center' />
            <span className='text-[10px] text-center truncate'>{gpt.name}</span>
        </div>
    )
}

export default CustomGPT