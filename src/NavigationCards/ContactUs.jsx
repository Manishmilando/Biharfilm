import React from 'react';
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <>
    <div className="bg-gray-100 py-8 px-10 " id='ContactUs'>
      <div className="flex justify-between max-w-6xl mx-auto w-full space-x-12">
        
        {/* Legal Information */}
        <div className="w-2/3 transiton  ">
          <ul className="text-gray-700 ">
            <li className="font-bold  text-2xl mb-2">About</li>
            <li className=" py-2 border-gray-400 font-semibold mt-4 ">Over the years BSFDFC has worked with some of the most acclaimed filmmakers of India including Satyajit Ray, Mira Nair, Aparna Sen, Shyam Benegal, Govind Nihalani, Mrinal Sen, Richard Attenborogh, Adoor Gopalkrishnan and Ketan Mehta. BSFDFC is breaking new grounds by co-producing projects involving public-private partnerships</li>
            
          </ul>
        </div>

        {/* More Pages */}
        <div className="w-1/3">
          <ul className="text-gray-700">
            <li className="font-bold mb-2">Important Links</li>
            <li className="border-b border-gray-400 py-2 font-semibold hover:text-red-500 transition-colors duration-300">Shooting Location</li>
            <li className="border-b border-gray-400 py-2 font-semibold hover:text-red-500 transition-colors duration-300">Film Club</li>
            <li className="border-b border-gray-400 py-2 font-semibold hover:text-red-500 transition-colors duration-300">Youth and Culture</li>
            <li className="border-b border-gray-400 py-2 font-semibold hover:text-red-500 transition-colors duration-300">Bihar Tourism</li>
            <li className="border-b border-gray-400 py-2 font-semibold hover:text-red-500 transition-colors duration-300"> Environment and forest</li>
            <li className="border-b border-gray-400 py-2 font-semibold hover:text-red-500 transition-colors duration-300"> Transport</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-1/3 ">
          <ul className="text-gray-700">
            <li className=" font-bold mb-2">Contact</li>
            <li className="border-b border-gray-400 py-2 font-semibold hover:text-red-500 transition-colors duration-300">Bihar State Film Development and Finance Corporation Limited</li>
            <li className="border-b border-gray-400 py-2 font-semibold hover:text-red-500 transition-colors duration-300">0612-2219213</li>
            <li className="border-b border-gray-400 py-2 font-semibold hover:text-red-500 transition-colors duration-300">biharfilmnigam@gmail.com</li>
            <li className="border-b border-gray-400 py-2 font-semibold hover:text-red-500 transition-colors duration-300">Get Location</li>
          </ul>
        </div>

      </div>
    </div>

   


    <div className="bg-gray-100 py-8 px-10">
        <div className="flex justify-between max-w-6xl mx-auto w-full space-x-12">
          
          {/* Newsletter Section */}
          <div className="w-1/3">
            <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
            <button className="flex items-center space-x-2 bg-red-500 text-white text-lg font-medium py-2 px-6 rounded-full hover:bg-red-600 transition duration-300">
              <CiMail className="text-2xl" />  {/* Mail Icon */}
              <span>Register For Newsletter</span>
            </button>
          </div>

          {/* Follow Us Section */}
          <div className="w-2/3">
            <h2 className="text-lg font-semibold mb-4">Follow us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 text-2xl transition">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-500 text-2xl transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 text-2xl transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500 text-2xl transition">
                <FaYoutube />
              </a>
            </div>
          </div>
          
        </div>
         <div className=" border-t-2 border-gray-500 mt-6">

          
         </div>
        
    </div>




    </>
  );
};

export default Footer;