import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const EditProfile = () => {
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setUsername(data.username || "");
          setBio(data.bio || "");
          setPhotoURL(data.photoURL || "");
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        username,
        bio,
        photoURL,
      });

      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div>
        <label className="block font-medium mb-1">Username</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Bio</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Profile Picture URL</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>

      {success && <p className="text-green-600 dark:text-green-400 mt-2">{success}</p>}
    </form>
  );
};

export default EditProfile;
