import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Users,
    TrendingUp,
    Zap,
    Wallet,
    Video,
    CheckCircle,
    ArrowRight,
    Globe,
    Shield,
    Clock,
    Target
} from 'lucide-react';

const PreEnrollmentPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Hero Section */}
            <header className="container mx-auto px-4 py-8">
                <p className="text-2xl mb-6 text-gray-200 text-center">
                    Your Gateway to Financial Freedom with Network Marketing and Video Email
                </p>
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => navigate('/join')}
                        className="bg-[#FF6B00] hover:bg-[#E65A00] text-white text-lg px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                        Join the Opportunity <span className="text-white">⚡</span>
                    </button>
                </div>
            </header>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar with Videos */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-8">
                            <div className="bg-gray-900 rounded-lg p-4 mb-4">
                                <h3 className="text-lg font-semibold mb-4">Watch Our Videos</h3>
                                <div className="space-y-3">
                                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                        <iframe
                                            src="https://www.youtube.com/embed/mKW8LZqf4VE"
                                            title="Talk Fusion Overview Video 1"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                        <iframe
                                            src="https://www.youtube.com/embed/HW6NqKkbs6M"
                                            title="Talk Fusion Overview Video 2"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                        <iframe
                                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                            title="Talk Fusion Compensation Plan"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/join')}
                                className="w-full bg-[#00A0DC] hover:bg-[#0088BC] text-white text-lg px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                            >
                                Reserve Your Spot Now
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Opportunity Section */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-semibold mb-6">The Talk Fusion Opportunity</h2>
                            <p className="text-xl text-gray-300 mb-8">
                                Join us in revolutionizing communication with Talk Fusion's innovative video marketing platform.
                                We are building a global team of leaders, and you can be part of our success story.
                            </p>
                            <div className="bg-[#00A0DC]/5 border border-[#00A0DC]/20 rounded-lg p-6">
                                <p className="text-xl text-[#00A0DC] font-semibold">
                                    Pre-enrollment is open until April 15, 2025. Reserve your position now to maximize your benefits!
                                </p>
                            </div>
                        </section>

                        {/* Key Benefits Section */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-semibold mb-8">Why Choose Talk Fusion?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-900 rounded-lg p-6">
                                    <Zap className="w-10 h-10 text-[#00A0DC] mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Instant Pay Compensation</h3>
                                    <p className="text-gray-300">Earn immediately with our industry-leading compensation plan.</p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-6">
                                    <Globe className="w-10 h-10 text-[#00A0DC] mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Global Opportunity</h3>
                                    <p className="text-gray-300">Build your business worldwide with Talk Fusion's international presence.</p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-6">
                                    <Shield className="w-10 h-10 text-[#00A0DC] mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
                                    <p className="text-gray-300">Join a company with over 15 years of success in the industry.</p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-6">
                                    <Clock className="w-10 h-10 text-[#00A0DC] mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Time-Limited Offer</h3>
                                    <p className="text-gray-300">Take advantage of our pre-enrollment period with exclusive benefits.</p>
                                </div>
                            </div>
                        </section>

                        {/* Features Section */}
                        <section>
                            <h2 className="text-3xl font-semibold mb-8">What You Get</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-900 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold mb-4">Training & Support</h3>
                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-[#00A0DC]" />
                                            Comprehensive training program
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-[#00A0DC]" />
                                            One-on-one mentoring
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-[#00A0DC]" />
                                            Marketing materials and resources
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold mb-4">Business Tools</h3>
                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-[#00A0DC]" />
                                            Professional website
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-[#00A0DC]" />
                                            Marketing automation tools
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-[#00A0DC]" />
                                            Customer management system
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-2">© 2025 Talk Fusion. All rights reserved.</p>
                    <p className="text-sm">Disclaimer: Earnings are not guaranteed. Your success depends on your effort and dedication.</p>
                </div>
            </footer>
        </div>
    );
};

export default PreEnrollmentPage; 