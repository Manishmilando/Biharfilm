import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Bgpatter from "/Users/manishmilando/Desktop/Biharfilm/src/assets/Bgpatter.svg";
import Bg from "/Users/manishmilando/Desktop/Biharfilm/src/assets/Bg.svg";

import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaEye } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const fakeToken = "loginToken123";
    localStorage.setItem("authToken", fakeToken);
    navigate("/noc-form");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div>
        <img
          src={Bg}
          alt="Background Pattern"
          className="absolute z-[-10] top-0 left-0 w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="flex max-w-5xl w-full h-[39rem] rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Left side image */}
        <div className="hidden w-1/2 bg-zinc-100 p-10 md:flex items-center justify-center">
          <img src={Bgpatter} alt="Meditation" className="w-full h-auto" />
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-8 md:p-14">
          <div className="flex justify-end mb-4">
            <Link
              to="/signup"
              className="rounded-full border border-gray-300 px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Sign up
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
          <p className="mb-6 text-gray-500">Enter your email and password</p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a43f5c] focus:outline-none"
                  placeholder="annyghosh3@gmail.com"
                  required
                />
                <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdEmail />
                </span>
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a43f5c] focus:outline-none"
                  placeholder="********"
                  required
                />
                <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <IoIosLock />
                </span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                  <FaEye />
                </span>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 accent-[#802d44]"
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-[#802d44] hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="mb-6 w-full rounded-full bg-[#a92b43] py-2 shadow-[0_4px_8px_#802d44] font-semibold text-white hover:bg-[#891737]"
            >
              Login
            </button>

            <div className="mb-6 flex items-center justify-between text-sm text-gray-400">
              <hr className="w-1/3" />
              <span className="text-xs">or login with</span>
              <hr className="w-1/3" />
            </div>

            <div className="flex justify-center gap-4">
              <button className="flex items-center gap-2 rounded-full border border-gray-400 px-4 py-2 text-sm hover:bg-gray-100">
                <img
                  src="https://image.similarpng.com/file/similarpng/very-thumbnail/2020/06/Logo-google-icon-PNG.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google
              </button>
              <button className="flex items-center gap-2 rounded-full border px-4 py-2 border-gray-400 text-sm hover:bg-gray-100 ">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
