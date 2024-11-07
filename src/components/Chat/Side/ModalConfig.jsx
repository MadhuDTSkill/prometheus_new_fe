import React, { useContext, useState } from 'react';
import { AiOutlineDown } from "react-icons/ai";
import LLMConfigContext from '../../../Contexts/LLMConfigContext';

const ModalConfig = () => {
    const { llmConfig, availableModels, updateModel, updateTemperature, updateMaxTokens } = useContext(LLMConfigContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Handle model selection
    const handleModelSelect = (model) => {
        updateModel(model);  // Update the selected model in context
        setIsDropdownOpen(false);
    };

    return (
        <div className="fflex-1 flex flex-col justify-center overflow-auto border-t border-b border-main border-opacity-25 p-3">
            <h2 className="font-semibold mb-2 text-center text-main">Model Configuration</h2>

            {/* Model Selection Dropdown */}
            <div className="flex-1 relative mb-2">
                <div className='flex items-center gap-3'>
                    <span className="block mb-2 text-sm font-medium">
                        Model:
                    </span>
                    <div
                        onClick={toggleDropdown}
                        className="w-full flex items-center justify-between p-1 border border-main rounded cursor-pointer text-main"
                    >
                        <span>{llmConfig.model}</span>
                        <AiOutlineDown />
                    </div>
                </div>

                {isDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 p-2 border border-main bg-black rounded shadow-md max-h-44 overflow-y-auto z-20">
                        {Object.keys(availableModels).map((category) => (
                            <div key={category} className="mb-2">
                                <h4 className="text-sm font-semibold text-main">{category}</h4>
                                <ul>
                                    {availableModels[category].map((model) => (
                                        <li
                                            key={model}
                                            onClick={() => handleModelSelect(model)}
                                            className="p-2 hover:bg-main hover:text-white cursor-pointer rounded"
                                        >
                                            {model}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Max Tokens Slider */}
            <div className="flex-1 mb-2">
                <label className="block mb-1 text-sm font-medium">
                    Max Tokens: {llmConfig.max_tokens}
                </label>
                <input
                    type="range"
                    min="100"
                    max="8192"
                    step="50"
                    value={llmConfig.max_tokens}
                    onChange={(e) => updateMaxTokens(parseInt(e.target.value))}
                    className="w-full h-2 bg-transparent border border-main accent-main rounded-full appearance-none cursor-pointer"
                />
            </div>

            {/* Temperature Slider */}
            <div className="flex-1 mb-2">
                <label className="block mb-1 text-sm font-medium">
                    Temperature: {llmConfig.temperature.toFixed(2)}
                </label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={llmConfig.temperature}
                    onChange={(e) => updateTemperature(parseFloat(e.target.value))}
                    className="w-full h-2 bg-transparent border border-main accent-main rounded-full appearance-none cursor-pointer"
                />
            </div>
        </div>
    );
};

export default ModalConfig;
