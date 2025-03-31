import React, { useState, useEffect } from "react";
import {
    Heart,
    HeartIcon,
    MessageCircle,
    Repeat2,
    Send,
} from "lucide-react";
import {
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    addDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase-config";
import CommentCard from "./CommentCard.jsx";

const defaultAvatars = [
    "https://placekitten.com/100/100",
    "https://place-puppy.com/100x100",
    "https://randomfox.ca/images/1.jpg",
    "https://loremflickr.com/100/100/hamster",
    "https://loremflickr.com/100/100/dog",
];

const TweetCard = ({ tweet, tweetId }) => {
    const userId = auth.currentUser?.uid;
    const email = tweet.userEmail || "unknown@thread.app";
    const username = email.split("@")[0]?.replace(/[.\s-]/g, "_");
    const avatar =
        tweet.photoURL ||
        defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    const [likes, setLikes] = useState(tweet.likes || []);
    const [liked, setLiked] = useState(likes.includes(userId));
    const [showComments, setShowComments] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);
    const [hasRetweeted, setHasRetweeted] = useState(false);
    const [retweetCount, setRetweetCount] = useState(0);

    // 🧠 Real-time comment updates
    useEffect(() => {
        const commentsRef = collection(db, `tweets/${tweetId}/comments`);
        const unsub = onSnapshot(commentsRef, (snap) => {
            const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setComments(list);
        });
        return () => unsub();
    }, [tweetId]);

    // ✅ Check if user has retweeted
    useEffect(() => {
        const checkRetweet = async () => {
            const q = query(
                collection(db, "tweets"),
                where("isRetweet", "==", true),
                where("originalTweetId", "==", tweetId),
                where("userId", "==", userId)
            );
            const snapshot = await getDocs(q);
            setHasRetweeted(!snapshot.empty);
        };
        checkRetweet();
    }, [tweetId, userId]);

    // ✅ Real-time retweet count
    useEffect(() => {
        const q = query(
            collection(db, "tweets"),
            where("isRetweet", "==", true),
            where("originalTweetId", "==", tweetId)
        );
        const unsub = onSnapshot(q, (snap) => {
            setRetweetCount(snap.size);
        });
        return () => unsub();
    }, [tweetId]);

    const handleLike = async () => {
        const ref = doc(db, "tweets", tweetId);
        try {
            await updateDoc(ref, {
                likes: liked ? arrayRemove(userId) : arrayUnion(userId),
            });
            setLiked(!liked);
            setLikes((prev) =>
                liked ? prev.filter((id) => id !== userId) : [...prev, userId]
            );
        } catch (err) {
            console.error("Like error:", err);
        }
    };

    const handleRetweet = async () => {
        if (hasRetweeted) return;
        try {
            await addDoc(collection(db, "tweets"), {
                ...tweet,
                isRetweet: true,
                originalTweetId: tweetId,
                userId,
                userEmail: auth.currentUser?.email,
                createdAt: serverTimestamp(),
            });
            setHasRetweeted(true);
        } catch (err) {
            console.error("Retweet failed:", err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentInput.trim()) return;

        try {
            await addDoc(collection(db, `tweets/${tweetId}/comments`), {
                text: commentInput,
                userId,
                userEmail: auth.currentUser?.email,
                createdAt: serverTimestamp(),
            });
            setCommentInput("");
        } catch (err) {
            console.error("Comment failed:", err);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            {/* Retweet label */}
            {tweet.isRetweet && tweet.userEmail && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Retweeted by @{username}
                </p>
            )}

            {/* Header */}
            <div className="flex items-center gap-3">
                <img
                    src={avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                        @{username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {tweet.createdAt?.toDate?.().toLocaleString() || "Just now"}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div>
                <p className="text-gray-800 dark:text-white">{tweet.text}</p>
                {tweet.imageUrl && (
                    <img
                        src={tweet.imageUrl}
                        alt="Tweet"
                        className="mt-2 w-full max-h-64 object-cover rounded-lg"
                    />
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 mt-3 text-sm text-gray-600 dark:text-gray-300">
                <button onClick={handleLike} className="flex items-center gap-1">
                    {liked ? (
                        <HeartIcon size={18} className="text-red-500" />
                    ) : (
                        <Heart size={18} />
                    )}
                    {likes.length}
                </button>

                <button
                    onClick={() => setShowComments((prev) => !prev)}
                    className="flex items-center gap-1"
                >
                    <MessageCircle size={18} />
                    {comments.length}
                </button>

                <button
                    onClick={handleRetweet}
                    disabled={hasRetweeted}
                    className={`flex items-center gap-1 ${
                        hasRetweeted ? "opacity-50" : ""
                    }`}
                >
                    <Repeat2 size={18} />
                    {retweetCount}
                </button>
            </div>

            {/* Comments */}
            {showComments && (
                <div className="mt-3 space-y-2 border-t pt-3 border-gray-200 dark:border-gray-700">
                    {comments.map((c) => (
                        <CommentCard key={c.id} comment={c} />
                    ))}
                    <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-2">
                        <input
                            type="text"
                            className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                            placeholder="Write a comment..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 flex items-center"
                        >
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TweetCard;
