import ocean from './assets/ocean.png';
import './index.css';  
import "./App.css";
import SideBar from "./Components/SideBar";
import NavBar from  "./Components/NavBar"
import FundCard from './Components/FundCard';
import { dummyData } from './test';
function App() {
  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <SideBar />
         
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <NavBar />
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {dummyData.map((data,index)=>{
            return(
              <FundCard key={index} {...data} />
            )
          })}
        </div>
        </div>
     
      </div>
    </>
  );
}

export default App;
