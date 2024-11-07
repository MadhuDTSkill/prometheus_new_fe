import React from 'react'
import { VscEyeClosed, VscAdd } from "react-icons/vsc";
import CustomGPT from '../components/CustomGPTs/CustomGPT';

const CustomGPTs = ({
    onClose
}) => {

    const gptNames = [
        { name: "Aristotle-Germanic" },
        { name: "Boolean-Engineering" },
        { name: "Cortex-Optimization" },
        { name: "Dynamo-Scaling" },
        { name: "Elegant- Algo" },
        { name: "Fastidious-Fetch" },
        { name: "Gigahertz-Generator" },
        { name: "Hexa-Hybrid" },
        { name: "Innovative-Index" },
        { name: "Jagged-Juxtapose" },
        { name: "Kinetic-Kernel" },
        { name: "Luminous-Loader" },
        { name: "Magnificent-Meta" },
        { name: "Nexus-Network" },
        { name: "Oceanic-Optimizer" },
        { name: "Perfect-Parser" },
        { name: "Quadruple-Query" },
        { name: "Rapid-Renderer" },
        { name: "Sophisticated-Scouter" },
        { name: "Terrific-Traffic" },
        { name: "Unify-Update" },
        { name: "Vigilant-Vision" }
    ];

    return (
        <div className="h-full flex flex-col max-w-[1000px] mx-auto border-t border-main border-opacity-25 p-2">
            <div className='flex justify-around'>
                <h2 className="font-semibold mb-3 text-center text-main">Custom GPTs</h2>
            </div>
            <div className='flex-1 overflow-auto grid grid-cols-7 px-3'>
                <div className='flex flex-col justify-center items-center gap-2 p-1 rounded-md hover:scale-125 duration-200 transition-all'>
                    <VscAdd className='text-3xl text-main' />
                    <span className='text-[10px] truncate'>Create New</span>
                </div>
                {
                    gptNames.map((gpt, index) => (
                        <CustomGPT gpt={gpt} key={index} />
                    ))
                }

            </div>

        </div>
    )
}

export default CustomGPTs