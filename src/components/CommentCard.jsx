import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const defaultAvatars = [
    "https://placekitten.com/100/100",
    "https://place-puppy.com/100x100",
    "https://randomfox.ca/images/1.jpg",
];

const CommentCard = ({ comment }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            if (!comment.userId) return;
            const ref = doc(db, "users", comment.userId);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setUser(snap.data());
            }
        };
        fetchUser();
    }, [comment.userId]);

    const commenter = user.email?.split("@")[0]?.replace(/[.\s-]/g, "_") || "anon";
    const avatar = user.photoURL || defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
    const timestamp = comment.createdAt?.toDate?.().toLocaleString() || "Just now";

    return (
        <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 shadow-sm flex items-start gap-3">
            <img
                src={avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800 dark:text-white">
                    @{commenter}
                </div>
                <p className="text-base text-left text-gray-100 mt-1">{comment.text}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{timestamp}</p>
            </div>
        </div>
    );
};

export default CommentCard;
