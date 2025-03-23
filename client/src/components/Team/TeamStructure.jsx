import React, { useState, useEffect } from 'react';
import { Users, ChevronRight, ChevronDown, Search, Filter } from 'lucide-react';

const TeamMember = ({ member, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="ml-4">
            <div className={`flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors
                ${level === 0 ? 'bg-white/10' : ''}`}>
                {member.downline?.length > 0 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mr-2 text-gray-400 hover:text-white"
                    >
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                )}
                <div className="flex-1">
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#00A0DC] flex items-center justify-center">
                            {member.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <p className="text-white font-medium">{member.name}</p>
                            <p className="text-sm text-gray-400">ID: {member.userId}</p>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-white font-medium">{member.rank}</p>
                    <p className="text-sm text-gray-400">{member.joinDate}</p>
                </div>
            </div>
            {isExpanded && member.downline?.map((downlineMember, index) => (
                <TeamMember
                    key={downlineMember.userId}
                    member={downlineMember}
                    level={level + 1}
                />
            ))}
        </div>
    );
};

const TeamStructure = () => {
    const [teamData, setTeamData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('all');

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                // Simulated API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                const mockData = {
                    name: "John Doe",
                    userId: "JD001",
                    rank: "Diamond",
                    joinDate: "2024-01-15",
                    downline: [
                        {
                            name: "Alice Smith",
                            userId: "AS002",
                            rank: "Gold",
                            joinDate: "2024-02-01",
                            downline: [
                                {
                                    name: "Bob Wilson",
                                    userId: "BW003",
                                    rank: "Silver",
                                    joinDate: "2024-02-15",
                                    downline: []
                                }
                            ]
                        },
                        {
                            name: "Carol Johnson",
                            userId: "CJ004",
                            rank: "Gold",
                            joinDate: "2024-02-05",
                            downline: []
                        }
                    ]
                };
                setTeamData(mockData);
            } catch (err) {
                setError('Failed to fetch team data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A0DC]"></div>
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
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    Team Structure
                </h2>

                <div className="flex space-x-4">
                    <div className="relative">
                        <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search team members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#00A0DC]"
                        />
                    </div>

                    <select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-gray-600 text-white focus:outline-none focus:border-[#00A0DC]"
                    >
                        <option value="all">All Ranks</option>
                        <option value="diamond">Diamond</option>
                        <option value="gold">Gold</option>
                        <option value="silver">Silver</option>
                    </select>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden">
                {teamData && <TeamMember member={teamData} />}
            </div>
        </div>
    );
};

export default TeamStructure; 