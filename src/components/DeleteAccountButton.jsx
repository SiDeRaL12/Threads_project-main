// components/DeleteAccountButton.jsx
import React from "react";
import { getAuth, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

const DeleteAccountButton = () => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("No user is currently signed in.");
      return;
    }

    try {
      // Delete Firestore user data
      await deleteDoc(doc(db, "users", user.uid));

      // Delete the auth user
      await deleteUser(user);

      alert("Account deleted successfully.");
      navigate("/signin");
    } catch (error) {
      console.error("Error deleting account:", error);
      if (error.code === "auth/requires-recent-login") {
        alert("Please log in again to delete your account.");
        navigate("/signin");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <button
      onClick={handleDeleteAccount}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
    >
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
