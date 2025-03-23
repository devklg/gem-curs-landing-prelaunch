import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, PieChart, TrendingUp, Users, DollarSign, Award } from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const TeamAnalytics = () => {
    const [timeframe, setTimeframe] = useState('month');
    const [isLoading, setIsLoading] = useState(true);
    const [analyticsData, setAnalyticsData] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // API call would go here
                await new Promise(resolve => setTimeout(resolve, 1000));
                setAnalyticsData({
                    teamGrowth: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Team Size',
                            data: [120, 145, 178, 205, 242, 289],
                            borderColor: '#00A0DC',
                            tension: 0.4
                        }]
                    },
                    salesPerformance: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Team Sales',
                            data: [45000, 52000, 61000, 58000, 72000, 85000],
                            backgroundColor: '#00A0DC',
                        }]
                    },
                    rankDistribution: {
                        labels: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'],
                        datasets: [{
                            data: [30, 25, 20, 15, 10],
                            backgroundColor: [
                                '#CD7F32',
                                '#C0C0C0',
                                '#FFD700',
                                '#E5E4E2',
                                '#B9F2FF'
                            ]
                        }]
                    }
                });
                setIsLoading(false);
            } catch (err) {
                console.error('Failed to fetch analytics data:', err);
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [timeframe]);

    const statsCards = [
        {
            title: 'Total Team Members',
            value: '289',
            change: '+18.5%',
            icon: Users,
            color: 'text-blue-500'
        },
        {
            title: 'Monthly Sales',
            value: '$85,000',
            change: '+12.3%',
            icon: DollarSign,
            color: 'text-green-500'
        },
        {
            title: 'Average Rank',
            value: 'Gold',
            change: '+1 level',
            icon: Award,
            color: 'text-yellow-500'
        },
        {
            title: 'Growth Rate',
            value: '15.8%',
            change: '+2.4%',
            icon: TrendingUp,
            color: 'text-purple-500'
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
                    <LineChart className="h-6 w-6 mr-2" />
                    Team Analytics
                </h2>
                <div className="flex space-x-2">
                    {['week', 'month', 'quarter', 'year'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setTimeframe(period)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${timeframe === period
                                    ? 'bg-[#00A0DC] text-white'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">{card.title}</p>
                                <p className="text-2xl font-semibold text-white mt-1">{card.value}</p>
                            </div>
                            <card.icon className={`h-8 w-8 ${card.color}`} />
                        </div>
                        <div className="mt-4">
                            <span className={`text-sm ${card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {card.change}
                            </span>
                            <span className="text-gray-400 text-sm ml-2">vs last {timeframe}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Team Growth</h3>
                    <div className="h-80">
                        <Line
                            data={analyticsData.teamGrowth}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            color: 'rgba(255, 255, 255, 0.1)'
                                        },
                                        ticks: {
                                            color: 'rgba(255, 255, 255, 0.7)'
                                        }
                                    },
                                    x: {
                                        grid: {
                                            color: 'rgba(255, 255, 255, 0.1)'
                                        },
                                        ticks: {
                                            color: 'rgba(255, 255, 255, 0.7)'
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: 'rgba(255, 255, 255, 0.7)'
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Sales Performance</h3>
                    <div className="h-80">
                        <Bar
                            data={analyticsData.salesPerformance}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            color: 'rgba(255, 255, 255, 0.1)'
                                        },
                                        ticks: {
                                            color: 'rgba(255, 255, 255, 0.7)'
                                        }
                                    },
                                    x: {
                                        grid: {
                                            color: 'rgba(255, 255, 255, 0.1)'
                                        },
                                        ticks: {
                                            color: 'rgba(255, 255, 255, 0.7)'
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: 'rgba(255, 255, 255, 0.7)'
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Rank Distribution</h3>
                <div className="h-80">
                    <Pie
                        data={analyticsData.rankDistribution}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'right',
                                    labels: {
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamAnalytics; 