import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signupimg from "../assets/Signupimg.svg";
import Adminsvgg from "../assets/adminsvgg.svg";
import Logo from "/Logo1.png";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ NEW: Get name field
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // ✅ NEW: Validate name
    if (!name || name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    if (!selectedRole) {
      alert("Please select a role before signing up.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          name,  // ✅ NEW: Include name
          email,
          password,
          confirmPassword,
          role: selectedRole,
        }
      );

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userId", res.data.user.id);  // ✅ Store userId
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        alert("Signup successful!");

        // ✅ NEW: Redirect based on role
        if (selectedRole.toLowerCase() === "vendor") {
          navigate("/vendor-dashboard");
        } else {
          navigate("/dashboard-user");
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 relative">
      <img
        src="/Bgg.svg"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover opacity-60 z-[-1]"
      />

      <div className="flex max-w-5xl w-full h-auto md:h-[45rem] rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Left Graphic */}
        <div className="hidden w-1/2 bg-zinc-100 p-10 md:flex items-center justify-center">
          <img
            src={selectedRole === "Admin" ? Adminsvgg : Signupimg}
            alt="Pattern"
            className="w-full h-auto transition-all duration-300"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="Logo" className="w-24 object-contain" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create your account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Role Selection - Toggle Buttons */}
            <div className="flex gap-3 mb-6 justify-center flex-wrap">
              {["filmmaker", "vendor", "artist"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`px-5 py-2 rounded-full border text-sm font-medium transition ${selectedRole === role
                    ? "border-[#a92b43] bg-[#a92b43] text-white"
                    : "border-gray-300 text-gray-600 hover:border-[#a92b43]"
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* ✅ NEW: Name Field */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a92b43] focus:outline-none focus:ring-1 focus:ring-[#a92b43]"
                  placeholder="Mr. Abhishek Anand"
                  required
                />
                <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaUser />
                </span>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a92b43] focus:outline-none focus:ring-1 focus:ring-[#a92b43]"
                  placeholder="anand@mail.com"
                  required
                />
                <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdEmail />
                </span>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a92b43] focus:outline-none focus:ring-1 focus:ring-[#a92b43]"
                  placeholder="••••••••"
                  required
                />
                <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <IoIosLock />
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Min. 6 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a92b43] focus:outline-none focus:ring-1 focus:ring-[#a92b43]"
                  placeholder="••••••••"
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
              disabled={loading}
              className="w-full rounded-full bg-[#a92b43] py-2.5 font-semibold text-white shadow-[0_4px_8px_#802d44] hover:bg-[#891737] disabled:opacity-50 disabled:cursor-not-allowed transition mt-6"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#a92b43] font-medium hover:underline">
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
