import React from 'react';
import { auth } from '../firebase/firebase-config'; // Import your Firebase config
import UserProfilepic from './UserProfilepic'; // Import the UserProfilepic component

const defaultAvatars = [
    "https://placekitten.com/100/100",
    "https://place-puppy.com/100x100",
    "https://randomfox.ca/images/1.jpg",
    "https://loremflickr.com/100/100/hamster",
    "https://loremflickr.com/100/100/dog",
];

const TweetAvatar = ({ tweetUserId, tweetPhotoURL }) => {
    const currentUser = auth.currentUser;
    const isUserTweet = tweetUserId === currentUser?.uid; // Check if this tweet belongs to the current user

    // Determine the avatar to show
    const avatar = tweetPhotoURL && tweetPhotoURL !== "" 
        ? tweetPhotoURL
        : defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    return (
        <div className={isUserTweet ? "border-2 border-blue-500" : ""}> {/* Optionally add a border if it's the current user's tweet */}
            {isUserTweet ? (
                <UserProfilepic size="small" />  // Use UserProfilepic component for the current user's avatar
            ) : (
                <img
                    src={avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
            )}
        </div>
    );
};

export default TweetAvatar;
