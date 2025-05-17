import React, { useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "../services/firebaseConfig";
import { auth } from "../services/firebaseConfig";

const AuthForm = ({ mode }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const isLogin = mode === "login";

  const decodeErrorMessage = (error) => {
    const errorCode = error?.code || error?.message;
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Email is already registered.";
      case "auth/user-disabled":
        return "Your account has been disabled!";
      case "auth/weak-password":
        return "Password is too weak.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/user-not-found":
        return "No user found with this email.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
    validate,
    onSubmit: async (values) => {
      setLoadingBtn(true);
      setErrorMessage(null);

      try {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, values.email, values.password);
          navigate(redirectTo);
        } else {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: values.username,
          });
          navigate("/login");
        }
      } catch (error) {
        setErrorMessage(decodeErrorMessage(error));
      } finally {
        setLoadingBtn(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      )}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {!isLogin && (
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      )}

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <button
        type="submit"
        className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        disabled={loadingBtn}
      >
        {loadingBtn ? "Processing..." : isLogin ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;
