import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCAZBj932H4NGp3bLiBsVlN5g9BAswsfUk",
  authDomain: "job-application-tracker-9b8c5.firebaseapp.com",
  projectId: "job-application-tracker-9b8c5",
  storageBucket: "job-application-tracker-9b8c5.firebasestorage.app",
  messagingSenderId: "16622275998",
  appId: "1:16622275998:web:52357a5fd75f000ab41a8f",
  measurementId: "G-N02G592XEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
