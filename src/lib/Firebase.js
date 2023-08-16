import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCRRtOuayPyr5BFK65kHLr8LViVxxQAUxE",
  authDomain: "chatapp-b4225.firebaseapp.com",
  projectId: "chatapp-b4225",
  storageBucket: "chatapp-b4225.appspot.com",
  messagingSenderId: "841932806597",
  appId: "1:841932806597:web:7fc26099a5884d4a1a93ac"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const Googleprovider = new GoogleAuthProvider();
export const db = getFirestore()
export default app;