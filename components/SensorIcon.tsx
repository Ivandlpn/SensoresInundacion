import React from 'react';

const SensorIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18h.01"
            />
        </svg>
    );
};

export default SensorIcon;
