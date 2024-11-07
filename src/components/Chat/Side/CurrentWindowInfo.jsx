import React from 'react';

const CurrentWindowInfo = ({
    currentWindow = {
        name: "Investment Tips Chat",
        gpt: { name: "Warren GPT" },
        document: { title: "Investment Basics Guide" } // or null if no document
    }
}) => {
    const { name, gpt, document } = currentWindow;

    return (
        <div className="flex-1 flex flex-col overflow-auto border-t border-b border-main border-opacity-25 p-3">
            <h2 className="font-semibold mb-2 text-center text-main">Current Window Info</h2>
            <div className="text-sm space-y-2">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>GPT:</strong> {gpt ? gpt.name : "Prometheus"}</p>
                <p><strong>Document:</strong> {document ? document.title : "Not Attached"}</p>
            </div>
        </div>
    );
};

export default CurrentWindowInfo;
