import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config.js";
import { setDoc, doc } from "firebase/firestore";

const SignUp = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      console.log("User signed in with Google and data saved to Firestore!");
      navigate("/home");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Google Sign-In failed.");
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
      });

      console.log("User created and saved to Firestore!");
      navigate("/home");
    } catch (err) {
      console.error("Error during sign up:", err);
      setError(err.message);
    }
  };

  return (
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
        <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl  bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
          <div className="flex flex-col items-center">
            <img
                className="w-12 h-12 mb-4"
                src="https://static.vecteezy.com/system/resources/thumbnails/000/585/256/small/011-29.jpg"
                alt="Logo"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Create an account
            </h2>

            <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full mb-3 py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white"
            >
              <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button>

            <button
                onClick={() => setShowEmailForm(!showEmailForm)}
                className="flex items-center justify-center w-full mb-3 py-2 px-4 border border-gray-300 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-600 dark:text-white"
            >
              <img
                  src="https://img.icons8.com/?size=200&id=mtfWz20b5AxB&format=png&color=000000"
                  alt="Email"
                  className="w-5 h-5 mr-2"
              />
              Sign up with Email
            </button>

            {showEmailForm && (
                <form onSubmit={handleEmailSignUp} className="w-full mt-4 space-y-4 transition-all duration-300 ease-in-out">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
                    <input
                        type="email"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-700 dark:text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
                    <input
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">Confirm Password</label>
                    <input
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                  </div>
                  <button
                      type="submit"
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create Account
                  </button>
                  {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                </form>
            )}

            <p className="mt-6 text-sm text-gray-600 dark:text-gray-300 text-center">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 hover:underline dark:text-blue-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
  );
};

export default SignUp;
