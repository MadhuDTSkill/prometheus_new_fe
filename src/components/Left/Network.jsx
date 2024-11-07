import React, { useState, useEffect } from 'react';

const Network = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [ping, setPing] = useState(null);
    const [connectionType, setConnectionType] = useState(navigator.connection?.effectiveType || 'unknown');
    const [downlink, setDownlink] = useState(navigator.connection?.downlink || 'N/A');

    // Check network status changes
    useEffect(() => {
        const updateOnlineStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    // Calculate ping (for simplicity, pinging a public server)
    useEffect(() => {
        const calculatePing = async () => {
            const start = Date.now();
            try {
                await fetch('https://www.google.com', { method: 'HEAD', mode: 'no-cors' });
                setPing(Date.now() - start);
            } catch (error) {
                setPing('N/A');
            }
        };

        calculatePing();
        const pingInterval = setInterval(calculatePing, 60000); // Update every 5 seconds

        return () => clearInterval(pingInterval);
    }, []);

    return (
        <div className="p-1 border-t border-b border-main border-opacity-25">
            {/* Network Status Section */}
            {/* <h2 className="font-semibold mb-2 text-center text-main">Netwrok</h2> */}
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-center justify-center">
                    <span className="opacity-60">STATUS</span>
                    <span>
                        {isOnline ? 'Online' : 'Offline'}
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="opacity-60">PING</span>
                    <span>{ping !== null ? `${ping} ms` : 'Calculating...'}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="opacity-60">TYPE</span>
                    <span>{connectionType}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="opacity-60">SPEED</span>
                    <span>{downlink} Mbps</span>
                </div>
            </div>
        </div>
    );
};

export default Network;
