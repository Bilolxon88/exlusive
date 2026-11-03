import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
const AuthContext = createContext(null);
export const authErrors = {
  "auth/unauthorized-domain": "Sign-in is unavailable right now.",
  "auth/operation-not-allowed": "Sign-in is unavailable right now.",
  "auth/popup-blocked":
    "Your browser blocked the sign-in window. Allow popups and try again.",
  "auth/popup-closed-by-user": "Sign-in was cancelled. You can try again.",
  "auth/cancelled-popup-request": "A sign-in window is already open.",
  "auth/network-request-failed":
    "Check your internet connection and try again.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/user-not-found": "The email or password is incorrect.",
  "auth/wrong-password": "The email or password is incorrect.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/email-already-in-use":
    "This email already has an account. Please log in.",
  "auth/weak-password": "Please enter at least 6 characters for your password.",
  "auth/too-many-requests": "Too many attempts. Please wait and try again.",
  "auth/account-exists-with-different-credential":
    "Use your original sign-in method for this email.",
  "auth/user-disabled": "This account has been disabled. Contact support.",
  "auth/invalid-api-key": "Sign-in is unavailable right now.",
  "auth/configuration-not-found": "Sign-in is unavailable right now.",
  "auth/web-storage-unsupported":
    "Allow browser storage to keep your sign-in session.",
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((error) =>
      setAuthError(error.code),
    );
    return onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        setAuthError(error.code);
        setLoading(false);
      },
    );
  }, []);
  function loginWithGoogle(language) {
    auth.languageCode = language;
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    return signInWithPopup(auth, provider);
  }
  async function loginWithEmail(email, password, name) {
    if (name) {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(result.user, {
        displayName: name,
      });
      setUser({
        ...result.user,
        displayName: name,
      });
      return result;
    }
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        loginWithGoogle,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
