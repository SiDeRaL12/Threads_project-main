// EmailSignUp.js
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EmailSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload profile picture to Firebase Storage if there is one
      let photoURL = "";
      if (file) {
        const storageRef = ref(storage, `profile_pics/${user.uid}`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      }

      // Save user data (including photo URL if uploaded) to Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: displayName,
        email: email,
        photoURL: photoURL || "", // Default to an empty string if no picture
      });

      console.log("User signed up:", user);
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 w-full rounded"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default EmailSignUp;
