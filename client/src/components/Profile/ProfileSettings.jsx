import React, { useState, useEffect } from 'react';
import { Save, User, Mail, Phone, MapPin, Building } from 'lucide-react';

const ProfileSettings = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        company: '',
        taxId: '',
        preferredLanguage: 'en',
        timeZone: 'UTC',
        notifications: {
            email: true,
            sms: false,
            marketing: true
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                // API call would go here
                const response = await fetch('/api/profile');
                const data = await response.json();
                setFormData(data);
            } catch (err) {
                setError('Failed to load profile data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');
        setSuccess('');

        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess('Profile updated successfully');
        } catch (err) {
            setError('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A0DC]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>

            {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded text-red-500">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded text-green-500">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-200">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-200">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Address
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200">
                                Address Line 1
                            </label>
                            <input
                                type="text"
                                name="address1"
                                value={formData.address1}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">
                                Address Line 2
                            </label>
                            <input
                                type="text"
                                name="address2"
                                value={formData.address2}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200">
                                    State/Province
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200">
                                    ZIP/Postal Code
                                </label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200">
                                    Country
                                </label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                                >
                                    <option value="">Select a country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="UK">United Kingdom</option>
                                    {/* Add more countries as needed */}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Information */}
                <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <Building className="h-5 w-5 mr-2" />
                        Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-200">
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">
                                Tax ID/SSN
                            </label>
                            <input
                                type="text"
                                name="taxId"
                                value={formData.taxId}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">
                        Preferences
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200">
                                Preferred Language
                            </label>
                            <select
                                name="preferredLanguage"
                                value={formData.preferredLanguage}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200">
                                Time Zone
                            </label>
                            <select
                                name="timeZone"
                                value={formData.timeZone}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-600 bg-white/5 text-white focus:border-[#00A0DC] focus:ring-[#00A0DC]"
                            >
                                <option value="UTC">UTC</option>
                                <option value="EST">Eastern Time</option>
                                <option value="CST">Central Time</option>
                                <option value="PST">Pacific Time</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">
                        Notification Preferences
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="notifications.email"
                                checked={formData.notifications.email}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-600 text-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                            <label className="ml-2 block text-sm text-gray-200">
                                Email Notifications
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="notifications.sms"
                                checked={formData.notifications.sms}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-600 text-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                            <label className="ml-2 block text-sm text-gray-200">
                                SMS Notifications
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="notifications.marketing"
                                checked={formData.notifications.marketing}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-600 text-[#00A0DC] focus:ring-[#00A0DC]"
                            />
                            <label className="ml-2 block text-sm text-gray-200">
                                Marketing Communications
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00A0DC] hover:bg-[#008DC3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A0DC] disabled:opacity-50"
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-5 w-5 mr-2" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings; 