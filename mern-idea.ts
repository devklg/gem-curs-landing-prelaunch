import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Users,
    TrendingUp,
    Zap,
    HandMoney,
    LayoutDashboard,
    Video,
    LogIn,
    LogOut,
    AlertTriangle,
    CheckCircle,
    ArrowRight
} from 'lucide-react';

// Mock Data (Replace with actual data from your backend)
const mockVideos = [
    { id: '1', title: 'Talk Fusion Overview', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: '2', title: 'Product Demo', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: '3', title: 'Compensation Plan Explained', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

// Mock Compensation Plan Highlights
const mockCompensationHighlights = [
    { title: 'Fast Start Bonuses', description: 'Earn bonuses for each new member you bring in.' },
    { title: 'Team Commissions', description: 'Earn commissions based on your team\'s sales volume.' },
    { title: 'Mega Matching Bonuses', description: 'Earn a percentage of your downline\'s earnings.' },
    { title: 'Rank Advancement Bonuses', description: 'Get rewarded for reaching new ranks.' },
    { title: 'Leadership Pool', description: 'Share in the company\'s global revenue.' },
];

// Mock User Data (for demonstration)
interface UserData {
    id: string;
    name: string;
    email: string;
    rank: string;
    enrollerId: string | null;
    leftLeg: string[];
    rightLeg: string[];
    placementLeg: 'left' | 'right';
}

const mockUser: UserData = {
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    rank: 'Gold',
    enrollerId: null,
    leftLeg: [],
    rightLeg: [],
    placementLeg: 'left',
};

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const VideoCard = ({ video }: { video: typeof mockVideos[0] }) => (
    <motion.div variants={itemVariants} className="video-container">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <iframe
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </motion.div>
);

const CompensationHighlightCard = ({ highlight }: { highlight: typeof mockCompensationHighlights[0] }) => (
    <motion.div variants={itemVariants} className="space-y-2">
        <h3 className="text-xl font-semibold text-yellow-400">{highlight.title}</h3>
        <p className="text-lg text-gray-300">{highlight.description}</p>
    </motion.div>
);

const PreEnrollmentPage = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [enrollerId, setEnrollerId] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
    const [mockDownline, setMockDownline] = useState<UserData[]>([]);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleLogin = (email: string) => {
        if (email === 'john.doe@example.com') {
            setUser(mockUser);
            setMessage({ type: 'success', text: 'Logged in successfully!' });
        } else {
            setMessage({ type: 'error', text: 'Invalid email. This is a demo, use john.doe@example.com' });
        }
    };

    const handleLogout = () => {
        setUser(null);
        setMessage({ type: 'info', text: 'Logged out.' });
    };

    const handlePreEnrollment = async (name: string, email: string, enrollerId: string) => {
        setIsSubmitting(true);
        setMessage(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (!enrollerId) {
                throw new Error('Please provide an Enroller ID.');
            }

            const newUserId = `user${Math.random().toString(36).substring(7)}`;
            const placementLeg = Math.random() < 0.5 ? 'left' : 'right';

            const enrolledUser: UserData = {
                id: newUserId,
                name: name,
                email: email,
                rank: 'Member',
                enrollerId: enrollerId,
                leftLeg: [],
                rightLeg: [],
                placementLeg: placementLeg,
            };

            setMockDownline(prevDownline => [...prevDownline, enrolledUser]);

            if (user) {
                if (placementLeg === 'left') {
                    setUser(prevUser => ({
                        ...prevUser!,
                        leftLeg: [...prevUser!.leftLeg, newUserId],
                    }));
                } else {
                    setUser(prevUser => ({
                        ...prevUser!,
                        rightLeg: [...prevUser!.rightLeg, newUserId],
                    }));
                }
            }
            setMessage({
                type: 'success',
                text: `You have been successfully pre-enrolled! You are placed in your enroller's ${placementLeg} leg. Your User ID is ${newUserId}.`,
            });
            setUser(enrolledUser);

        } catch (error: any) {
            setMessage({ type: 'error', text: `Error: ${error.message}` });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getDownline = (userId: string): UserData[] => {
        return mockDownline.filter(u => u.enrollerId === userId);
    };

    useEffect(() => {
        if (user) {
            setMockDownline(getDownline(user.id));
        }
    }, [user]);

    // Check if the component is mounted.  This is VERY important for SSR!
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If not mounted, return null.  This is the KEY fix for SSR!
    if (!isMounted) {
        return null;
    }

    try {
        return (
            <div className="bg-gradient-primary text-white min-h-screen">
                <header className="container mx-auto px-4 py-6 text-center">
                    <h1 className="text-3xl font-bold mb-4">
                        <span className="text-yellow-400">Magnificent</span> Worldwide
                    </h1>
                    <p className="text-lg mb-8">Your Gateway to Financial Freedom with Talk Fusion</p>
                    {user ? (
                        <div className="flex items-center justify-center gap-4">
                            <span className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <span className="font-semibold">Welcome, {user.name}</span>
                            </span>
                            <button onClick={handleLogout} className="text-white hover:text-yellow-300 hover:bg-white/20 border-white/50 px-4 py-2 rounded-md border">
                                <LogOut className="mr-2 w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <a href="#enrollment" className="btn-primary">Get Started</a>
                    )}
                </header>

                <main className="container mx-auto px-4 py-8">
                    <motion.section
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl font-semibold mb-4">The Talk Fusion Opportunity</h2>
                        <p className="text-lg text-gray-300 mb-6">
                            Join us in revolutionizing communication with Talk Fusion's innovative video marketing platform.
                            We are building a global team of leaders, and you can be part of our success story.
                        </p>
                        <p className="text-lg text-yellow-300">
                            Pre-enrollment is open until April 15, 2025. Reserve your position now to maximize your benefits!
                        </p>
                    </motion.section>

                    <motion.section
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                    >
                        {mockVideos.map(video => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </motion.section>

                    <motion.section
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-semibold text-center mb-4">Key Benefits of Joining Our Team</h2>
                        <ul className="list-disc list-inside space-y-2 text-lg text-gray-300">
                            <li><Zap className="inline-block w-5 h-5 mr-2 text-yellow-400" /> Instant Pay Compensation Plan</li>
                            <li><HandMoney className="inline-block w-5 h-5 mr-2 text-yellow-400" /> Multiple Income Streams</li>
                            <li><Users className="inline-block w-5 h-5 mr-2 text-yellow-400" /> Global Opportunity</li>
                            <li><Video className="inline-block w-5 h-5 mr-2 text-yellow-400" /> Innovative Products</li>
                            <li><TrendingUp className="inline-block w-5 h-5 mr-2 text-yellow-400" /> Strong Leadership</li>
                            <li><CheckCircle className="inline-block w-5 h-5 mr-2 text-yellow-400" /> Pre-Enrollment Advantage</li>
                        </ul>
                    </motion.section>

                    <motion.section
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="bg-gray-800 rounded-lg shadow-lg p-8 mb-12"
                    >
                        <h2 className="text-2xl font-semibold text-center mb-6">Compensation Highlights</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mockCompensationHighlights.map((highlight, index) => (
                                <CompensationHighlightCard key={index} highlight={highlight} />
                            ))}
                        </div>
                    </motion.section>

                    {/* Enrollment/Login Section */}
                    <section id="enrollment" className="bg-gray-900 rounded-lg shadow-lg p-8 mb-12">
                        <h2 className="text-2xl font-semibold text-center mb-6">
                            {user ? 'Your Dashboard' : 'Join Magnificent Worldwide Today!'}
                        </h2>

                        {message && (
                            <div className={`mb-6 w-full max-w-md mx-auto rounded-md p-4 ${
                                message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/50' :
                                    message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/50' :
                                    'bg-blue-500/10 text-blue-400 border border-blue-500/50'
                                }`}>
                                <div className="flex items-center gap-4">
                                    {message.type === 'success' && <CheckCircle className="w-6 h-6 text-green-400" />}
                                    {message.type === 'error' && <AlertTriangle className="w-6 h-6 text-red-400" />}
                                    {message.type === 'info' && <LogIn className="w-6 h-6 text-blue-400" />}
                                    <p className="text-lg">{message.text}</p>
                                </div>
                            </div>
                        )}

                        {user ? (
                            <div className="w-full max-w-3xl mx-auto rounded-md bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                                <div className="p-6 border-b border-white/10">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <LayoutDashboard className="w-6 h-6" />
                                        Your Downline
                                    </h2>
                                    <p className="text-gray-400">
                                        Here's an overview of your downline. Encourage them to grow!
                                    </p>
                                </div>
                                <div className="p-6">
                                    {mockDownline.length > 0 ? (
                                        <div className="space-y-4">
                                            {mockDownline.map((member) => (
                                                <div key={member.id} className="bg-gray-800 border border-gray-700 rounded-md p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-lg font-semibold">{member.name}</p>
                                                            <p className="text-gray-400 text-sm">Email: {member.email}</p>
                                                            <p className="text-gray-400 text-sm">Rank: {member.rank}</p>
                                                            <p className="text-gray-400 text-sm">Leg: {member.placementLeg}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400">You don't have anyone in your downline yet. Start recruiting!</p>
                                    )}
                                </div>
                            </div>

                        ) : (
                            <div className="w-full max-w-md mx-auto rounded-md bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                                <div className="p-6">
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <label htmlFor="email" className="block text-lg font-medium">
                                                {user ? "Enter Enroller ID (if applicable)" : "Email"}
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder={user ? "Enter enroller ID" : "Enter your email"}
                                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={(e) => {
                                                    if (user) {
                                                        setEnrollerId(e.target.value);
                                                    } else {
                                                        setNewEmail(e.target.value);
                                                    }
                                                }}
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        {!user && (
                                            <>
                                                <div className="space-y-4">
                                                    <label htmlFor="name" className="block text-lg font-medium">Full Name</label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={(e) => setNewName(e.target.value)}
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <label htmlFor="enrollerId" className="block text-lg font-medium">Enroller ID (Optional)</label>
                                                    <input
                                                        id="enrollerId"
                                                        type="text"
                                                        placeholder="Enter your enroller's ID"
                                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={(e) => setEnrollerId(e.target.value)}
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <button
                                            className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-lg transition-colors duration-200"
                                            onClick={() => {
                                                if (user) {
                                                    handlePreEnrollment('New User', 'newuser@example.com', enrollerId);
                                                } else {
                                                    handlePreEnrollment(newName, newEmail, enrollerId);
                                                }
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                user ? "Pre-Enroll Now" : "Login / Register"
                                            )}
                                            {!user && <ArrowRight className="ml-2 w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </main>

                <footer className="bg-gray-900 text-gray-400 py-4 text-center">
                    <p>© 2025 Magnificent Worldwide. All rights reserved.</p>
                    <p>Disclaimer: Earnings are not guaranteed. Your success depends on your effort and dedication.</p>
                </footer>
            </div>
        );
    } catch (error) {
        console.error("Error in PreEnrollmentPage:", error);
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">Failed to render application. Please check the console for details.</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                </span>
            </div>
        );
    }
};

export default PreEnrollmentPage;

