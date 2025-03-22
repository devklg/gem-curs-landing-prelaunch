import React from 'react';
import { Link } from 'react-router-dom';
import {
    Home, Package, User, Crown,
    Trophy, HelpCircle, Book, LogOut
} from 'lucide-react';

const DashboardSidebar = () => {
    return (
        <aside className="fixed w-[210px] h-full bg-white shadow-lg">
            <div className="p-4">
                <img
                    src="/talk-fusion-logo.svg"
                    alt="Talk Fusion"
                    className="w-[210px] h-[54px]"
                />
            </div>

            <div className="px-4 py-2">
                <div id="google_translate_element" className="w-[157px] h-[26px]" />
            </div>

            <nav className="mt-6">
                <SidebarLink icon={<Home />} label="Home" to="/home" />
                <SidebarLink icon={<Package />} label="Product" to="/shop" />
                <SidebarLink icon={<User />} label="My Info" to="/profile" />
                <SidebarLink icon={<Crown />} label="My Enroller" to="/enrollers" />
                <SidebarLink icon={<Trophy />} label="Leaderboard" to="/leaderboard" />
                <SidebarLink icon={<HelpCircle />} label="FAQ" to="/faqs" />
                <SidebarLink icon={<Book />} label="Contact Us" to="/contacts" />
                <SidebarLink icon={<LogOut />} label="Logout" to="/logout" />
            </nav>

            <LiveCallSection />
            <RecentEnrolleesSection />
            <SidebarFooter />
        </aside>
    );
};

const SidebarLink = ({ icon, label, to }) => (
    <Link
        to={to}
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
        {icon}
        <span className="ml-2">{label}</span>
    </Link>
);

const LiveCallSection = () => (
    <div className="mt-6 p-4">
        <div className="bg-gray-50 rounded-lg p-4 h-[220px]">
            <h3 className="font-semibold mb-2">Next Live Call</h3>
            <button className="w-full bg-[#00A0DC] text-white rounded py-2">
                Watch Presentation
            </button>
        </div>
    </div>
);

const RecentEnrolleesSection = () => (
    <div className="mt-6 p-4">
        <div className="bg-gray-50 rounded-lg p-4 h-[560px]">
            <h3 className="font-semibold mb-2">Recent Pre-enrollees</h3>
            {/* Add enrollee list here */}
        </div>
    </div>
);

const SidebarFooter = () => (
    <div className="p-4 text-sm text-gray-600">
        <div className="space-y-2">
            <a href="/payplan" className="block hover:text-[#00A0DC]">Affiliate Compensation Plan</a>
            <a href="/privacy-policy" className="block hover:text-[#00A0DC]">Privacy Policy</a>
            <a href="/terms" className="block hover:text-[#00A0DC]">Terms And Conditions</a>
            <a href="/refund-policy" className="block hover:text-[#00A0DC]">Refund Policy</a>
        </div>
    </div>
);

export default DashboardSidebar; 