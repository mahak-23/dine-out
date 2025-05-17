// UserProvider.js
import React, { createContext, useState, useEffect } from "react";
import {
  auth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "../services/firebaseConfig";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/slice/cartSlice";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUsername = async (newUsername) => {
    if (user && newUsername.trim()) {
      try {
        setLoader(true);
        await updateProfile(auth.currentUser, {
          displayName: newUsername,
        });
        setUser({ ...user, displayName: newUsername });
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setLoader(false);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    dispatch(clearCart());
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, updateUsername, logout, loader }}
    >
      {children}
    </UserContext.Provider>
  );
}
