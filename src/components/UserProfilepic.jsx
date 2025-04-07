import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";

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

  return (
    <div>
      {photoURL ? (
       <img
       src={photoURL}
       alt="User Profile"
       className={`${imgClass} rounded-full object-cover`}
     />
     
      ) : (
        <p>No profile picture set.</p>
      )}
    </div>
  );
};

export default UserProfilepic;