import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQYeZ_K0zcIlS-YCBf7KA0XTVGOcA4qFk",
  authDomain: "ecommerce-f5869.firebaseapp.com",
  projectId: "ecommerce-f5869",
  storageBucket: "ecommerce-f5869.firebasestorage.app",
  messagingSenderId: "753917960798",
  appId: "1:753917960798:web:f5c7f6fea0bb42e62b4acf",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
