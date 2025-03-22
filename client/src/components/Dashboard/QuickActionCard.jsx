import React from 'react';
import { Link } from 'react-router-dom';

const QuickActionCard = ({ title, icon: Icon, description, link }) => {
    return (
        <Link
            to={link}
            className="group bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/15 transition-all duration-300"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-[#00A0DC]/10 rounded-lg group-hover:bg-[#00A0DC]/20 transition-colors">
                    <Icon className="h-6 w-6 text-[#00A0DC]" />
                </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
                {title}
            </h3>
            <p className="text-gray-400 text-sm">
                {description}
            </p>
            <div className="mt-4 flex items-center text-[#00A0DC] text-sm font-medium">
                <span>Get Started</span>
                <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </div>
        </Link>
    );
};

export default QuickActionCard; 