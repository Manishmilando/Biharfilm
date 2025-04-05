import React from "react";
import VideoSection from "./Components/VideoSection";
import Body from "./Body/Body";
import Location from "./NavigationCards/Location";
import Vr from "/src/NavigationCards/Vr"
import FilmClubUI from "./NavigationCards/FilmClub";
import ContactUs from "./NavigationCards/ContactUs";
// import Navbar from "./Components/Navbar";
import GoverningComponent from "./NavigationCards/GoverningBody";

function App() {
  return (
    <>
  
      <VideoSection />
      <Body />
      <Location />
      <FilmClubUI />
      <Vr />
      <GoverningComponent />
      <ContactUs />
    
    </>
  );
}

export default App;
