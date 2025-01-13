import { initializeApp } from 'firebase/app';

import { getAuth, Auth } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXFB5Q2c1IYZFB2E6ruTOXv3l7aSrGaOc",
  authDomain: "crypto-3e5e1.firebaseapp.com",
  databaseURL: "https://crypto-3e5e1-default-rtdb.firebaseio.com",
  projectId: "crypto-3e5e1",
  storageBucket: "crypto-3e5e1.firebasestorage.app",
  messagingSenderId: "802607168908",
  appId: "1:802607168908:web:22637aced5bec381f5eaa9"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
export default { app, auth };


