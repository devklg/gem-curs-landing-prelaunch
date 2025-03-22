import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 5,
        hours: 14,
        minutes: 4,
        seconds: 58
    });

    useEffect(() => {
        const timer = setInterval(() => {
            // Add countdown logic here
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex justify-center space-x-6">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
    );
};

const TimeUnit = ({ value, label }) => (
    <div className="text-center">
        <div className="text-3xl font-bold text-[#00A0DC]">
            {String(value).padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-400">{label}</div>
    </div>
);

export default CountdownTimer; 