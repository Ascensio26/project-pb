import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };
