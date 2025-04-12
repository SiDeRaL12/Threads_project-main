import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';
import UserProfilepic from '../components/UserProfilepic';
import UserName from '../components/UserName';
import TweetCard from '../components/TweetCard';

const Profile = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const q = query(
      collection(db, 'tweets'),
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tweetsData = snapshot.docs.map(doc => ({ tweetId: doc.id, ...doc.data() }));
      setTweets(tweetsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold"><UserName /></h1>
          <UserProfilepic size="large" />
        </div>

        <div className="space-y-4">
          {tweets.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No tweets yet.</p>
          ) : (
            tweets.map((tweet) => (
              <TweetCard key={tweet.tweetId} tweet={tweet} tweetId={tweet.tweetId} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
