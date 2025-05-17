import React from "react";
import AuthForm from "./Auth";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <AuthForm mode="signup" />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
