import React from "react";
import { NavLink } from "react-router-dom";
import {
    Home,
    HomeIcon,
    Search,
    SearchIcon,
    Plus,
    User,
    UserIcon,
    Settings,
    SettingsIcon,
    Send,
} from "lucide-react";

const tabs = [
    { to: "/home", label: "Home", icon: <Home size={20} />, filled: <HomeIcon size={20} /> },
    { to: "/search", label: "Search", icon: <Search size={20} />, filled: <SearchIcon size={20} /> },
    { to: "/post", label: "Post", icon: <Plus size={20} />, filled: <Send size={20} /> },
    { to: "/profile", label: "Profile", icon: <User size={20} />, filled: <UserIcon size={20} /> },
    { to: "/Settings", label: "Settings", icon: <Settings size={20} />, filled: <SettingsIcon size={20} /> },
];

const BottomNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="max-w-2xl mx-auto flex justify-around py-2 px-4">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.to}
                        to={tab.to}
                        className={({ isActive }) =>
                            `flex flex-col items-center text-xs ${
                                isActive
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-500 dark:text-gray-400"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive ? tab.filled : tab.icon}
                                <span className="hidden sm:block text-[10px] mt-1">{tab.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
