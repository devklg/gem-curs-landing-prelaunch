import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

const ProfilePicture = () => {
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                setError('File size must be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!preview) return;

        setIsUploading(true);
        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Success message or callback
        } catch (err) {
            setError('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Profile Picture</h3>
                {preview && (
                    <button
                        onClick={handleRemove}
                        className="text-red-400 hover:text-red-300 flex items-center"
                    >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                    </button>
                )}
            </div>

            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile preview"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
                            <Camera className="h-12 w-12 text-gray-400" />
                        </div>
                    )}
                </div>

                {error && (
                    <div className="text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex space-x-4">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center px-4 py-2 border border-gray-600 rounded-md text-white hover:bg-white/5"
                    >
                        <Camera className="h-5 w-5 mr-2" />
                        Choose Photo
                    </button>

                    {preview && (
                        <button
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="flex items-center px-4 py-2 bg-[#00A0DC] rounded-md text-white hover:bg-[#008DC3] disabled:opacity-50"
                        >
                            {isUploading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="h-5 w-5 mr-2" />
                                    Upload Photo
                                </>
                            )}
                        </button>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />

                <p className="text-sm text-gray-400">
                    Supported formats: JPG, PNG. Max file size: 5MB
                </p>
            </div>
        </div>
    );
};

export default ProfilePicture; 