# Eskiwi Threads Clone

Eskiwi is a modern, full-stack clone of the Threads social media experience, built using React and Firebase. It supports tweet posting, mood-based filtering, infinite scrolling, real-time updates, and an adaptive UI with theme support.

------

## Features

### Authentication

- Google Sign-In with Firebase Authentication
- Conditional routing based on login state
- Redirects to Home upon successful login

### Home Feed

- Real-time tweet display using Firestore snapshot listeners
- Infinite scrolling with pagination (initial 10 tweets, then 5 per scroll)
- Likes, comments, and retweet interactions
- Clean layout with professional icons

### Posting

- Tweet composer with text, mood selection, and optional image upload
- Image storage using Firebase Storage
- Mood-based tweet tagging and filtering
- Posts are automatically redirected back to the home feed

### Commenting

- Threaded replies below parent tweet
- Each comment includes username, avatar, timestamp, and styled content card
- Comments fetched and displayed in real-time

### Retweeting

- Retweet functionality with a live retweet counter
- Prevents multiple retweets from the same user
- Shows "Retweeted by @username" label on cloned tweets

### Theming and Responsiveness

- Dark and light mode support with system theme override
- Theme toggle persists user preference
- Fixed bottom navigation bar that adapts to screen size
  - Shows only icons on small screens, adds labels on larger screens
  - Matches content container width (`max-w-2xl`)
  - Non-scrollable and consistent across pages

------

## Technology Stack

| Technology       | Purpose                                    |
| ---------------- | ------------------------------------------ |
| React            | Frontend UI Framework                      |
| React Router DOM | Routing and navigation                     |
| Firebase Auth    | User authentication (Google)               |
| Firestore        | NoSQL database for tweets, users, comments |
| Firebase Storage | Image uploads                              |
| Tailwind CSS     | Styling with utility-first CSS             |
| Lucide React     | Professional icon set                      |

------

## Folder Structure

```
src/
├── assets/              # Static files (icons, images)
├── components/          # TweetCard, Composer, BottomNav, etc.
├── pages/               # Home, SignIn, SignUp, Post, Settings
├── firebase/            # Firebase initialization and config
├── App.jsx              # Main route definitions
└── main.jsx             # Application entry point
```

------

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/eskiwi-clone.git
   cd eskiwi-clone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Firebase:**

   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
   - Enable Google Authentication, Firestore, and Storage
   - Add your Firebase credentials to `src/firebase/firebase-config.js`

4. **Run the development server:**

   ```bash
   npm run dev
   ```

------

## Firebase Security Rules (Development Only)

**Firestore:**

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Storage:**

```js
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

> Replace these rules with stricter authentication-based access control before going to production.

------

