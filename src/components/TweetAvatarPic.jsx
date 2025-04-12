import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config"; // Firebase auth
import { db } from "../firebase/firebase-config"; // Firestore
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

const defaultAvatars = [
  "https://placekitten.com/100/100",
  "https://place-puppy.com/100x100",
  "https://randomfox.ca/images/1.jpg",
  "https://loremflickr.com/100/100/hamster",
  "https://loremflickr.com/100/100/dog",
];

const TweetAvatarPic = ({ userPhotoURL, size = "small" }) => {
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the passed userPhotoURL exists, use it directly
    if (userPhotoURL) {
      setPhotoURL(userPhotoURL);
      setLoading(false);
    } else {
      // If no userPhotoURL passed, fetch the user’s custom photoURL from Firestore
      const currentUser = auth.currentUser;
      if (currentUser) {
        const fetchUserPhoto = async () => {
          try {
            const userDoc = doc(db, "users", currentUser.uid);
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
              const data = userSnapshot.data();
              // Use custom Firestore photoURL, or fallback to Firebase default if not set
              setPhotoURL(data.photoURL || currentUser.photoURL);
            } else {
              // Use Firebase default if user does not have a document in Firestore
              setPhotoURL(currentUser.photoURL);
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
          setLoading(false);
        };

        fetchUserPhoto();
      }
    }
  }, [userPhotoURL]); // Re-run if userPhotoURL prop changes

  if (loading) {
    return <p>Loading...</p>;
  }

  // Fallback to random avatar if no valid photoURL found
  const finalPhotoURL = photoURL || defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

  const imgClass = size === "small" ? "w-8 h-8" : "w-24 h-24"; // Size for avatar

  return (
    <img
      src={finalPhotoURL}
      alt="Avatar"
      className={`${imgClass} rounded-full object-cover`}
    />
  );
};

export default TweetAvatarPic;
