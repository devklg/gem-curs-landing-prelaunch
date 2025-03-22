import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {Array.from({ length: totalSteps }).map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-1/4 h-2 rounded-full mx-1 ${idx + 1 <= currentStep ? 'bg-[#00A0DC]' : 'bg-gray-600'
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-center text-gray-400">
                        Step {currentStep} of {totalSteps}
                    </p>
                </div>

                {/* Step Content */}
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Welcome to Talk Fusion!</h2>
                            <p className="text-xl text-gray-300">
                                Let's get you set up for success. We'll guide you through:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <span className="w-6 h-6 bg-[#00A0DC] rounded-full flex items-center justify-center mr-3">✓</span>
                                    Setting up your profile
                                </li>
                                <li className="flex items-center">
                                    <span className="w-6 h-6 bg-[#00A0DC] rounded-full flex items-center justify-center mr-3">✓</span>
                                    Completing your payment information
                                </li>
                                <li className="flex items-center">
                                    <span className="w-6 h-6 bg-[#00A0DC] rounded-full flex items-center justify-center mr-3">✓</span>
                                    Watching the orientation video
                                </li>
                                <li className="flex items-center">
                                    <span className="w-6 h-6 bg-[#00A0DC] rounded-full flex items-center justify-center mr-3">✓</span>
                                    Accessing your marketing tools
                                </li>
                            </ul>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Complete Your Profile</h2>
                            {/* Profile form component would go here */}
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Payment Information</h2>
                            {/* Payment form component would go here */}
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Orientation Video</h2>
                            {/* Video player component would go here */}
                        </div>
                    )}

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={nextStep}
                            className="px-6 py-3 bg-[#00A0DC] text-white rounded-md hover:bg-[#008DC3] transition-colors"
                        >
                            {currentStep === totalSteps ? 'Go to Dashboard' : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome; 