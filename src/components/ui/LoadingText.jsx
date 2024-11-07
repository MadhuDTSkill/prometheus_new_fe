import React, { useEffect, useState } from 'react'

const LoadingText = ({
    text = 'Loading...'
}) => {

    return (
        <>
            {
                'Loading...'?.split("").map((char, index) => (
                    <span
                        key={index}
                        className="twinkle text-[9px]"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
        </>
    )
}

export default LoadingText