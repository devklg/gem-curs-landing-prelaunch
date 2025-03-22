import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Home, User, Settings, HelpCircle } from 'lucide-react';

const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Only show header/nav on certain routes
    const shouldShowNav = !['/'].includes(location.pathname);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Profile', href: '/profile', icon: User },
        { name: 'Settings', href: '/settings', icon: Settings },
        { name: 'Help', href: '/help', icon: HelpCircle },
    ];

    if (!shouldShowNav) {
        return <main>{children}</main>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            {/* Header */}
            <header className="bg-black/50 backdrop-blur-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/dashboard" className="flex items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="/logo.svg"
                                    alt="Talk Fusion"
                                />
                                <span className="ml-2 text-white font-semibold text-lg">
                                    Talk Fusion
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`flex items-center text-sm font-medium ${location.pathname === item.href
                                                ? 'text-[#00A0DC]'
                                                : 'text-gray-300 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5 mr-1.5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? (
                                    <X className="block h-6 w-6" />
                                ) : (
                                    <Menu className="block h-6 w-6" />
                                )}
                            </button>
                        </div>

                        {/* User menu (desktop) */}
                        <div className="hidden md:flex items-center">
                            <div className="ml-3 relative">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                                            {/* User initial or avatar */}
                                            U
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.href
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Icon className="h-5 w-5 mr-2" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-black/50 backdrop-blur-lg border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} Talk Fusion. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link
                                to="/privacy"
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                to="/contact"
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout; 