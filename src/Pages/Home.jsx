import React, { useState } from "react";
import TweetComposer from "../components/TweetComposer";
import MoodFilterBar from "../components/MoodFilter";
import TweetFeed from "../components/TweetFeed";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
    const [selectedMood, setSelectedMood] = useState("All");

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Home</h1>
                    <ThemeToggle />
                </header>

                <MoodFilterBar selectedMood={selectedMood} onMoodChange={setSelectedMood} />

                <TweetFeed selectedMood={selectedMood} />
            </div>
        </div>
    );
};

export default Home;
