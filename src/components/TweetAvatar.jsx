import React from "react";
import { auth } from "../firebase/firebase-config"; // Firebase authentication
import TweetAvatarPic from "./TweetAvatarPic"; // Import the TweetAvatarPic component

const TweetAvatar = ({ tweetUserId, tweetPhotoURL }) => {
  const currentUser = auth.currentUser; // Get the current logged-in user
  const isUserTweet = tweetUserId === currentUser?.uid; // Check if this tweet belongs to the current user

  // Debugging: log the current user info and tweet photo URL
  console.log("Current User:", currentUser);
  console.log("Tweet Photo URL:", tweetPhotoURL);

  return (
    <div>
      {/* If it's the current user's tweet, show their profile picture */}
      {isUserTweet ? (
        <TweetAvatarPic size="small" userPhotoURL={currentUser?.photoURL} />
      ) : (
        // Otherwise, show the tweet author's profile picture (could be the Google URL you mentioned)
        <TweetAvatarPic size="small" userPhotoURL={tweetPhotoURL || ""} />
      )}
    </div>
  );
};

export default TweetAvatar;
