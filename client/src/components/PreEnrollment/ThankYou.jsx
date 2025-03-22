import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ThankYou = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const tempPassword = localStorage.getItem('tempPassword');

    useEffect(() => {
        // If no userId, redirect to pre-enrollment
        if (!userId) {
            navigate('/');
        }
        // Auto-redirect to welcome page after 10 seconds
        const timer = setTimeout(() => {
            navigate('/welcome');
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6">
                        Thank You for Pre-Enrolling!
                    </h1>
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Your Login Credentials</h2>
                        <div className="space-y-4 text-left">
                            <div className="p-4 bg-gray-800 rounded-lg">
                                <p className="text-gray-400 mb-1">User ID:</p>
                                <p className="font-mono text-xl">{userId}</p>
                            </div>
                            {tempPassword && (
                                <div className="p-4 bg-gray-800 rounded-lg">
                                    <p className="text-gray-400 mb-1">Temporary Password:</p>
                                    <p className="font-mono text-xl">{tempPassword}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 text-yellow-300">
                            <p>Please save these credentials! You'll need them to log in.</p>
                        </div>
                    </div>

                    <p className="text-gray-300 mb-8">
                        You will be automatically redirected to the welcome page in a few seconds...
                    </p>

                    <div className="space-x-4">
                        <Link
                            to="/welcome"
                            className="inline-block bg-[#00A0DC] text-white px-6 py-3 rounded-md hover:bg-[#008DC3] transition-colors"
                        >
                            Continue to Welcome Page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou; 