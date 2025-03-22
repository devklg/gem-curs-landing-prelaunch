import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    Users,
    BarChart2,
    Settings,
    HelpCircle,
    Mail,
    FileText,
    Calendar,
    MessageSquare,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

const DashboardNav = () => {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState({
        team: false,
        marketing: false,
        reports: false
    });

    const navigationItems = [
        { path: '/dashboard', icon: Home, label: 'Dashboard' },
        {
            id: 'team',
            icon: Users,
            label: 'Team',
            subItems: [
                { path: '/dashboard/team/structure', label: 'Team Structure' },
                { path: '/dashboard/team/members', label: 'Team Members' },
                { path: '/dashboard/team/analytics', label: 'Analytics' }
            ]
        },
        {
            id: 'marketing',
            icon: Mail,
            label: 'Marketing',
            subItems: [
                { path: '/dashboard/marketing/social', label: 'Social Media' },
                { path: '/dashboard/marketing/email', label: 'Email Templates' },
                { path: '/dashboard/marketing/leads', label: 'Lead Management' }
            ]
        },
        {
            id: 'reports',
            icon: FileText,
            label: 'Reports',
            subItems: [
                { path: '/dashboard/reports/commission', label: 'Commission' },
                { path: '/dashboard/reports/sales', label: 'Sales' },
                { path: '/dashboard/reports/performance', label: 'Performance' }
            ]
        },
        { path: '/dashboard/calendar', icon: Calendar, label: 'Calendar' },
        { path: '/dashboard/support', icon: MessageSquare, label: 'Support' },
        { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
        { path: '/dashboard/help', icon: HelpCircle, label: 'Help Center' }
    ];

    const toggleMenu = (menuId) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    const isActive = (path) => location.pathname === path;

    const renderNavItem = (item) => {
        const Icon = item.icon;

        if (item.subItems) {
            return (
                <div key={item.id}>
                    <button
                        onClick={() => toggleMenu(item.id)}
                        className="w-full flex items-center justify-between p-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <div className="flex items-center">
                            <Icon className="h-5 w-5 mr-3" />
                            <span>{item.label}</span>
                        </div>
                        {expandedMenus[item.id] ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                    {expandedMenus[item.id] && (
                        <div className="ml-6 mt-2 space-y-2">
                            {item.subItems.map((subItem) => (
                                <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`block p-2 text-sm rounded-lg transition-colors ${
                                        isActive(subItem.path)
                                            ? 'bg-[#00A0DC] text-white'
                                            : 'text-gray-400 hover:bg-white/10'
                                    }`}
                                >
                                    {subItem.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                        ? 'bg-[#00A0DC] text-white'
                        : 'text-gray-300 hover:bg-white/10'
                }`}
            >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
            </Link>
        );
    };

    return (
        <nav className="w-64 bg-gray-900 h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="p-4">
                <div className="mb-8">
                    <img
                        src="/logo.svg"
                        alt="Talk Fusion"
                        className="h-8 w-auto"
                    />
                </div>
                <div className="space-y-2">
                    {navigationItems.map(renderNavItem)}
                </div>
            </div>
        </nav>
    );
};

export default DashboardNav; 