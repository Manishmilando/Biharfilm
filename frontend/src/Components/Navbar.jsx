import React, { useState, useEffect } from "react";
import Logo1 from "/src/assets/Logo1.png";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isNoticeDropdownOpen, setIsNoticeDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToElementSmoothly = (element, duration = 1200) => {
    const start = window.pageYOffset;
    const end = element.getBoundingClientRect().top + start;
    const distance = end - start;
    let startTime = null;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easing = easeInOutQuad(progress);

      window.scrollTo(0, start + distance * easing);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleLocationClick = (id) => {
    if (id === "notice") {
      return; // Do nothing since dropdown is used
    } else {
      const section = document.getElementById(id);
      if (section) {
        scrollToElementSmoothly(section, 2200);
      }
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };

  const handleApplyClick = () => {
    if (location.pathname !== "/apply-noc") {
      navigate("/login");
    } else {
      const formSection = document.getElementById("FilmPolicy");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setShowNavbar(true), 1000);

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      if (currentScrollPos === 0) {
        setNavbarVisible(true);
        setHasScrolled(false);
      } else {
        setNavbarVisible(isScrollingUp);
        setHasScrolled(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "Vr", label: "VR" },
    { id: "FilmClub", label: "Film Club" },
    // { id: "Shooting-location", label: "Shooting Location" },
    { id: "GoverningBody", label: "Governing Body" },
    { id: "FilmPolicy", label: "Film Policy" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-500 ${showNavbar ? "opacity-100" : "opacity-0"
        } ${navbarVisible ? "transform-none" : "-translate-y-full"} group`}
    >
      <div
        className={`px-4 sm:px-6 lg:px-16 py-2 md:py-3 relative transition-colors duration-300 ${navbarVisible && hasScrolled ? "bg-white" : "bg-transparent"

          }`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-100 z-0 pointer-events-none transition-opacity duration-300"></div>

        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center">
            <img src={Logo1} alt="logo" className="h-14 w-20 md:h-16 md:w-24" />
          </div>

          {/* Desktop Menu */}
          <ul
            className={`hidden md:flex items-center gap-10 text-lg relative z-10 transition-colors duration-300 ${navbarVisible && hasScrolled ? "text-black" : "text-white"
              } group-hover:text-black`}
          >
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleLocationClick(item.id)}
                className="cursor-pointer hover:text-red-600 font-semibold transition"
              >
                {item.label}
              </li>
            ))}
            <div>
              <li
                className="relative cursor-pointer hover:text-red-600 font-semibold transition flex items-center"
                onClick={() => {
                  navigate("/ShootingLocation");
                  setIsMobileMenuOpen(false);
                }}
              >
                Shooting Location
              </li>
            </div>

            {/* Notice Dropdown */}
            <li
              className="relative cursor-pointer hover:text-red-600 font-semibold transition flex items-center"
              onMouseEnter={() => setIsNoticeDropdownOpen(true)}
              onMouseLeave={() => setIsNoticeDropdownOpen(false)}
            >
              Notification <ChevronDown size={16} className="ml-1" />
              {isNoticeDropdownOpen && (
                <ul className="absolute top-full left-0 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden z-50">
                  <li
                    onClick={() => {
                      navigate("/notification");
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-200 hover:text-red-600"
                  >
                    Notifications
                  </li>
                  <li
                    onClick={() => {
                      navigate("/tender");
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-200 hover:text-red-600"
                  >
                    Tenders
                  </li>
                </ul>
              )}
            </li>
            <div className="flex items-center gap-1">
              <li
                onClick={handleApplyClick}
                className="flex items-center gap-1 cursor-pointer hover:text-red-600 font-semibold transition"
              >
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>
              </li>
            </div>


          </ul>

          {/* Mobile Toggle (Hamburger only) */}
          <div className="md:hidden relative z-[60]">
            {!isMobileMenuOpen && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 rounded-md focus:outline-none transition-colors duration-300 ${navbarVisible && hasScrolled ? "text-black" : "text-white"
                  }`}
              >
                <Menu size={28} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black text-white p-6 z-[40] shadow-xl transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          {/* Close Button inside menu */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-5 text-white hover:text-red-500"
          >
            <X size={32} />
          </button>

          <ul className="flex flex-col gap-6 mt-16 text-lg font-semibold">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleLocationClick(item.id)}
                className="cursor-pointer hover:text-red-500 transition-colors"
              >
                {item.label}
              </li>
            ))}

            {/* Added Shooting Location for Mobile */}
            <li
              onClick={() => {
                navigate("/ShootingLocation");
                setIsMobileMenuOpen(false);
              }}
              className="cursor-pointer hover:text-red-500 transition-colors"
            >
              Shooting Location
            </li>

            {/* Notice Dropdown in Mobile */}
            <li className="mt-2">Notifications</li>
            <ul className="ml-4 flex flex-col gap-3">
              <li
                onClick={() => {
                  navigate("/notification");
                  setIsMobileMenuOpen(false);
                }}
                className="cursor-pointer hover:text-red-500 transition-colors"
              >
                Notifications
              </li>
              <li
                onClick={() => {
                  navigate("/tender");
                  setIsMobileMenuOpen(false);
                }}
                className="cursor-pointer hover:text-red-500 transition-colors"
              >
                Tenders
              </li>
            </ul>

            <li
              onClick={handleApplyClick}
              className="cursor-pointer hover:text-red-500 transition-colors mt-4"
            >
             Login
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
