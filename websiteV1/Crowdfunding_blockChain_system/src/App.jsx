import ocean from './assets/ocean.png';
import './index.css';
import "./App.css";
import SideBar from "./Components/dashboard/SideBar";
import NavBar from "./Components/dashboard/NavBar"
import Home from './Pages/Home';
import { dummyData } from './test';
import { Router, BrowserRouter, Routes, Route } from 'react-router-dom';
import { MoralisProvider } from 'react-moralis';
import Requests from './Pages/Requests';
import Hist from './Pages/Hist';
import CreateCampaign from './Pages/CreateCampaign';

function App() {
  return (
    <MoralisProvider initializeOnMount = {false}> 
    <BrowserRouter>
      <>
        <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
          <div className="sm:flex hidden mr-10 relative">
            <SideBar />

          </div>
          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <NavBar />


            <Routes>
              <Route path="/" element={<Home campaigns={dummyData} />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/history" element={<Hist />} />
              <Route path='/create-campaign' element={<CreateCampaign />} />
            </Routes>

          </div>

        </div>

      </>
    </BrowserRouter>
    </MoralisProvider>  
  );
}

export default App;