import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const defaultAvatars = [
  "https://placekitten.com/100/100",
  "https://place-puppy.com/100x100",
  "https://randomfox.ca/images/1.jpg",
  "https://loremflickr.com/100/100/hamster",
  "https://loremflickr.com/100/100/dog",
];

const UserProfilepic = ({ size = "small" }) => {
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const data = userSnapshot.data();
            setPhotoURL(data.photoURL || user.photoURL);
          } else {
            setPhotoURL(user.photoURL);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const imgClass = size === "small" ? "w-8 h-8" : "w-24 h-24"; // Modify for larger size on profile

  // If no photoURL, pick a random avatar
  const avatarToUse = photoURL || defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

  return (
    <div>
      <img
        src={avatarToUse} // Use the random avatar if no photoURL
        alt="User Profile"
        className={`${imgClass} rounded-full object-cover border border-gray-300`}
        onError={() => console.error("Error loading profile picture:", avatarToUse)}
      />
    </div>
  );
};

export default UserProfilepic;
