import React, { useState } from "react";
import AuthForm from "./Auth";
import { Link } from "react-router-dom";
import {
  AiOutlineInfoCircle,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";

const Login = () => {
  const [showDummyCreds, setShowDummyCreds] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        {/* Dummy Credentials Info */}
        <div className="bg-yellow-100 text-yellow-800 text-sm p-3 rounded mb-4 border border-yellow-400">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 font-semibold">
              <AiOutlineInfoCircle size={16} />
              Dummy Credentials Available
            </div>
            <button
              type="button"
              onClick={() => setShowDummyCreds(!showDummyCreds)}
              className="text-yellow-700 hover:text-yellow-900"
            >
              {showDummyCreds ? (
                <AiOutlineUp size={16} />
              ) : (
                <AiOutlineDown size={16} />
              )}
            </button>
          </div>
          {showDummyCreds && (
            <div className="mt-2 space-y-2 pl-6 text-left">
              <p>
                <strong>Email:</strong> user@example.com
              </p>
              <p>
                <strong>Password:</strong> password123
              </p>
            </div>
          )}
        </div>

        {/* Auth Form */}
        <AuthForm mode="login" />
        <p className="mt-4 text-center text-sm text-gray-600">
          New user?{" "}
          <Link to="/signup" className="text-orange-500">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
