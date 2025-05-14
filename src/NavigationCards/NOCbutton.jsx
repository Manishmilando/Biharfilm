import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";

export default function ButtonNOC() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleApplyClick = () => {
    if (location.pathname !== "/apply-noc") {
      navigate("/login");
    } else {
      // already on the page, maybe scroll to the form or show a toast
      const formSection = document.getElementById("FilmPolicy");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="absolute flex right-10 bottom-6 z-10">
      <button
        onClick={handleApplyClick}
        className="px-6 py-2 flex items-center text-white rounded-xl font-bold shadow-md hover:bg-blue-800 bg-black/90 outline-2 outline-white transition"
      >
        Apply for NOC
        <HiArrowLongRight className="ml-4 w-10 scale-x-200 text-2xl" />
      </button>
    </div>
  );
}
