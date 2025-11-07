// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_una2zjq0VVEPWcOqvufHQhRKlo3Xvpc",
  authDomain: "e-commerce-5c486.firebaseapp.com",
  projectId: "e-commerce-5c486",
  storageBucket: "e-commerce-5c486.firebasestorage.app",
  messagingSenderId: "430501072259",
  appId: "1:430501072259:web:24e2e25aeb98d5d9583ab6",
  measurementId: "G-6Z9BKSFTRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (only in production or if window is available)
let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log('Analytics initialization error:', error);
  }
}

export default app;