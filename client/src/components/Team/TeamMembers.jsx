import React, { useState, useEffect } from 'react';
import { Users, Filter, Download, ChevronDown } from 'lucide-react';

const TeamMembers = () => {
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('name');
    const [filterRank, setFilterRank] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // API call would go here
                await new Promise(resolve => setTimeout(resolve, 1000));
                setMembers([
                    {
                        id: 1,
                        name: "Alice Smith",
                        userId: "AS456",
                        rank: "Gold",
                        joinDate: "2024-01-15",
                        personalSales: 12500,
                        teamSales: 45000,
                        status: "active"
                    },
                    // Add more mock data as needed
                ]);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch team members');
                setIsLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const handleSort = (field) => {
        setSortBy(field);
        // Implement sorting logic
    };

    const handleFilter = (rank) => {
        setFilterRank(rank);
        setCurrentPage(1);
    };

    const handleExport = () => {
        // Implement export logic
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A0DC]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4 bg-red-500/10 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    Team Members
                </h2>
                <div className="flex space-x-4">
                    <div className="relative">
                        <button
                            className="flex items-center px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20"
                            onClick={() => {/* Toggle filter menu */ }}
                        >
                            <Filter className="h-5 w-5 mr-2" />
                            Filter
                            <ChevronDown className="h-4 w-4 ml-2" />
                        </button>
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center px-4 py-2 bg-[#00A0DC] rounded-lg text-white hover:bg-[#008DC3]"
                    >
                        <Download className="h-5 w-5 mr-2" />
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-600">
                    <thead className="bg-white/5">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Member
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Join Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Personal Sales
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Team Sales
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                        {members.map((member) => (
                            <tr key={member.id} className="hover:bg-white/5">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={`https://via.placeholder.com/40`}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-white">
                                                {member.name}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {member.userId}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#00A0DC]/20 text-[#00A0DC]">
                                        {member.rank}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {member.joinDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    ${member.personalSales.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    ${member.teamSales.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {member.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamMembers; 