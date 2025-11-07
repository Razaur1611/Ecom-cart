# Backend Setup

This directory is reserved for backend services. Currently, authentication is handled by Firebase (client-side).

## Firebase Authentication Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** authentication method
4. Click **Save**

### Step 3: Get Your Firebase Config

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Select **Project settings**
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Register your app (give it a nickname)
6. Copy the Firebase configuration object

### Step 4: Update Firebase Config

1. Open `frontend/src/firebase/config.js`
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 5: Test Authentication

1. Start your development server: `npm start` (in frontend directory)
2. Navigate to `/login`
3. Try creating an account or logging in

## Features

- ✅ Email/Password Authentication
- ✅ User Registration
- ✅ User Login
- ✅ User Logout
- ✅ Protected Routes (can be added)
- ✅ User Session Persistence

## Future Backend Services

This folder can be used for:
- REST API endpoints
- Server-side logic
- Database connections
- Payment processing
- Order management
- etc.

