import React from 'react';
import DashboardNav from './DashboardNav';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <DashboardSidebar />
            <div className="flex-1 ml-[210px]">
                <DashboardNav />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout; 