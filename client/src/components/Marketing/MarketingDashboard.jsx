import React, { useState, useEffect } from 'react';
import { Megaphone, Mail, Share2, Users, TrendingUp, Target } from 'lucide-react';

const MarketingDashboard = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                // API call would go here
                await new Promise(resolve => setTimeout(resolve, 1000));
                setCampaigns([
                    {
                        id: 1,
                        name: "Spring Promotion",
                        type: "email",
                        status: "active",
                        reach: 1500,
                        engagement: 25.4,
                        conversions: 45
                    },
                    {
                        id: 2,
                        name: "Social Media Blast",
                        type: "social",
                        status: "scheduled",
                        reach: 2800,
                        engagement: 18.7,
                        conversions: 32
                    }
                    // Add more mock campaigns
                ]);
                setIsLoading(false);
            } catch (err) {
                console.error('Failed to fetch campaigns:', err);
                setIsLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const stats = [
        {
            title: 'Total Reach',
            value: '12.5K',
            change: '+22%',
            icon: Users
        },
        {
            title: 'Engagement Rate',
            value: '24.8%',
            change: '+5.3%',
            icon: TrendingUp
        },
        {
            title: 'Conversion Rate',
            value: '3.2%',
            change: '+1.1%',
            icon: Target
        }
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A0DC]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center">
                    <Megaphone className="h-6 w-6 mr-2" />
                    Marketing Dashboard
                </h2>
                <div className="flex space-x-2">
                    {['week', 'month', 'quarter'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedPeriod === period
                                    ? 'bg-[#00A0DC] text-white'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">{stat.title}</p>
                                <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
                            </div>
                            <stat.icon className="h-8 w-8 text-[#00A0DC]" />
                        </div>
                        <div className="mt-4">
                            <span className="text-green-500 text-sm">{stat.change}</span>
                            <span className="text-gray-400 text-sm ml-2">vs last {selectedPeriod}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Active Campaigns</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-600">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Campaign
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Reach
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Engagement
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Conversions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                            {campaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-white/20">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                        {campaign.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.reach}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.engagement}%
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.conversions}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MarketingDashboard; 