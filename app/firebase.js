import {initializeApp, getApps, getApp } from 'firebase/app';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  // Your Firebase configuration goes here
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const firebaseApp = getApps.length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export {firebaseApp, auth};
