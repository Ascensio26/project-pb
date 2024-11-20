import { initializeApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword,  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCpus3_-_jRQUOMGNEWRauVFUscnP55ugU',
  authDomain: 'busri-f4265.firebaseapp.com',
  databaseURL: 'https://busri-f4265-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'busri-f4265',
  storageBucket: 'busri-f4265.firebasestorage.app',
  messagingSenderId: '835320293869',
  appId: '1:835320293869:web:b559b7dcfd5516fad55fe4',
  measurementId: 'G-9YJJHLSTY8',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth and Database
const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getDatabase(app);

// Export necessary functions
export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword };