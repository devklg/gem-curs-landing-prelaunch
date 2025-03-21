import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enrollmentService } from '../services/api';

const PreEnrollmentForm = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        sponsorName: '',
        package: ''
    });

    const packages = [
        {
            id: 'Entry Pack',
            name: 'Entry Pack',
            price: '$175',
            description: 'Perfect for getting started with Talk Fusion',
            features: [
                'Basic business tools',
                '100 Personal Volume (PV)',
                '$50 Fast Start Bonus',
                'Essential training materials'
            ]
        },
        {
            id: 'Elite Pack',
            name: 'Elite Pack',
            price: '$350',
            description: 'Enhanced package for serious entrepreneurs',
            features: [
                'Advanced business tools',
                '200 Personal Volume (PV)',
                '$100 Fast Start Bonus',
                'Premium training materials',
                'Priority support'
            ]
        },
        {
            id: 'Pro Pack',
            name: 'Pro Pack',
            price: '$700',
            description: 'Complete package for professional success',
            features: [
                'Full suite of business tools',
                '400 Personal Volume (PV)',
                '$200 Fast Start Bonus',
                'VIP training materials',
                '24/7 priority support',
                'Exclusive marketing resources'
            ]
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePackageSelect = (packageId) => {
        setFormData(prev => ({
            ...prev,
            package: packageId
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (!formData.package) {
                throw new Error('Please select a package to continue');
            }

            // Transform form data to match backend expectations
            const enrollmentData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                enrollerId: formData.sponsorName || null
            };

            const response = await enrollmentService.submitPreEnrollment(enrollmentData);

            if (response.token) {
                localStorage.setItem('token', response.token);
            }

            navigate('/thank-you');
        } catch (error) {
            setError(error.message || 'An error occurred during pre-enrollment. Please try again.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-primary text-white py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Pre-Enrollment Form
                    </h1>

                    {error && (
                        <div className="mb-8 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-md">
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Enroller Name
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="sponsorName"
                                value={formData.sponsorName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-300">Select Your Package</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {packages.map((pkg) => (
                                    <div
                                        key={pkg.id}
                                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${formData.package === pkg.id
                                            ? 'border-blue-500 bg-blue-500/10'
                                            : 'border-gray-600 hover:border-gray-500'
                                            }`}
                                        onClick={() => handlePackageSelect(pkg.id)}
                                    >
                                        <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
                                        <p className="text-2xl font-bold text-yellow-400 mb-2">{pkg.price}</p>
                                        <p className="text-sm text-gray-300 mb-3">{pkg.description}</p>
                                        <ul className="text-sm text-gray-400 space-y-1">
                                            {pkg.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Pre-Enrollment'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PreEnrollmentForm; 