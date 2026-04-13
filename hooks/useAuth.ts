import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "../services/firebase";

const ADMIN_EMAILS = ["admin@thinhphufood.vn"];

async function syncServerSession(currentUser?: User | null) {
  if (!auth) {
    throw new Error("Firebase auth chưa sẵn sàng");
  }

  const activeUser = currentUser ?? auth.currentUser;

  if (!activeUser) {
    throw new Error("Không tìm thấy người dùng hiện tại");
  }

  const idToken = await activeUser.getIdToken(true);
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ token: idToken }),
  });

  if (!response.ok) {
    throw new Error("Không thể đồng bộ phiên đăng nhập");
  }

  return response.json();
}

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

    return signInWithPopup(auth, provider);
  };

  const loginWithEmail = (email: string, pass: string) => {
    if (!auth) return;
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (
    email: string,
    pass: string,
    name: string,
  ) => {
    if (!auth) return;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass,
    );
    await updateProfile(userCredential.user, { displayName: name });
  };

  const logout = async () => {
    if (!auth) return;

    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => undefined);

    return signOut(auth);
  };

  const syncAdminSession = (currentUser?: User | null) => {
    return syncServerSession(currentUser ?? user);
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
    syncAdminSession,
  };
};
