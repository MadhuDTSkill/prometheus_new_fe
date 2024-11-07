import React, { useState } from 'react';
import LoadingIcon from '../ui/LoadingIcon';

const availableColors = {
    lightgreen: 'lightgreen',
    blue: '#1E90FF',
    // darkblue: '#00008B',
    red: '#FF0000',
    // yellow: '#FFFF00',
    orange: '#FFA500',
    // purple: '#800080',
    pink: '#FF69B4',
    // brown: '#A52A2A',
    gray: '#808080',
    cyan: '#00FFFF',
    white: '#FFFFFF',
};

const Theme = () => {
    const [selectedColor, setSelectedColor] = useState('lightgreen');
    const [hoveredColor, setHoveredColor] = useState(null);

    const handleColorChange = (color) => {
        setSelectedColor(color);
        document.documentElement.style.setProperty('--color-main', color); // Update CSS variable
    };

    return (
        <div className="p-4 flex-1 overflow-auto">
            <h2 className="font-semibold mb-4 text-center text-main">Theme Color</h2>

            <div className="flex flex-wrap gap-4 justify-center">
                {Object.entries(availableColors).map(([colorName, colorCode]) => (
                    <div key={colorName} className="relative">
                        <button
                            onClick={() => handleColorChange(colorCode)}
                            onMouseEnter={() => setHoveredColor(colorName)}
                            onMouseLeave={() => setHoveredColor(null)}
                            className={`w-10 h-10 flex justify-center items-center rounded-full border-[3px] 
                                ${selectedColor === colorCode ? 'border-[4px] border-solid' : 'border-gray-300'}
                                `}
                            style={{
                                borderColor: colorCode, // Ring color for the button
                                boxShadow: selectedColor === colorCode ? `0 0 0 3px ${colorCode}` : 'none'
                            }}
                        >
                            <LoadingIcon />
                        </button>

                        {/* Tooltip */}
                        {hoveredColor === colorName && (
                            <span
                                className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 z-30"
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Theme;
