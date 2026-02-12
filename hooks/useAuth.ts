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
} from "firebase/auth"; // ✅ sửa lại ở đây

import { auth } from "../services/firebase";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Email Login Error:", error);
      throw error;
    }
  };

  const registerWithEmail = async (
    email: string,
    pass: string,
    name: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      await updateProfile(userCredential.user, { displayName: name });
    } catch (error) {
      console.error("Register Error:", error);
      throw error;
    }
  };

  const logout = () => signOut(auth);

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
