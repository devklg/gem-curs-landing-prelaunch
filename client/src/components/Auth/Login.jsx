import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // API call would go here
            const response = await loginUser(formData);
            localStorage.setItem('token', response.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-lg p-8">
                <div className="text-center mb-8">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="/logo.svg"
                        alt="Talk Fusion"
                    />
                    <h2 className="mt-6 text-3xl font-bold text-white">
                        Sign in to your account
                    </h2>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded text-red-500">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-200">
                            Email address
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    email: e.target.value
                                })}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A0DC] focus:border-transparent"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    password: e.target.value
                                })}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A0DC] focus:border-transparent"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    rememberMe: e.target.checked
                                })}
                                className="h-4 w-4 text-[#00A0DC] focus:ring-[#00A0DC] border-gray-600 rounded bg-white/5"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                Remember me
                            </label>
                        </div>

                        <Link
                            to="/forgot-password"
                            className="text-sm font-medium text-[#00A0DC] hover:text-[#008DC3]"
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00A0DC] hover:bg-[#008DC3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A0DC] disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </div>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login; 