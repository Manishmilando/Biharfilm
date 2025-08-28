import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

// Components
import VideoSection from "./Components/VideoSection";
import Vr from "./NavigationCards/Vr";
import Cinemaecosystem from "./NavigationCards/Cinemaecosystem";
import FilmClubUI from "./NavigationCards/FilmClub";
import ContactUs from "./NavigationCards/ContactUs";
import GoverningComponent from "./NavigationCards/GoverningBody";
import FilemPolicyPage from "./NavigationCards/FilmPolicy";
import Actors from "./NavigationCards/Actors";
// import ButtonNOC from "./NavigationCards/NOCbutton";
import LoginPage from "./Components/Login";
import SignupPage from "./Components/Signup";
import ShootingPermissionForm from "./NavigationCards/ShootingPermissionFoam";
import DashboardMM from "./Dashboard/DashboardMM";
import LocationDetail from "./NavigationCards/LocationDetail";
import DasboardUser from "./Dashboard/DashboardUser";
import DistrictDashboard from "./Dashboard/DistrictDashboard";
// import DistrictList from "./Dashboard/DistrictList"
import CineSamvad from "./NavigationCards/pages/CineSamvad";
import Chatarpatar from "./NavigationCards/pages/Chatarpatar";
import CoffeeWithFilm from "./NavigationCards/pages/CoffeeWithFilm";
// import Notice from "./NavigationCards/Notice";
import ShootingLocationPage from "./NavigationCards/ShootingLocationPage";
import ArtistForm from "../src/NavigationCards/AddArtistForm";
import VendorForm from "./NavigationCards/VendorForm ";

import Notification from "./NavigationCards/Notification";
import Tender from "./NavigationCards/Tender";
import Vrpage from "./NavigationCards/pages/Vrpage";
import ProtectedRoute from './Components/ProtectedRoute';;


import Artist from "../src/NavigationCards/Artist";
// Home Page
function Home() {
  return (
    <>
      <VideoSection />
      {/* <ButtonNOC /> */}
      <Vr />
      <FilmClubUI />
      <Actors />
      {/* <ShootingLocationPage/> */}
      <Cinemaecosystem />
      <GoverningComponent />
      <FilemPolicyPage />
      <ContactUs />
    
    </>
  );
}


const DistrictDashboardWrapper = () => {
  const { districtName } = useParams();
  return <DistrictDashboard districtName={districtName} />;
};

export default function App() {
  return (
    <Routes>
      {/* <Route path="/FilmClubUI" element={<FilmClubUI />} /> */}
      <Route path="/location/:category/:id" element={<LocationDetail />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/apply-noc" element={<ShootingPermissionForm />} />
      <Route path="/dashboard" element={<DashboardMM />} />
      <Route path="/ShootingLocation" element={<ShootingLocationPage />} />
      <Route path="/dashboard-user" 
      element={
      <ProtectedRoute allowedRole="filmmaker">
      <DasboardUser />
      </ProtectedRoute>
      }
      />

          <Route path="/register-artist" element={<ArtistForm />} />
        <Route path="/register-vendor" element={<VendorForm />} />
      {/* <Route path="/districts" element={<DistrictList />} /> */}

      <Route path="/district/:districtName" element={<DistrictDashboardWrapper />} />
      <Route path="/filmclub/cine-samvad" element={<CineSamvad />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/tender" element={<Tender />} />
   
      <Route path="/filmclub/chatarpatar" element={<Chatarpatar />} />
      <Route path="/filmclub/coffee-with-film" element={<CoffeeWithFilm />} />

      <Route path="/vrpage" element={<Vrpage />} />

      <Route path="artist" element={<Artist />} />

    </Routes>
  );
}
