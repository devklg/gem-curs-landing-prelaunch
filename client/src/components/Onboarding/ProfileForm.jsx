import React, { useState } from 'react';

const ProfileForm = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        dateOfBirth: '',
        taxId: '',
        companyName: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.address1) newErrors.address1 = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP Code is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // API call would go here
                onComplete(formData);
            } catch (error) {
                setErrors({ submit: error.message });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        Address Line 1
                    </label>
                    <input
                        type="text"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/5 text-white ${errors.address1 ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.address1 && (
                        <p className="mt-1 text-sm text-red-500">{errors.address1}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        Address Line 2 (Optional)
                    </label>
                    <input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/5 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/5 text-white ${errors.city ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.city && (
                        <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
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
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/5 text-white ${errors.state ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.state && (
                        <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        ZIP/Postal Code
                    </label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/5 text-white ${errors.zipCode ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        Country
                    </label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/5 text-white ${errors.country ? 'border-red-500' : ''
                            }`}
                    >
                        <option value="">Select a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        {/* Add more countries as needed */}
                    </select>
                    {errors.country && (
                        <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/5 text-white ${errors.phone ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/5 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        Tax ID/SSN (Optional)
                    </label>
                    <input
                        type="text"
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/5 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        Company Name (Optional)
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/5 text-white"
                    />
                </div>
            </div>

            {errors.submit && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500 rounded-md text-red-500">
                    {errors.submit}
                </div>
            )}

            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00A0DC] hover:bg-[#008DC3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save Profile Information
                </button>
            </div>
        </form>
    );
};

export default ProfileForm; 