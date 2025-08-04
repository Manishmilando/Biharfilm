import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signupimg from "../assets/Signupimg.svg";
import Adminsvgg from "../assets/Adminsvgg.svg";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import axios from "axios";


const SignupPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const handleSignup = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  if (!selectedRole) {
    alert("Please select a role before signing up.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await axios.post("http://localhost:3000/api/auth/signup", {
      email,
      password,
      role: selectedRole,
    });

    if (res.data.token) {
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      alert("Signup successful!");
      navigate("/dashboard-user");
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 relative">
      <img
        src="/Bgg.svg"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover opacity-60 z-[-1]"
      />

      <div className="flex max-w-5xl w-full h-[39rem] rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Left Graphic */}
        <div className="hidden w-1/2 bg-zinc-100 p-10 md:flex items-center justify-center">
          <img
            src={selectedRole === "Admin" ? Adminsvgg : Signupimg}
            alt="Pattern"
            className="w-full h-auto transition-all duration-300"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 md:p-14">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">Signup</span>
            <Link
              to="/login"
              className="rounded-full border border-gray-300 px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
          <p className="mb-4 text-gray-500">Fill in your details to get started</p>

          <form onSubmit={handleSignup}>
            {/* Role Selection */}
            <div className="flex gap-4 mb-4">
              {["filmmaker", "vendor", "Artist"].map((role) => (
                <label key={role} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={() => setSelectedRole(role)}
                    className="accent-[#a92b43]"
                  />
                  {role}
                </label>
              ))}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a43f5c] focus:outline-none"
                  placeholder="example@gmail.com"
                  required
                />
                <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdEmail />
                </span>
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a43f5c] focus:outline-none"
                  placeholder="********"
                  required
                />
                <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <IoIosLock />
                </span>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a43f5c] focus:outline-none"
                  placeholder="********"
                  required
                />
                <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <IoIosLock />
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mb-4 w-full rounded-full bg-[#a92b43] py-2 font-semibold text-white shadow-[0_4px_8px_#802d44] hover:bg-[#891737]"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#802d44] hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
