// GoogleSignIn.js
import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get user's profile photo URL from Google
      const photoURL = user.photoURL;

      // Save user data to Firestore (including the profile photo URL)
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: photoURL,
      });

      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Signing In..." : "Sign In with Google"}
      </button>
    </div>
  );
};

export default GoogleSignIn;
