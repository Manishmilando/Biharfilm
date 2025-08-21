import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ axios import
import Bgpatter from "../assets/Bgpatter.svg";
import Adminsvgg from "../assets/Adminsvgg.svg";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // ✅ API call to backend
      const res = await axios.post("https://biharfilmbackend-production.up.railway.app/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        const user = res.data.user;

        // Save token or flag (you can store JWT from res if available)
        localStorage.setItem("authToken", user.id);
  localStorage.setItem("userData", JSON.stringify(user)); // ✅ save full user object

        // Redirecting users based on there role
        if (user.role === "filmmaker") {
          navigate("/dashboard-user");
        } else if (user.role === "artist") {
          navigate("/dashboard-user");
        } else if (user.role === "vendor") {
          navigate("/dashboard-user");
        } else if (user.role === "admin") {
          navigate("/dashboard");
        } else if (user.role === "district_admin") {
          navigate(`/district/${user.district?.toLowerCase() || "default"}`);
        } else {
          navigate("/login");
        }
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 relative">
      <img
        src="https://res.cloudinary.com/dgra109xv/image/upload/v1755760897/Bgg_m1ikjp.svg"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover opacity-60 z-[-1]"
      />
      <div className="flex max-w-5xl w-full h-[39rem] rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Left Graphic */}
        <div className="hidden w-1/2 bg-zinc-100 p-10 md:flex items-center justify-center">
          <img
            src={isAdmin ? Adminsvgg : Bgpatter}
            alt="Pattern"
            className="w-full h-auto transition-all duration-300"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 md:p-14">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              {isAdmin ? "Admin/District" : "User/Artist/Vendor"} Login
            </span>
            <button
              type="button"
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-sm px-4 py-1 border rounded-full text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              Switch to {isAdmin ? "User" : "Admin"}
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
          <p className="mb-6 text-gray-500">Enter your email and password</p>

          {/* ✅ Form uses handleLogin */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a43f5c] focus:outline-one"
                  placeholder="example@gmail.com"
                  required
                />
                <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdEmail />
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 pr-10 text-sm text-gray-700 focus:border-[#a43f5c] focus:outline-none"
                  placeholder="********"
                  required
                />
                <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <IoIosLock />
                </span>
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="mb-6 w-full rounded-full bg-[#a92b43] py-2 shadow-[0_4px_8px_#802d44] font-semibold text-white hover:bg-[#891737]"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#802d44] hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
