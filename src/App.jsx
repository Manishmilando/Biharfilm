import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import VideoSection from "./Components/VideoSection";
import Location from "./NavigationCards/Location";
import Vr from "./NavigationCards/Vr";
import Cinemaecosystem from "./NavigationCards/Cinemaecosystem";
import FilmClubUI from "./NavigationCards/FilmClub";
import ContactUs from "./NavigationCards/ContactUs";
import GoverningComponent from "./NavigationCards/GoverningBody";
import FilemPolicyPage from "./NavigationCards/FilmPolicy";
import Actors from "./NavigationCards/Actors";
import ButtonNOC from "./NavigationCards/NOCbutton";
import NOCFORMpage from "./NavigationCards/NOCFORMpage";
import LoginPage from "./Components/Login";
import SignupPage from "./Components/Signup";
import ShootingPermissionForm from "./NavigationCards/ShootingPermissionFoam";
function Home() {
  return (
    <>
      <VideoSection />
      <ButtonNOC />
      <Location />
      <FilmClubUI />
      <Actors />
      <Vr />
      <Cinemaecosystem />
      <GoverningComponent />
      <FilemPolicyPage />
      <ContactUs />
      <ButtonNOC />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/shooting-permission" element={<ShootingPermissionForm />} />
      <Route path="/apply-noc" element={<NOCFORMpage />} />
    </Routes>
  );
}
