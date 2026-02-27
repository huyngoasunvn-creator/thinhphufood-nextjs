import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../services/firebase";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (typeof window === "undefined" || !auth) {
    setLoading(false);
    return;
  }

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  const loginWithGoogle = async () => {
  if (!auth) return;
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

const loginWithEmail = (email: string, pass: string) => {
  if (!auth) return;
  return signInWithEmailAndPassword(auth, email, pass);
};

const registerWithEmail = async (
  email: string,
  pass: string,
  name: string
) => {
  if (!auth) return;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    pass
  );
  await updateProfile(userCredential.user, { displayName: name });
};

const logout = () => {
  if (!auth) return;
  return signOut(auth);
};

  return {
    user,
    loading,
    isAdmin:
      user?.email === "admin@thinhphufood.vn" ||
      user?.email?.includes("thinhphu.admin"),
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  };
};