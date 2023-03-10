import { useState, useEffect, useContext, createContext } from 'react';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC1lJRAAQbrlrPeainCWQiEQCKJGosaoV4",
  authDomain: "events-auth-eff94.firebaseapp.com",
  projectId: "events-auth-eff94",
  storageBucket: "events-auth-eff94.appspot.com",
  messagingSenderId: "710476762440",
  appId: "1:710476762440:web:9de38b1f4b29916ffbb77d",
  measurementId: "G-0Y2LBFBJQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

export const AuthContext = createContext();

export const AuthContextProvider = props => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user, error }} {...props} />
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};
