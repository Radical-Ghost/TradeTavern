import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAUkDSoey1iKIcXomMo_hMfMmQ3I9brbgA",
  authDomain: "trade-travern.firebaseapp.com",
  projectId: "trade-travern",
  storageBucket: "trade-travern.appspot.com",
  messagingSenderId: "131451221261",
  appId: "1:131451221261:web:efbd2c7d45163f49752c44",
  measurementId: "G-3PBX4CXY0N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); 
const auth = getAuth(app);

export { app, db, storage, auth };
