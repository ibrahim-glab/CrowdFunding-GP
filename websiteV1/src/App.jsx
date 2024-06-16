import React, { useEffect } from "react";
import "./index.css";
import "./App.css";
import { dummyData } from "../utils";
import Home from "./Pages/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Requests from "./Pages/Requests";
import Hist from "./Pages/Hist";
import CreateCampaign from "./Pages/CreateCampaign";
import AdminPage from "./Pages/AdminPage";
import SideBar from "./Components/dashboard/SideBar";
import NavBar from "./Components/dashboard/NavBar";
import { useAddress } from "@thirdweb-dev/react";
import { navlinks } from "./constants";
import CampaignDetails from "./Pages/CampaignDetails";
import MyCampaigns from "./Pages/MyCampaigns";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const address = useAddress();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if current path is '/admin'
    const isAdminPath = location.pathname === "/admin";
    if (address === null) {
      navigate("/");
    } else if (address === import.meta.env.VITE_ADMIN_ADDRESS && !isAdminPath) {
      console.log("navigating to admin");
      navigate("/admin");
    } else if (address !== import.meta.env.VITE_ADMIN_ADDRESS && isAdminPath) {
      console.log("navigating to home");
      navigate("/");
    }
  }, [address, location.pathname, navigate]);

  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
        {/* Conditionally render SideBar based on isAdminPath */}
        {location.pathname !== "/admin" && (
          <div className="sm:flex hidden mr-10 relative">
            <SideBar />
          </div>
        )}
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          {/* Conditionally render NavBar based on isAdminPath */}
          {location.pathname !== "/admin" && <NavBar />}
          <Routes>
            <Route path="/" element={<Home campaigns={dummyData} />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/history" element={<Hist />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            <Route path="/MyCampaigns" element={<MyCampaigns />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
