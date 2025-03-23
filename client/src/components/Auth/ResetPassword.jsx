import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock } from 'lucide-react';

const ResetPassword = () => {
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        // Verify token validity
        const verifyToken = async () => {
            try {
                // API call to verify token
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (err) {
                setIsValid(false);
                setError('Invalid or expired reset token');
            }
        };

        verifyToken();
    }, [token]);

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChar
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (passwords.password !== passwords.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!validatePassword(passwords.password)) {
            setError(
                'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters'
            );
            return;
        }

        setIsLoading(true);

        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate('/login', {
                state: { message: 'Password reset successful. Please login with your new password.' }
            });
        } catch (err) {
            setError('Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isValid) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-lg p-8 text-center">
                    <div className="text-red-500 mb-4">
                        Invalid or expired reset link
                    </div>
                    <button
                        onClick={() => navigate('/forgot-password')}
                        className="text-[#00A0DC] hover:text-[#008DC3]"
                    >
                        Request new reset link
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-lg p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Enter your new password below
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded text-red-500">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-200">
                            New Password
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={passwords.password}
                                onChange={(e) => setPasswords({
                                    ...passwords,
                                    password: e.target.value
                                })}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A0DC] focus:border-transparent"
                                placeholder="Enter new password"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200">
                            Confirm New Password
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({
                                    ...passwords,
                                    confirmPassword: e.target.value
                                })}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A0DC] focus:border-transparent"
                                placeholder="Confirm new password"
                            />
                        </div>
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
                                Resetting password...
                            </div>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword; 