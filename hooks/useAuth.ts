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

const ADMIN_EMAILS = ["admin@thinhphufood.vn"];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
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
  provider.setCustomParameters({
    prompt: "select_account",
  });

  const result = await signInWithPopup(auth, provider);
  return result;
};;

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

  const isAdmin =
    !!user && ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "");

  return {
    user,
    loading,
    isAdmin,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  };
};