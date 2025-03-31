import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    collection,
    query,
    orderBy,
    limit,
    startAfter,
    getDocs,
    onSnapshot
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import TweetCard from "./TweetCard";

const TweetFeed = ({ selectedMood }) => {
    const [tweets, setTweets] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const observer = useRef();

    const fetchInitialTweets = async () => {
        const q = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc"),
            limit(10)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const tweetList = snapshot.docs.map((doc) => ({
                tweetId: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetList);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(snapshot.docs.length === 10);
        } else {
            setTweets([]);
            setHasMore(false);
        }
    };

    const fetchMoreTweets = async () => {
        if (!lastVisible || !hasMore || loading) return;
        setLoading(true);

        const q = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(5)
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const newTweets = snapshot.docs.map((doc) => ({
                tweetId: doc.id,
                ...doc.data(),
            }));
            setTweets((prev) => [...prev, ...newTweets]);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(snapshot.docs.length === 5);
        } else {
            setHasMore(false);
        }

        setLoading(false);
    };

    const loaderRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchMoreTweets();
                }
            },
            { threshold: 1 }
        );

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // Real-time tweet watcher — add at bottom
    useEffect(() => {
        const topTweetQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc"),
            limit(1)
        );

        const unsub = onSnapshot(topTweetQuery, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const newTweet = {
                        tweetId: change.doc.id,
                        ...change.doc.data(),
                    };

                    setTweets((prev) => {
                        const alreadyExists = prev.find((t) => t.tweetId === newTweet.tweetId);
                        if (!alreadyExists) {
                            return [...prev, newTweet]; // ✅ Add new tweets at bottom
                        }
                        return prev;
                    });
                }
            });
        });

        return () => unsub();
    }, []);

    useEffect(() => {
        fetchInitialTweets();
    }, []);

    const filteredTweets = tweets.filter((tweet) =>
        selectedMood === "All" ? true : tweet.mood === selectedMood
    );

    return (
        <div className="space-y-6">
            {filteredTweets.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No tweets yet.</p>
            ) : (
                filteredTweets.map((tweet) => (
                    <TweetCard key={tweet.tweetId} tweet={tweet} tweetId={tweet.tweetId} />
                ))
            )}

            {hasMore && (
                <div ref={loaderRef} className="text-center py-4 text-sm text-gray-400">
                    Loading more tweets...
                </div>
            )}
        </div>
    );
};

export default TweetFeed;
