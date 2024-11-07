import React, { useEffect, useState } from 'react';

const SystemInfo = () => {
    const [time, setTime] = useState(new Date());
    const [uptime, setUptime] = useState(0);
    const [osType, setOsType] = useState('Unknown');
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [cpuLoad, setCpuLoad] = useState(0);
    const [memoryUsage, setMemoryUsage] = useState({ used: 0, total: 0 });
    const [processorCores, setProcessorCores] = useState(0);

    // Function to simulate CPU load
    const simulateCpuLoad = () => {
        const start = performance.now();
        let count = 0;
        // Loop for a short duration to simulate load
        while (performance.now() - start < 100) {
            count++;
        }
        // Update CPU load based on the count of iterations
        setCpuLoad((count / 1000).toFixed(2)); // Simulate load in arbitrary units
    };

    // Update time every second
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Calculate uptime since component mount
    useEffect(() => {
        const startTime = Date.now();
        const uptimeInterval = setInterval(() => {
            const seconds = Math.floor((Date.now() - startTime) / 1000);
            setUptime((seconds / 3600).toFixed(1)); // Convert to hours and format to 1 decimal place
        }, 1000);
        return () => clearInterval(uptimeInterval);
    }, []);

    // Detect OS type
    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        let detectedOs = "Unknown";
        if (userAgent.includes("win")) detectedOs = "Windows";
        else if (userAgent.includes("mac")) detectedOs = "MacOS";
        else if (userAgent.includes("linux")) detectedOs = "Linux";
        setOsType(detectedOs.slice(0, 33)); // Slice to 33 characters
    }, []);

    // Get battery level
    useEffect(() => {
        navigator.getBattery().then((battery) => {
            setBatteryLevel((battery.level * 100).toFixed(0)); // Convert to percentage
            battery.addEventListener("levelchange", () => {
                setBatteryLevel((battery.level * 100).toFixed(0));
            });
        });
    }, []);

    // Simulate CPU load every 5 seconds
    useEffect(() => {
        const cpuLoadInterval = setInterval(simulateCpuLoad, 5000);
        return () => clearInterval(cpuLoadInterval);
    }, []);

    // Get memory usage (if supported)
    useEffect(() => {
        if (performance.memory) {
            setMemoryUsage({
                used: performance.memory.usedJSHeapSize / (1024 * 1024), // Convert to MB
                total: performance.memory.totalJSHeapSize / (1024 * 1024) // Convert to MB
            });
        }
    }, []);

    // Get processor cores (estimate)
    useEffect(() => {
        const cores = navigator.hardwareConcurrency || 4; // Default to 4 if not available
        setProcessorCores(cores);
    }, []);

    return (
        <div className="">
            {/* Time and Date Section */}
            <div className="text-4xl hero text-center mb-2">
                {time.toLocaleTimeString()}
            </div>
            <div className="flex justify-between p-1 border-t border-b border-main border-opacity-25 items-center">
                <div className="flex flex-col items-center justify-center">
                    <span className="opacity-60">DATE</span>
                    <span>{time.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toLowerCase()}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="opacity-60">UPTIME</span>
                    <span>{uptime}h</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="opacity-60">TYPE</span>
                    <span>{osType}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="opacity-60">POWER</span>
                    <span>{batteryLevel !== null ? `${batteryLevel}%` : "N/A"}</span>
                </div>
            </div>

            {/* CPU and Memory Section */}
            <div className="p-1 border-b border-main border-opacity-25">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center justify-center">
                        <span className="opacity-60 truncate">USAGE</span>
                        <span className=' truncate'>{memoryUsage.used.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="opacity-60 truncate">CPU</span>
                        <span className=' truncate'>{cpuLoad} units</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="opacity-60">CORES</span>
                        <span>{processorCores} cores</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SystemInfo