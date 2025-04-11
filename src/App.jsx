import React from "react";
import VideoSection from "./Components/VideoSection";
import Body from "./Body/Body";
import Location from "./NavigationCards/Location";
import Vr from "/src/NavigationCards/Vr"
import Cinemaecosystem from "./NavigationCards/Cinemaecosystem";
import FilmClubUI from "./NavigationCards/FilmClub";
import ContactUs from "./NavigationCards/ContactUs";
// import Navbar from "./Components/Navbar";
import GoverningComponent from "./NavigationCards/GoverningBody";
import FilemPolicyPage from "./NavigationCards/FilmPolicy";
import Actors from "./NavigationCards/Actors";

function App() {
  return (
    <>
  
      <VideoSection />
      {/* <Body /> */}
      <Location />
      <FilmClubUI />
      <Actors />
      <Vr />
      <Cinemaecosystem />
      <GoverningComponent />
      <FilemPolicyPage />
      <ContactUs />
      
    
    </>
  );
}

export default App;
