import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
const SignIn = () => {

 const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //User to data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      console.log("User signed in with Google and data saved to Firestore!");
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="https://static.vecteezy.com/system/resources/thumbnails/000/585/256/small/011-29.jpg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Get Started with Eskiwi
        </h2>
        
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <button 
      onClick={handleGoogleSignIn} 
      className="flex items-center justify-center w-full max-w-xs py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-600 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <img 
        src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw" 
        className="w-5 h-5 mr-2"
      />
      Sign in with Google
    </button>
    <button 
          onClick={handleSignOut} 
          className="mt-4 flex items-center justify-center w-full max-w-xs py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-red-500 text-white font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Out
    </button>


      </div>
    </div>
  );
};

export default SignIn;
