import React from 'react';
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-150 text-gray-700" id="about">
     
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-12 space-y-8 lg:space-y-0">
          
       
          <div className="lg:w-2/3">
            <h3 className="text-2xl font-bold mb-4">About</h3>
            <p className="text-sm sm:text-base leading-relaxed">
              Over the years BSFDFC has worked with some of the most acclaimed filmmakers of India including Satyajit Ray, Mira Nair, Aparna Sen, Shyam Benegal, Govind Nihalani, Mrinal Sen, Richard Attenborough, Adoor Gopalkrishnan and Ketan Mehta. BSFDFC is breaking new grounds by co-producing projects involving public-private partnerships.
            </p>
          </div>

        
<div className="lg:w-1/3 grid grid-cols-2 sm:grid-cols-1 gap-4">
  <div>
    <h3 className="text-xl font-bold mb-2">Important Links</h3>
    <ul className="space-y-2 text-sm">
      {[
        { label: "Shooting Location", href: "#Shooting-location" },
        { label: "Film Club", href: "#FilmClub" },
        { label: "Film Policy", href: "#FilmPolicy" },
        { label: "Bihar Tourism", href: "https://tourism.bihar.gov.in/" }
      ].map(link => (
        <li key={link.label}>
          <a href={link.href} className="hover:text-red-500 transition-colors">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
  <div>
    <h3 className="text-xl font-bold mb-2">&nbsp;</h3>
    <ul className="space-y-2 text-sm">
      {[
        { label: "Environment and Forest", href: "https://state.bihar.gov.in/forest/CitizenHome.html" },
        { label: "Transport", href: "https://state.bihar.gov.in/transport/CitizenHome.html" }
      ].map(link => (
        <li key={link.label}>
          <a href={link.href} className="hover:text-red-500 transition-colors">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</div>


        
          <div className="lg:w-1/3">
            <h3 className="text-xl font-bold mb-2">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li> <a href="https://film.bihar.gov.in/">Bihar State Film Development and Finance Corporation Limited</a></li>
              <li>0612-2219213</li>
              <li>biharfilmnigam@gmail.com</li>
              <li className="hover:text-red-500 transition-colors cursor-pointer">Get Location</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-gray-300"/>

   
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
          

          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-3">Register Yourself</h4>
            <button className="flex items-center space-x-2 bg-red-500 text-white text-sm sm:text-base font-medium py-2 px-4 sm:px-6 rounded-full hover:bg-red-600 transition">
              <CiMail className="text-xl" />
              <span>film's Actor registration</span>
            </button>
          </div>

   
          <div className="w-full md:w-2/3">
            <h4 className="text-lg font-semibold mb-3">Follow us</h4>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition"><FaFacebook /></a>
              <a href="#" className="text-gray-500 hover:text-pink-500 transition"><FaInstagram /></a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition"><FaTwitter /></a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition"><FaYoutube /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
);
};

export default Footer;
