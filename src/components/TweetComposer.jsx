import React, { useState } from "react";
import { db, auth, storage } from "../firebase/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";

const TweetComposer = () => {
    const [text, setText] = useState("");
    const [mood, setMood] = useState("All");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || !text.trim()) return;

        let imageUrl = null;

        try {
            if (image) {
                const imageRef = ref(storage, `tweet_images/${uuidv4()}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            await addDoc(collection(db, "tweets"), {
                text,
                mood,
                imageUrl,
                userId: user.uid,
                userEmail: user.email,
                createdAt: serverTimestamp(),
                likes: [],
                isRetweet: false,
            });

            // Reset state and redirect
            setText("");
            setImage(null);
            setMood("All");
            navigate("/home");

        } catch (error) {
            console.error("Tweet post failed:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white resize-none"
          rows={3}
      />

            <div className="flex gap-2 items-center">
                <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                    <option value="All">All</option>
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Motivated">Motivated</option>
                    <option value="Excited">Excited</option>
                    <option value="Angry">Angry</option>
                </select>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="text-sm text-gray-600 dark:text-gray-300"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                    title="Send"
                >
                    <Send size={18} />
                </button>
            </div>
        </form>
    );
};

export default TweetComposer;
