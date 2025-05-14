import React from "react";
import { useNavigate } from "react-router-dom";
import Signupimg from "/Users/manishmilando/Desktop/Biharfilm/src/assets/Signupimg.svg";
import Bg from "/Users/manishmilando/Desktop/Biharfilm/src/assets/Bg.svg";
const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate successful signup and storing token
    const fakeToken = "signupToken123";
    localStorage.setItem("authToken", fakeToken);
    navigate("/noc-form");
    navigate("/shooting-permission")
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
          <img
            src={Signupimg}
            alt="Signup Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-8 md:p-14">
          <div className="flex justify-end mb-4">
            <a
              href="/login"
              className="rounded-full border border-gray-300 px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Log in
            </a>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
          <p className="mb-6 text-gray-500">Fill the details to sign up</p>

          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a43f5c] focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
              </div>
            </div>

            {/* Password */}
            <div>
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="confirm"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-700 focus:border-[#a43f5c] focus:outline-none"
                  placeholder="********"
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#a92b43] py-2 font-semibold text-white shadow-[0_4px_8px_#802d44] hover:bg-[#891737]"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#802d44] hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
