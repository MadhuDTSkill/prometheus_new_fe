import React from 'react';
import { GiProcessor } from "react-icons/gi"; // Import a new icon for ML model

const CustomMLModel = ({ model }) => {
    return (
        <div className='flex flex-col gap-2 p-2 cp rounded-md hover:bg-main/10 duration-200 transition-all'>
            <GiProcessor className='text-3xl text-main self-center' />
            <span className='text-[10px] text-center truncate'>{model.name}</span>
        </div>
    );
}

export default CustomMLModel;
