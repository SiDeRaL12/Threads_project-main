import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const UserProfilepic = () => {
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = getAuth().currentUser;

      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const data = userSnapshot.data();
          setPhotoURL(data.photoURL || user.photoURL); // Fallback to Google photo if no Firestore photo
        } else {
          setPhotoURL(user.photoURL); // Use Google profile photo if no Firestore photo
        }
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, []);  // Empty dependency array to only run once on mount



  return (
    <div>
      {photoURL ? (
        <img src={photoURL} alt="User Profile" className="w-8 h-8 rounded-full" />
      ) : (
        <p>No profile picture set.</p>
      )}
    </div>
  );
};

export default UserProfilepic;
