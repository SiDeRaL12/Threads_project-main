import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import UserProfilepic from "../components/UserProfilepic";
import DeleteAccountButton from "../components/DeleteAccountButton";

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const navigate = useNavigate();

    const handleNotificationToggle = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };


    const handleLogout = () => {
        console.log("User logged out");

        navigate("/signin");
    };

    return (
        <div className="py-6 px-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <div className="max-w-2xl mx-auto flex flex-col gap-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <UserProfilepic size="small" />
                </header>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                    <span>Dark Mode</span>
                    <ThemeToggle />
                </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between">
                    <span>Notifications</span>
                    <button
                        onClick={handleNotificationToggle}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                            notificationsEnabled
                                ? "bg-green-500 text-white"
                                : "bg-gray-300 text-gray-700"
                        }`}
                    >
                        {notificationsEnabled ? "Enabled" : "Disabled"}
                    </button>
                </div>

                {/* Logout Button */}
                <div className="flex justify-between">
                    <button
                        onClick={handleLogout}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Delete Account Button */}
                <div className="flex justify-between">
                    <DeleteAccountButton />
                </div>

            </div>
        </div>
    );
};

export default Settings;
