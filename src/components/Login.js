import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("Form submitted", values);
      alert("Login Successful!");
      setTimeout(() => {
        navigate("/");
      }, 0);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#ff8c00] text-white font-semibold rounded-md hover:bg-[#e46f20] transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
