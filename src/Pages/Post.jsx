import React from "react";
import TweetComposer from "../components/TweetComposer";

const Post = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 pt-6 pb-20">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-bold mb-4">Post a Tweet</h2>
                <TweetComposer />
            </div>
        </div>
    );
};

export default Post;
