import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const UserName = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const data = userSnapshot.data();
            setUserName(data.name || user.displayName); 
          } else {
            setUserName(user.displayName); 
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return <span className="font-semibold">{userName}</span>;
};

export default UserName;
